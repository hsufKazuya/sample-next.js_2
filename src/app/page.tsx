import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const signup =(event: React.FormEvent) =>{
    event.preventDefault();
      console.log('email :', email);
      console.log('password :', password);
  };
  return (
    <div className="flex flex-col items-center justify-center mt-20 p-4">
      <div className="w-full max-w-md rounded-lg p-4 text-black">
        <h1>Auth動作確認</h1>
        <form onSubmit={signup}>
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            />
            <button type="submit">登録</button>
        </form>
      </div>

    </div>
  );
}
