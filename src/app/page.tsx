"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import TodoList from "@/transition/Todo";
import Login from "@/components/Auth";
import { auth } from "@/app/firebase/firebase-config"; 

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("ログアウトに失敗しました", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-black">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black">
        {user ? (
          <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4">ToDo 管理</h2>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 mb-4 text-white bg-gray-500 rounded-md hover:bg-gray-600"
            >
              ログアウト
            </button>
            <TodoList />
          </div>
        ) : (
          <Login />
        )}
      </div>
    </div>
    );
};

export default App;
