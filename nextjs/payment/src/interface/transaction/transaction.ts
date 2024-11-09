export type ICardInfo = {
    cardNumber: string
    expiryMonth: string
    expiryYear: string
    cvc: string
};

export interface Good { 
    name: string
    amount: number
    ppp: number // price per piece lol 
    description : string
} 

export interface ITransaction {
    origin : string
    Goods : Good[]
    CardInfo : ICardInfo
}

export interface IUrlPayload { 
    origin : string
    Goods : Good[] 
}