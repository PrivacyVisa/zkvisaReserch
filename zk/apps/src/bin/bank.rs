use actix_web::{post, web, App, HttpResponse, HttpServer, Responder};
use serde_json::json;
use zk::utils::types::IUrlPayload; // Import types from utils or lib.rs

// Define the API endpoint
#[post("/api/process")]
async fn process_payload(payload: web::Json<IUrlPayload>) -> impl Responder {
    let data = payload.into_inner();
    println!("Received payload from origin: {}", data.origin);
    println!("Goods: {:?}", data.goods);
    println!("Card Info: {:?}", data.card_info);

    HttpResponse::Ok().json(json!({
        "status": "success",
        "message": "Data received",
        "origin": data.origin
    }))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(process_payload) // Register the API endpoint
    })
    .bind("127.0.0.1:8000")? // Server listens on port 8000
    .run()
    .await
}