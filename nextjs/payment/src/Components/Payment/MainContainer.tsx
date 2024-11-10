"use client";
import React, { useEffect, useState } from 'react';
import { useForm, FieldError, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { Good , ICardInfo , IUrlUserPayload , IUrlBankPayload } from '@/interface/transaction/transaction';



type Props = {
    UserPayload : IUrlUserPayload ;
};

type InputProps = {
    register: UseFormRegister<ICardInfo>;
    setValue: UseFormSetValue<ICardInfo>;
    error?: FieldError;
};

function CardNumberInput({ register, setValue, error }: InputProps) {
    const formatCardNumber = (value: string) => {
        const cleaned = value.replace(/\D/g, '').slice(0, 16);
        return cleaned.replace(/(.{4})/g, '$1 ').trim();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatCardNumber(e.target.value);
        setValue("cardNumber", formatted, { shouldValidate: true });
    };

    return (
        <div className="flex flex-col">
            <label htmlFor="cardNumber" className="text-sm font-medium text-gray-700">Card Number</label>
            <input
                type="text"
                id="cardNumber"
                disabled
                placeholder="1234 5678 9123 4567"
                className={`mt-1 px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-400`}
                {...register("cardNumber", {
                    required: "Card number is required",
                    validate: (value) => {
                        const cleaned = value.replace(/\D/g, '');
                        return cleaned.length === 16 || "Card number must be 16 digits";
                    },
                })}
                onChange={handleChange}
            />
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
    );
}

type ExpiryDateInputProps = {
    register: UseFormRegister<ICardInfo>;
    errorMonth?: FieldError;
    errorYear?: FieldError;
};

function ExpiryDateInput({ register, errorMonth, errorYear }: ExpiryDateInputProps) {
    const currentYear = new Date().getFullYear() % 100; // Get last two digits of the current year
    const currentMonth = new Date().getMonth() + 1; // Months are zero-based, so add 1

    const validateExpiryDate = (month: string, year: string) => {
        const monthNumber = parseInt(month, 10);
        const yearNumber = parseInt(year, 10);

        // Ensure month is between 01 and 12
        if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
            return "Month must be between 01 and 12";
        }

        // Ensure the expiration date is in the future
        if (yearNumber > currentYear || (yearNumber === currentYear && monthNumber >= currentMonth)) {
            return true; // Valid date in the future
        }
        
        return "Expiration date must be in the future";
    };

    return (
        <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Expiration Date</label>
            <div className="flex space-x-2">
                <input
                    type="text"
                    id="expiryMonth" // Add ID for accessing value in validation
                    placeholder="MM"
                    maxLength={2}
                    className={`mt-1 px-3 py-2 border ${errorMonth ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    {...register("expiryMonth", {
                        required: "Expiration month is required",
                        validate: (value) => {
                            const year = (document.getElementById("expiryYear") as HTMLInputElement)?.value || '';
                            return validateExpiryDate(value, year);
                        },
                    })}
                />
                <input
                    type="text"
                    id="expiryYear" // Add ID for accessing value in validation
                    placeholder="YY"
                    maxLength={2}
                    className={`mt-1 px-3 py-2 border ${errorYear ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    {...register("expiryYear", {
                        required: "Expiration year is required",
                        pattern: {
                            value: /^\d{2}$/,
                            message: "Year must be in YY format",
                        },
                        validate: (value) => {
                            const month = (document.getElementById("expiryMonth") as HTMLInputElement)?.value || '';
                            return validateExpiryDate(month, value);
                        },
                    })}
                />
            </div>

        </div>
    );
}

type CVCInputProps = {
    register: UseFormRegister<ICardInfo>;
    error?: FieldError;
};

function CVCInput({ register, error }: CVCInputProps) {
    return (
        <div className="flex flex-col">
            <label htmlFor="cvc" className="text-sm font-medium text-gray-700">CVC</label>
            <input
                type="text"
                id="cvc"
                placeholder="123"
                maxLength={3}
                className={`mt-1 px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                {...register("cvc", {
                    required: "CVC is required",
                    pattern: {
                        value: /^\d{3}$/,
                        message: "CVC must be 3 digits",
                    },
                })}
                onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '').slice(0, 3);
                }}
            />
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
    );
}

export default function MainPaymentContainer({ UserPayload }: Props) {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<ICardInfo>();
    const OnGeneratingProof = (data: ICardInfo) => {
        const cardRefactor = data.cardNumber.replaceAll(" ","")  
        const CardInfoTemp = {
            ...data,
            cardNumber : cardRefactor
        }
        // transaction sending without reveal what we buying just send hashed of carts 
        const transaction : IUrlBankPayload = {
            origin : UserPayload.origin,
            cardInfo : CardInfoTemp,
            goodsHashed : UserPayload.goodsHashed,
            amount : UserPayload.amount
        } 
        console.log(transaction)
    }                                                           

    useEffect(() => {
        if (UserPayload && UserPayload.cardInfo && UserPayload.cardInfo.cardNumber) {
            setValue("cardNumber", UserPayload.cardInfo.cardNumber); // Set card number from payload
        }
    }, [UserPayload, setValue]);

    return (
        <section className="flex flex-row px-[2vw] gap-x-[2vw] py-[3vh]">
            <div className="flex flex-col w-7/12 items-center">
                <h1 className="text-xl font-bold mb-4">Payment Summary</h1>
                <ul>
                    {UserPayload.goods.map((item: Good, index) => (
                        <li key={index} className="flex flex-col justify-between items-center p-4 border rounded-lg shadow-sm">
                            <div>
                                <h2 className="text-xl font-semibold">{item.name}</h2>
                                <p className="text-gray-600">{item.description}</p>
                                <p>Price per piece: ${item.ppp}</p>
                                <div className="flex flex-row justify-between pr-[2vw]">
                                    <p>Quantity: {item.amount}</p>
                                    <p className="font-semibold">Total: ${item.amount * item.ppp}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>                
            </div>

            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                <form className="flex flex-col space-y-4" onSubmit={handleSubmit(OnGeneratingProof)}>
                    <CardNumberInput
                        register={register}
                        setValue={setValue}
                        error={errors.cardNumber}
                    />
                    <ExpiryDateInput
                        register={register}
                        errorMonth={errors.expiryMonth}
                        errorYear={errors.expiryYear}
                    />
                    <CVCInput
                        register={register}
                        error={errors.cvc}
                    />
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Generating Proof Locally
                    </button>
                </form>
            </div>
        </section>
    );
}