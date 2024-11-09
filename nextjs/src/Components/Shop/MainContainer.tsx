
import React, { useState } from 'react'

import { Good , CartDataType  } from '@/interface/transaction';

import { useRouter } from 'next/navigation';

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
    const router = useRouter() ; 
    const [cart, setCart] = useState<CartDataType>([]);

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
        return cart.reduce((total, item) => total + item.amount * item.ppp, 0);
    };

    const OnPurchaseHandler = ()=>{
        if (cart.length > 0 ){
            const HashedCart = encodeURIComponent(JSON.stringify(cart))
            router.push(`payment/${HashedCart}`)
        }
        // More context 
        // also send cart to bank here as a transaction to provide bank to generate a proof
    }

    return (
        <section className="flex flex-row gap-x-[5vw]">
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
                <h2 className="text-xl font-bold mb-2">Cart Summary</h2>
                {cart.length > 0 ? (
                    <div className="flex flex-col border-t pt-4">
                        {cart.map((item, index) => (
                        <div key={index} className="flex justify-between mb-2">
                            <span>{item.name} (x{item.amount})</span>
                            <span>${item.amount * item.ppp}</span>
                        </div>
                        ))}
                        <div className="font-bold text-lg mt-4">
                        Total: ${calculateTotal()}
                        </div>
                    </div>
                    ) : (
                    <p className="text-gray-500">Your cart is empty.</p>
                )}
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            OnPurchaseHandler()
                        }}
                        className="mt-2 bg-blue-500 text-white py-1 px-4 rounded"
                    >
                    Purchase
                </button>
            </div>
        </section>
    )
}