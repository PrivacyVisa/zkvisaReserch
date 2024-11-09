
import { useState } from 'react'

import { useForm } from 'react-hook-form';

import { Good, IUrlPayload } from '../interface/transaction';

const AvailableItems: Good[] = [
    { 
        name: 'Monchichi', 
        amount: 1, 
        ppp: 100, 
        description: 'A beloved retro plush toy originally created in Japan in the 1970s. Monchichi features a soft, cuddly body with a charming face and thumb-sucking feature. It’s a nostalgic collector’s item perfect for fans of vintage toys.' 
      },
      { 
        name: 'Chinjung Art Toys', 
        amount: 1, 
        ppp: 300, 
        description: 'Inspired by the playful and artistic world of designer toys, Chinjung Art Toys are highly detailed and uniquely crafted figurines. Each piece is hand-painted and captures the creativity of modern pop culture art. Ideal for collectors who appreciate unique, small-batch creations.' 
      },
      { 
        name: 'Doraemon', 
        amount: 1, 
        ppp: 500, 
        description: 'Doraemon is a beloved robotic cat from the future, popularized in Japanese anime and manga. This collectible figure celebrates the timeless character who travels back in time to help his friend, Nobita. Perfect for fans of classic Japanese animation and collectors of iconic characters.' 
      },
];

export default function MainShopContainer() {
    const [cart, setCart] = useState<Good[]>([]);
    const origin = "E-commerce Demo for ZkVisa"
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<{ cardNumber: string }>();

    const addToCart = (item: Good) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((cartItem) => cartItem.name === item.name);
            if (existingItem) {
            // Update amount if item already in cart
            return prevCart.map((cartItem) =>
                cartItem.name === item.name
                ? { ...cartItem, amount: cartItem.amount + 1 }
                : cartItem
            );
            } else {
            // Add new item to cart
            return [...prevCart, { ...item }];
            }
        });
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.amount * item.ppp, 0)
    }

    // Format card number to add spaces every 4 digits
    const formatCardNumber = (value: string) => {
        const cleaned = value.replace(/\D/g, '').slice(0, 16); // Limit to 16 digits
        return cleaned.replace(/(.{4})/g, '$1 ').trim();
    };

    // Handle changes in card number input and apply formatting
    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatCardNumber(e.target.value);
        setValue("cardNumber", formatted, { shouldValidate: true });
    };

    // Purchase handler
    const onPurchaseHandler = (data: { cardNumber: string }) => {
        if (cart.length > 0) {
            const payload: IUrlPayload = { Goods: cart, Origin: origin, CardInfo: { cardNumber: data.cardNumber } };
            const hashedCart = encodeURIComponent(JSON.stringify(payload));
            const paymentUrl = `${process.env.ZK_VISA_URL}/payment/${hashedCart}`;
            window.open(paymentUrl, "_blank");
            // Also send to bank / api/store/transaction/data
        }
    };

    return (
        <section className="flex flex-row gap-x-[5vw] py-[3vh] px-[3vw]">
            <div className='flex flex-col w-7/12 items-center'>
                <h1 className="text-2xl font-bold mb-4">Select Items</h1>
                <div className="flex flex-col w-full">
                    {AvailableItems.map((item, index) => (
                        <div key={index} className="p-4 border rounded-lg shadow-sm">
                            <h2 className="text-lg font-semibold">{item.name}</h2>
                            <p>{item.description}</p>
                            <p>Price per piece: ${item.ppp}</p>
                            <button
                                onClick={() => addToCart(item)}
                                className="mt-2 bg-blue-500 text-white py-1 px-4 rounded"
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex flex-col w-5/12'> 
                <div className='flex flex-col'>
                    <h2 className="text-xl font-bold mb-2">Cart Summary</h2>
                    {cart.length > 0 ? (
                        <div className="flex flex-col border-t pt-4 gap-y-[1vh]">
                            {cart.map((item, index) => (
                                <div key={index} className="flex justify-between mb-2">
                                    <span>{item.name} (x{item.amount})</span>
                                    <span>${item.amount * item.ppp}</span>
                                </div>
                            ))}
                            <form
                                className='flex flex-col' 
                                onSubmit={handleSubmit(onPurchaseHandler)}
                            >
                                <label className='text-xl font-medium'>
                                    Credit card number
                                </label>
                                <div className='flex flex-row justify-between items-center'>
                                    <input
                                        type="text"
                                        id="cardNumber"
                                        placeholder="1234 5678 9123 4567"
                                        className={`mt-1 px-3 py-2 border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                                        {...register("cardNumber", {
                                            required: "Card number is required",
                                            validate: (value) => {
                                                const cleaned = value.replace(/\D/g, '');
                                                return cleaned.length === 16 || "Card number must be 16 digits";
                                            },
                                        })}
                                        onChange={handleCardNumberChange}
                                    />         
                                    <div className="font-bold text-lg mt-4">
                                        Total: ${calculateTotal()}
                                    </div>                                        
                                </div>
                                {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber.message}</p>}
                                <button
                                    type='submit'
                                    className="mt-2 bg-blue-500 text-white py-1 px-4 rounded"
                                >
                                    Purchase
                                </button>

                            </form>
                        </div>
                        ) : (
                            <p className="text-gray-500">Your cart is empty.</p>
                        )}
                </div>
            </div>

        </section>
    )
}