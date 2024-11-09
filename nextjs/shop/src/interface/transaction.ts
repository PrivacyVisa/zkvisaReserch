export interface Good { 
    name: string
    amount: number
    ppp: number // price per piece lol 
    description : string
} ; 

export interface IUrlPayload { 
    Goods : Good[]
    origin : string 
}