import { supabase } from "./supabase";

export const addSchedule = async (title: string) => {
    await supabase.from("calendar").insert({ title: title});
};

export const getAllSchedules = async () => {
    const schedules = await supabase.from("calendar").select("*");
    return schedules.data;
}