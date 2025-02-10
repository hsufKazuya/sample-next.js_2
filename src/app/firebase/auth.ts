import app from "@/app/firebase/firebase-config";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const auth = getAuth(app);

export const signupWithEmailAndPassword = async (email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        return userCredential.user;
    } catch (error) {
        console.error("エラーが発生しました:", error);
    }
};

export const signinWithEmailAndPassword = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        return userCredential.user;
    } catch (error) {
        console.error("エラーが発生しました:", error);
    }
};

export const logOut = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("エラーが発生しました:", error);
    }
};