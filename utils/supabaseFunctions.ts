import { supabase } from "./supabase";

export const addSchedule = async (title: string, start: string, end: string) => {
    console.log(title);
    const {error} = await supabase.from("calendar").insert({ title: title, start: start, end: end});
    console.log(error);
};

export const getAllSchedules = async () => {
    const schedules = await supabase.from("calendar").select("*");
    return schedules.data;
} 

export const updateSchedule = async ( id: string, title: string, start: string, end: string) => {
    await supabase.from('calendar').upsert({
        id: id,
        title: title,
        start: start,
        end: end,
    });
};