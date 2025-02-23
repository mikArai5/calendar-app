'use client';
import { signup } from "./actions"
import Link from "next/link";
import './styles/style.css'
import Header from "../components/Header";

export default function SignupPage() {
    return (
        <>
        <Header/>
        <div className="signup">
            <div className="signup__inner">
                <h1>Sign up</h1>
                <form>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input id="email" name="email" type="email" required />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input id="password" name="password" type="password" required />
                    </div>
                    <button formAction={signup}>Sign up</button>
                </form>
                <div className="link">
                    登録済みの方は<Link href="/login">こちら</Link>
                </div>
            </div>
        </div>
        </>
    )
}