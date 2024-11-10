use serde::Deserialize;

#[derive(Deserialize, Debug)]
pub struct IUrlBankPayload {
    #[serde(rename = "goodsHashed")]
    pub goods_hashed: String,
    pub origin: String,
    #[serde(rename = "cardInfo")]
    pub card_info: ICardInfo,
    pub amount: i32,
}

#[derive(Deserialize, Debug)]
pub struct ICardInfo {
    #[serde(rename = "cardNumber")]
    pub card_number: String,
    // Add other fields if necessary, using `serde(rename = "...")` as needed
}