use risc0_zkvm::{default_prover, ExecutorEnv, Receipt, VerifierContext,ProverOpts};
use methods::{
    VISA_ELF,
    VISA_ID
}; 

use std::result::Result;
use std::env;
use dotenv::dotenv;
use tokio::task;


pub async fn bonsai_generating_proof () -> Result<Receipt, Box<dyn std::error::Error>> {
    dotenv().ok();
    
    tracing_subscriber::fmt()
    .with_env_filter(tracing_subscriber::filter::EnvFilter::from_default_env())
    .init();

    let payload_internal_env = 10 ; 

    // let receipt = task::spawn_blocking(move || {
    //     let env = ExecutorEnv::builder()
    //     .write(&payload_internal_env)
    //     .unwrap()
    //     .build()
    //     .unwrap();

    //     let prover_ctx = default_prover().prove_with_ctx(
    //         env,
    //         &VerifierContext::default(),
    //         VISA_ELF,
    //         &ProverOpts::groth16()
    //     );
    //     prover_ctx.unwrap().receipt
    // }).await.unwrap() ; 

    let env = ExecutorEnv::builder()
        .write(&payload_internal_env)
        .unwrap()
        .build()
        .unwrap();

    let receipt = default_prover().prove(env, VISA_ELF).unwrap().receipt ;
     
    Ok(receipt)
}