import { Keypair, Connection, clusterApiUrl } from "@solana/web3.js";
import { createMint } from "@solana/spl-token";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const secret = JSON.parse(process.env.SOLANA_SECRET_KEY || "[]");
const payer = Keypair.fromSecretKey(Uint8Array.from(secret));

export async function createToken(name: string, symbol: string, decimals: number) {
  const mint = await createMint(
    connection,
    payer,
    payer.publicKey,
    null,
    decimals
  );

  console.log(`✅ Token created: ${mint.toBase58()}`);
  return mint;
}
