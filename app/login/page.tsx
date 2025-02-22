'use client';
import { login } from "./actions"
import Link from "next/link";
import './styles/style.css'
import Header from "../components/Header";

export default function LoginPage() {
    return (
        <>
        <Header/>
        <div className="login">
            <div className="login__inner">
            <h1>Log in</h1>
                <form>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input id="email" name="email" type="email" required />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input id="password" name="password" type="password" required />
                    </div>
                    <button formAction={login}>Log in</button>
                </form>
                <div className="link">
                    新規登録がまだの方は<Link href="/signup">こちら</Link>
                </div>
            </div>
        </div>
        </>
    )
}