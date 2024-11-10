use actix_web::{post, web, App, HttpResponse, HttpServer, Responder};
use urlencoding::decode;
use serde_json::{from_str,json};

use apps::utils::interface::IUrlPayload ; 

// Define the API endpoint

#[post("/api/client/visa/generate_proof/{hashed_payload}")]
async fn generating_proof(hashed_payload : web::Path<String> ) -> impl Responder { 
    let decoded_payload = decode(&hashed_payload).unwrap_or_else(|_| "".to_string().into());    
    let payload_result: Result<IUrlPayload, _> = from_str(&decoded_payload);

    match payload_result {
        Ok(payload) => {
            HttpResponse::Ok().json(json!({
                "status": "success",
                "message": "Data received",
            }))
        },
        Err(e) => {
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
        App::new()
            .service(generating_proof) 
    })
    .bind("localhost:8004")?
    .run()
    .await
}