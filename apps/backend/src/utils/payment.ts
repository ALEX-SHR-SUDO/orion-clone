import { Connection, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Адрес кошелька, на который должны платить
const RECEIVER = process.env.PAYMENT_WALLET || "";

export async function checkPayment(txSignature: string): Promise<boolean> {
  const tx = await connection.getTransaction(txSignature, { commitment: "confirmed" });

  if (!tx) return false;

  // Проверяем, что в транзакции участвовал наш кошелёк
  const accounts = tx.transaction.message.accountKeys.map(acc => acc.toBase58());
  return accounts.includes(RECEIVER);
}
