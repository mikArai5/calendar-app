'use client';
import { signup } from "./actions"
import Link from "next/link";
import './styles/style.css'
import Header from "../components/Header";
import { useForm, SubmitHandler } from "react-hook-form";

interface SignupForm {
    email: string;
    password: string;
}

export default function SignupPage() {
    
    const { register,
            handleSubmit,
            formState: { errors, isValid },
     } = useForm<SignupForm>({ mode: "onChange" });

    // Convert SignupForm to FormData
    const onSubmit: SubmitHandler<SignupForm> = (data) => {
        // Create FormData instance and append SignupForm data
        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("password", data.password);

        signup(formData); // Pass the FormData to the signup function
    };

    return (
        <>
        <Header />
        <div className="signup">
            <div className="signup__inner">
                <h1>Sign up</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="メールアドレス"
                            {...register("email", {
                                required: "メールアドレスを入力してください。",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "メールアドレスの形式が正しくありません。"
                                }
                            })}
                        />
                        <p className="error">{errors.email?.message}</p>
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="パスワード"
                            {...register("password",{
                                required: "パスワードを入力してください。",
                                minLength: { value: 6, message: "6文字以上で入力してください。" }
                            })}
                        />
                        <p className="error">{errors.password?.message}</p>
                    </div>
                    <button type="submit" disabled={!isValid}>Sign up</button>
                </form>
                <div className="link">
                    新規登録がまだの方は<Link href="/signup">こちら</Link>
                </div>
            </div>
        </div>
        </>
    )
}
