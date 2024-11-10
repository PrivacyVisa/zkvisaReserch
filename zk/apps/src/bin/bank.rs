use actix_web::{post, web, App, HttpResponse, HttpServer, Responder};
use actix_cors::Cors;
use serde_json::{from_str, json};
use urlencoding::decode;

use apps::utils::{
    interface::IUrlBankPayload,
    genreating_proof::bonsai_generating_proof
};

// Define the API endpoint for bank finalization and verification
#[post("/api/bank/visa/generate_proof/{hashed_payload}")]
async fn bank_finalize_and_verify(hashed_payload: web::Path<String>) -> impl Responder {
    // Step 1: Decode the URL-encoded payload
    let decoded_payload = decode(&hashed_payload).unwrap_or_else(|_| "".to_string().into());
    println!("Decoded payload: {:?}", decoded_payload);

    // Step 2: Parse the decoded JSON payload into IUrlBankPayload
    let payload_result: Result<IUrlBankPayload, _> = from_str(&decoded_payload);

    // Step 3: Handle result and perform actions based on the payload
    match payload_result {
        Ok(payload) => {
            // Log received payload details
            println!("Received Payload:");
            println!("- Amount: {:?}", payload.amount);
            println!("- Card Info: {:?}", payload.card_info.card_number);
            println!("- Origin: {:?}", payload.origin);
            println!("- Goods Hashed: {:?}", payload.goods_hashed);

            // Call the proof-generating function (if needed)
            // bonsai_generating_proof();  // Uncomment if this function should be called here

            // Respond with success JSON
            HttpResponse::Ok().json(json!({
                "status": "success",
                "message": "Data received",
            }))
        },
        Err(e) => {
            // Log parsing error
            println!("Failed to parse payload: {}", e);

            // Respond with error JSON
            HttpResponse::BadRequest().json(json!({
                "status": "error",
                "message": "Invalid payload format"
            }))
        }
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {

        let cors = Cors::default()
        .allowed_origin("http://localhost:8000") // Allow requests from your frontend
        .allowed_methods(vec!["GET", "POST"])
        .allowed_headers(vec![actix_web::http::header::CONTENT_TYPE])
        .supports_credentials();

        App::new()
            .wrap(cors)
            .service(bank_finalize_and_verify) // Register the service
    })
    .bind("localhost:8005")? // Bind to localhost on port 8005
    .run()
    .await
}