'use server';
import { createClient } from "@/utils/supabase/server";

// ログインしているユーザー情報を取得
export const fetchUserInfo = async () => {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser();
    return user;
};