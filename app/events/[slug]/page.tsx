'use client';
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import Link from "next/link";
import './styles/style.css';
import { updateSchedule } from "@/utils/supabaseFunctions";
import { useRouter } from "next/navigation";


type EditSchedule = {
    id: string;
    title: string;
    start: string;
    end: string;
}

export default function Page() {
    const [ schedule, setSchedule ] = useState<any>([]);
    const [ editSchedule, setEditSchedule ] = useState<EditSchedule>({
        id: schedule.id,
        title: schedule.title,
        start: schedule.start,
        end: schedule.end,
    });

    const router = useRouter();

    const id = usePathname();
    const scheduleId = id.split('/').pop();

    async function fetchSchedule() {
        const { data } = await supabase.from("calendar").select("*").eq('id', scheduleId).single();
        setSchedule(data);
    }

    useEffect(() => {
        setEditSchedule(schedule);
    }, [schedule]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const changedScheduleTitle = { ...editSchedule, title: e.target.value };
        setEditSchedule(changedScheduleTitle);
        console.log(editSchedule);
    }
    const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const changedScheduleStart = { ...editSchedule, start: e.target.value };
        setEditSchedule(changedScheduleStart);
        console.log(editSchedule);
    }
    const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const changedScheduleEnd = { ...editSchedule, end: e.target.value };
        setEditSchedule(changedScheduleEnd);
        console.log(editSchedule);
    }

    const handleSubmit = async(id: string, title: string, start: string, end: string) => {
        await updateSchedule(id, title, start, end);
        console.log(editSchedule);
        // router.push('/');
    }


    return(
        <>
        <div className="inputArea">
            <div>
                <label htmlFor="title">予定</label>
                <input 
                    id="title"
                    type="text"
                    defaultValue={schedule.title}
                    onChange={handleTitleChange}
                />
            </div>
            <div>
                <label htmlFor="start">開始日</label>
                <input
                    id="start"
                    type="date"
                    defaultValue={schedule.start}
                    onChange={handleStartChange}
                />
            </div>
            <div>
                <label htmlFor="end">終了日</label>
                <input
                    id="end"
                    type="date"
                    defaultValue={schedule.end}
                    onChange={handleEndChange}
                />
            </div>
        </div>
        <span onClick={()=> handleSubmit(editSchedule.id, editSchedule.title, editSchedule.start, editSchedule.end)}>更新</span>
        <Link href="/">戻る</Link>
        </>
    )
}