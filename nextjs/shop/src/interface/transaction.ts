export interface Good { 
    name: string
    amount: number
    ppp: number // price per piece lol 
    description : string
} ; 

export interface IUrlPayload { 
    Goods : Good[]
    Origin : string 
    CardInfo : Partial<ICardInfo>
}

export type ICardInfo = {
    cardNumber: string
    expiryMonth: string
    expiryYear: string
    cvc: string
};