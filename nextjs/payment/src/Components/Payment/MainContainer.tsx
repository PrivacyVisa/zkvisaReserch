import React from 'react'

import { CartDataType , Good } from '@/interface/transaction/transaction'

type Props = { 
    payload : CartDataType
}

export default function MainPaymentContainer({payload} : Props) {
    const OnGeneratingProof = ()=>{
        
    }


    return (
        <section
            className='flex flex-row px-[2vw] gap-x-[2vw] py-[3vh]'
        >   
            <div className='flex flex-col w-7/12 items-center'>
                Payment sumamry 
                <ul>
                    {
                        payload.map((item: Good, index)=>{
                            return (
                                <li key={index} className="flex flex-col justify-between items-center p-4 border rounded-lg shadow-sm">
                                    <div>
                                        <h2 className="text-xl font-semibold">{item.name}</h2>
                                        <p className="text-gray-600">{item.description}</p>
                                        <p>Price per piece: ${item.ppp}</p>
                                        <div className='flex flex-row justify-between pr-[2vw]'>
                                            <p>Quantity: {item.amount}</p>
                                            <p className="font-semibold">Total: ${item.amount * item.ppp}</p>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                <form className="flex flex-col space-y-4">
                    <ul className="space-y-4">
                        <li>
                            <div className="flex flex-col">
                                <label htmlFor="cardNumber" className="text-sm font-medium text-gray-700">
                                    Card Number
                                </label>
                                <input
                                    type="text"
                                    id="cardNumber"
                                    placeholder="1234 5678 9123 4567"
                                    className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                        </li>
                        <li>
                            <div className="flex flex-col">
                                <label htmlFor="expiryDate" className="text-sm font-medium text-gray-700">
                                    Expiration Date
                                </label>
                                <input
                                    type="text"
                                    id="expiryDate"
                                    placeholder="MM / YY"
                                    className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                        </li>
                        <li>
                            <div className="flex flex-col">
                                <label htmlFor="cvv" className="text-sm font-medium text-gray-700">
                                    CVC
                                </label>
                                <input
                                    type="text"
                                    id="cvv"
                                    placeholder="123"
                                    className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                        </li>
                    </ul>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Generating Proof Locally
                    </button>
                </form>
            </div>
        </section>
    )
}