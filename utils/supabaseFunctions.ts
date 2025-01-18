import { supabase } from "./supabase";

export const addSchedule = async (title: string) => {
    await supabase.from("calendar").insert({ title: title});
};