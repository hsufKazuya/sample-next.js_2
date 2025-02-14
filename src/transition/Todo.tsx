//このtsxはTodoリストの追加、削除機能を記述する予定
"use client";
import { useEffect, useState } from "react";
import { getFirestore, collection, addDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";

export interface TodoTask {
  id: string;
  text: string;
}
export default function TodoList (){
    const [todos, setTodos] = useState<TodoTask[]>([]);
    const [newTodo, setNewTodo] = useState("");
    const db = getFirestore();

  //ここでFirestore のリアルタイム更新
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "todos"), (snapshot) => {
      setTodos(snapshot.docs.map((doc) => ({ id: doc.id, text: doc.data().text })));
    });

    return () => unsubscribe();
  }, [db]);

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

  //ToDoリスト削除
  const removeTodo = async (id: string) => {
    await deleteDoc(doc(db, "todos", id));
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">ToDo リスト</h2>
      <input
        type="text"
        placeholder="ToDo を入力"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-black"
      />
      <button
        onClick={addTodo}
        className="w-full px-4 py-2 mb-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        追加
      </button>
      <ul className="w-full mt-4">
        {todos.map((todo) => (
          <li key={todo.id} className="flex justify-between p-2 bg-gray-100 rounded-md mb-2">
            {todo.text} 
            <button
              onClick={() => removeTodo(todo.id)}
              className="px-2 py-1 text-black bg-red-500 rounded-md hover:bg-red-600"
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
