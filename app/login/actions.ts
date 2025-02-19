'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
    const supabase = await createClient()

    // 入力されたemailとpasswordをdataに代入
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    // アカウントがない、passwordやemailが間違っている場合にエラーを返す
    const { error } = await supabase.auth.signInWithPassword(data)

    // エラーをキャッチしたら用意したエラーページに遷移させる
    if (error) {
        redirect('/error')
    }

    // エラーがなければ指定されたpath（'/'）のcacheにデータを入れなおす
    revalidatePath('/', 'layout')
    // ('/')にリダイレクトさせる
    redirect('/')
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    // 入力されたemailとpasswordをdataに代入
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string
    }

    // passwordやemailが間違っている場合にエラーを返す
    const { error } = await supabase.auth.signUp(data)

    // エラーをキャッチしたら用意したエラーページに遷移させる
    if (error) {
        redirect('/error')
    }

    // エラーがなければ指定されたpath（'/'）のcacheにデータを入れなおす
    revalidatePath('/', 'layout')
    // ('/')にリダイレクトさせる
    redirect('/')
}
