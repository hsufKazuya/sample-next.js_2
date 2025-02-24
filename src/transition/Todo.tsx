"use client";
import { useEffect, useState } from "react";
import { getFirestore, collection, addDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";

export interface TodoTask {
  id: string;
  text: string;
}

export default function TodoList() {
  const [todos, setTodos] = useState<TodoTask[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const db = getFirestore();

  // Firestore のリアルタイム更新
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "todos"), (snapshot) => {
      setTodos(snapshot.docs.map((doc) => ({ id: doc.id, text: doc.data().text })));
    });

    return () => unsubscribe();
  }, []);

  // ToDoリスト追加
  const addTodo = async () => {
    if (!newTodo.trim()) return;

    try {
      await addDoc(collection(db, "todos"), { text: newTodo });
      setNewTodo("");
    } catch (error) {
      console.error("タスクの追加に失敗", error);
    }
  };

  // ToDoリスト削除
  const removeTodo = async (id: string) => {
    await deleteDoc(doc(db, "todos", id));
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center">
      {/* ヘッダー */}
      <div className="w-full bg-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <span className="mr-2">🦭</span> とど管理
        </h1>
        <button className="bg-gray-500 text-white px-4 py-2 rounded">Logout</button>
      </div>

      {/* ToDo入力フォーム */}
      <div className="mt-10 p-6 bg-gray-100 rounded-lg shadow-lg w-2/3 max-w-md">
        <input
          type="text"
          placeholder="タスクを入力"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-black"
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={addTodo}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            追加
          </button>
        </div>
      </div>

      {/* ToDoリスト */}
      <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-lg w-2/3 max-w-md">
        <ul className="w-full">
          {todos.map((todo) => (
            <li key={todo.id} className="flex justify-between p-2 bg-white rounded-md mb-2">
              {todo.text}
            </li>
          ))}
        </ul>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setTodos([])}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            削除
          </button>
        </div>
      </div>

      {/* フッター */}
      <footer className="mt-10 text-center">
        <h2 className="text-xl font-bold">とど管理</h2>
        <p className="text-gray-600">今日のやるべきことを確認しよう！</p>
      </footer>
    </div>
  );
}
