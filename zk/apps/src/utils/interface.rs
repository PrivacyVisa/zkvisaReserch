use serde::Deserialize;

#[derive(Deserialize, Debug)]
pub struct Good {
    pub name : String,
    pub amount : u32,
    pub ppp : f64,

}

#[derive(Deserialize, Debug)]
pub struct CardInfo {
    pub card_number: String,
    pub expiry_month: String,
    pub expiry_year: String,
    pub cvc: String,
}

#[derive(Deserialize, Debug)]
pub struct IUrlPayload{
    pub origin : String,
    pub goods : Vec<Good>,
    pub card_info : CardInfo,
}