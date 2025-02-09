'use client';
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import Link from "next/link";
import './styles/style.css';

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
        end: schedule.end
    });
    const id = usePathname();
    const scheduleId = id.split('/').pop();

    async function fetchSchedules() {
        const { data } = await supabase.from("calendar").select("*").eq('id', scheduleId).single();
        setSchedule(data);
    }

    useEffect(() => {
        fetchSchedules();
    }, [schedule]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const changedScheduleTitle = { ...editSchedule, title: e.target.value };
        setEditSchedule(changedScheduleTitle);
    }
    const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const changedScheduleStart = { ...editSchedule, title: e.target.value };
        setEditSchedule(changedScheduleStart);
    }
    const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const changedScheduleEnd = { ...editSchedule, title: e.target.value };
        setEditSchedule(changedScheduleEnd);
    }

    return(
        <>
        <div className="inputArea">
            <p>{schedule?.title}</p>
            <div>
                <label htmlFor="title">予定</label>
                <input 
                    id="title"
                    type="text"
                    value={editSchedule?.title}
                    onChange={handleTitleChange}
                />
            </div>
            <div>
                <label htmlFor="start">開始日</label>
                <input
                    id="start"
                    type="date"
                    value={editSchedule?.start}
                    onChange={handleStartChange}
                />
            </div>
            <div>
                <label htmlFor="end">終了日</label>
                <input
                    id="end"
                    type="date"
                    value={editSchedule?.end}
                    onChange={handleEndChange}
                />
            </div>
        </div>
        <Link href="/">戻る</Link>
        </>
    )
}