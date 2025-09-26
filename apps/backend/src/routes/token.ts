import { Router } from "express";
import { createToken } from "../services/solana";
import { checkPayment } from "../utils/payment";

const router = Router();

/**
 * POST /api/token/create
 * body: { name, symbol, decimals, txSignature }
 */
router.post("/create", async (req, res) => {
  try {
    const { name, symbol, decimals, txSignature } = req.body;

    // 1. Проверяем оплату
    const paid = await checkPayment(txSignature);
    if (!paid) {
      return res.status(400).json({ error: "Оплата не найдена" });
    }

    // 2. Создаём токен
    const tokenMint = await createToken(name, symbol, decimals);

    res.json({ success: true, mint: tokenMint.toBase58() });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
