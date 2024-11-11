use risc0_zkvm::{default_prover, ExecutorEnv, Receipt , VerifierContext , ProverOpts };
use methods::VISA_ELF; 

use anyhow::Ok;
use dotenv::dotenv;

use crate::utils::interface::{
    IUrlBankPayload,
    IUrlBankPayloadEnv
} ;  

pub fn stark_generating_proof ( payload : IUrlBankPayload ) -> anyhow::Result<Receipt>  {
    tracing_subscriber::fmt()
    .with_env_filter(tracing_subscriber::filter::EnvFilter::from_default_env())
    .init();
    println!("generating proof executed ") ; 
    let payload_internal_env = IUrlBankPayloadEnv { 
        amount : payload.amount , 
        card_number : payload.card_info.card_number,
        goods_hashed : payload.goods_hashed,
        origin : payload.origin 
    } ; 

    let env = ExecutorEnv::builder()
        .write(&payload_internal_env)
        .unwrap()
        .build()
        .unwrap();

    let prover = default_prover().prove(env, VISA_ELF) ; 
    let receipt = prover.unwrap().receipt ;
    Ok(receipt) 
}

pub async fn bonsai_generating_proof ( payload : IUrlBankPayload ) -> anyhow::Result<Receipt>  {
    dotenv().ok();
    
    tracing_subscriber::fmt()
    .with_env_filter(tracing_subscriber::filter::EnvFilter::from_default_env())
    .init();

    let payload_internal_env = IUrlBankPayloadEnv { 
        amount : payload.amount , 
        card_number : payload.card_info.card_number,
        goods_hashed : payload.goods_hashed,
        origin : payload.origin 
    } ; 

    let env = ExecutorEnv::builder()
    .write(&payload_internal_env)
    .unwrap()
    .build()
    .unwrap();

    let prover_ctx = default_prover().prove_with_ctx(
        env,
        &VerifierContext::default(),
        VISA_ELF,
        &ProverOpts::groth16()
    );

    let receipt = prover_ctx.unwrap().receipt ; 
    Ok(receipt)
}