"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase/firebase-config";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  // ログイン処理
  const handleLogin = async () => {
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("ログイン成功！");
    } catch (err: any) {
      setError(err.message);
    }
  };

  // 新規登録処理
  const handleRegister = async () => {
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("登録成功！");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-black">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">ログイン / 登録</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <button onClick={handleLogin} className="w-full bg-blue-500 text-white p-2 rounded mb-2">
          ログイン
        </button>
        <button onClick={handleRegister} className="w-full bg-gray-500 text-white p-2 rounded">
          新規登録
        </button>
      </div>
    </div>
  );
}
