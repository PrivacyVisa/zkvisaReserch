export interface Good { 
    name: string,
    amount: number,
    ppp: number, // price per piece lol 
    description : string
} ; 

export interface CartDataType extends Array<Good> {} ; 

interface CardInfoType { 
    cardNumber : string
    expiredDate : string
    secret : string
}


export interface TransactionType {
    Goods : CartDataType,
    CardInfo : CardInfoType
}