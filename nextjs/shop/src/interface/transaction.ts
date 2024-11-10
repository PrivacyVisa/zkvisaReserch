export interface Good { 
    name: string
    amount: number
    ppp: number // price per piece lol 
    description : string
} 

export type ICardInfo = {
    cardNumber: string
    expiryMonth: string
    expiryYear: string
    cvc: string
};

export interface IUrlBankPayload { 
    goodsHashed : string
    origin : string 
    cardInfo : Partial<ICardInfo>
    amount : number
}

export interface IUrlUserPayload { 
    goodsHashed : string
    goods : Good[]
    origin : string 
    cardInfo : Partial<ICardInfo>
    amount : number
}