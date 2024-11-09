export interface Good { 
    name: string,
    amount: number,
    ppp: number, // price per piece lol 
    description : string
} ; 

export interface CartDataType extends Array<Good> {} ; 
