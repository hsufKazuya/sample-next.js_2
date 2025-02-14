//ログイン状態を監視する
"use client";
import { useState, useEffect } from "react";
import { getFirestore, collection, addDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";

export interface TodoTask {
    id: string;
    text: string;
}

const TodoList = () => {
    const [todos, setTodos] = useState<TodoTask[]>([]);
    const [newTodo, setNewTodo] = useState("");
    const [user, setUser] = useState<User | null>(null);
    const db = getFirestore();
    const auth = getAuth();

    //  ログイン状態を監視
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    //  Firestore のリアルタイム更新
    useEffect(() => {
        if (!user) return; // ここでユーザーがログインしていない場合は処理しないように動作する

        const unsubscribe = onSnapshot(collection(db, "todos"), (snapshot) => {
            setTodos(snapshot.docs.map((doc) => ({ id: doc.id, text: doc.data().text })));
        });

        return () => unsubscribe();
    }, [user]);

    // ToDoの追加を以下で記す
    const addTodo = async () => {
        if (!newTodo.trim()) return;

        try {
            await addDoc(collection(db, "todos"), { text: newTodo });
            setNewTodo("");
        } catch (error) {
            console.error("タスクの追加に失敗", error);
        }
    };

    //  ToDoの削除を以下で記す
    const removeTodo = async (id: string) => {
        await deleteDoc(doc(db, "todos", id));
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    // ログアウト処理
    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("ログアウトに失敗しました", error);
        }
    };
    //レイアウト
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black">
            {user ? (
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
                        className="w-full px-4 py-2 mb-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                    >
                        追加
                    </button>
                    <ul className="w-full mt-4">
                        {todos.map((todo) => (
                            <li key={todo.id} className="flex justify-between p-2 bg-gray-100 rounded-md mb-2">
                                {todo.text} 
                                <button
                                    onClick={() => removeTodo(todo.id)}
                                    className="px-2 py-1 text-white bg-red-500 rounded-md hover:bg-red-600"
                                >
                                    削除
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={handleLogout}
                        className="w-full mt-4 px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
                    >
                        ログアウト
                    </button>
                </div>
            ) : (
                <p className="text-lg font-semibold">ログインしてください</p>
            )}
        </div>
    );
};

export default TodoList;
