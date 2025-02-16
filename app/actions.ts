'use server';
import { createClient } from "@/utils/supabase/server";

export const fetchUserInfo = async () => {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser();
    return user;
};