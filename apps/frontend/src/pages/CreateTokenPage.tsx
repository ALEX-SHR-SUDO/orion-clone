import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const CreateTokenPage: React.FC = () => {
  const { publicKey } = useWallet();
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [decimals, setDecimals] = useState(9);

  const handleCreateToken = () => {
    if (!publicKey) {
      alert("Сначала подключите кошелёк!");
      return;
    }
    console.log("Token data:", { name, symbol, decimals, owner: publicKey.toBase58() });
    // Здесь позже добавим логику создания токена через Solana SDK
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
      {/* 🔹 Кнопка подключения кошелька */}
      <div className="mb-6 flex justify-center">
        <WalletMultiButton />
      </div>

      <h1 className="text-2xl font-bold text-center mb-6">Create New Token</h1>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Token Name</label>
        <input
          type="text"
          placeholder="My Token"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Symbol</label>
        <input
          type="text"
          placeholder="MTK"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="w-full border rounded-lg p-2"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-medium">Decimals</label>
        <input
          type="number"
          value={decimals}
          onChange={(e) => setDecimals(Number(e.target.value))}
          className="w-full border rounded-lg p-2"
        />
      </div>

      <button
        onClick={handleCreateToken}
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700"
      >
        Create Token
      </button>
    </div>
  );
};

export default CreateTokenPage;
