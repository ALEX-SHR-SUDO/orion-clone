import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import tokenRouter from "./routes/token";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/token", tokenRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Backend запущен на http://localhost:${PORT}`);
});
