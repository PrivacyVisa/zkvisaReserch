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
    Origin : string
    Goods : Good[]
    CardInfo : ICardInfo
}

export interface IUrlPayload { 
    Origin : string
    Goods : Good[] 
    CardInfo : Partial<ICardInfo>
}