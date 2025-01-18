import { supabase } from "./supabase";

export const addSchedule = async (title: string, content: string) => {
    await supabase.from("calendar").insert({ title: title, content: content});
};