import { Schedule } from "@/app/types/schedule";
import { supabase } from "./supabase";
import { PostgrestResponse } from "@supabase/supabase-js";

// スケジュールを追加
export const addSchedule = async (title: string, start: string, end: string, userId: string) => {
    console.log(title);
    const {error} = await supabase.from("calendar").insert({ title: title, start: start, end: end, userId: userId});
    console.log(error);
};

// テーブルに登録されている全てのスケジュールを取得
export const getAllSchedules = async (): Promise<Schedule[]> => {
    const { data, error }: PostgrestResponse<Schedule> = await supabase.from('calendar').select('*');
    
    if (error) {
        throw new Error(error.message);
    }

    return data || [];
};

// スケジュールを更新
export const updateSchedule = async ( id: string, title: string, start: string, end: string) => {
    await supabase.from('calendar').upsert({
        id: id,
        title: title,
        start: start,
        end: end,
    });
};

// スケジュールを削除
export const deleteSchedule = async (id: string) => {
    await supabase.from('calendar').delete().eq('id', id);
};