'use server';
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// ログインしているユーザー情報を取得
export const fetchUserInfo = async () => {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser();
    return user;
};

export async function logout() {
    const supabase = await createClient()
    const { error: logoutError } = await supabase.auth.signOut();

    if (logoutError) {
        throw logoutError;
    }

    // エラーがなければ指定されたpath（'/'）のcacheにデータを入れなおす
    revalidatePath('/', 'layout')
    // ('/')にリダイレクトさせる
    redirect('/')
}