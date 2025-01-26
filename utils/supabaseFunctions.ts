import { supabase } from "./supabase";

export const addSchedule = async (title: string) => {
    console.log(title);
    const {error} = await supabase.from("calendar").insert({ title: title});
    console.log(error);
};

export const getAllSchedules = async () => {
    const schedules = await supabase.from("calendar").select("*");
    return schedules.data;
} 