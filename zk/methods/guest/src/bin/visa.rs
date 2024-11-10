use risc0_zkvm::guest::env;

fn main() {
    // TODO: Implement your guest code here

    // read the input
    let payload_internal_env: u32 = env::read();

    // TODO: do something with the input

    // write public output to the journal
    env::commit(&payload_internal_env);
}
