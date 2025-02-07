"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateSelectArg } from "@fullcalendar/core/index.js";
import { useRouter } from "next/navigation";
import { addSchedule } from "@/utils/supabaseFunctions";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import '../styles/components/calendar.css';

interface Event {
    title:string;
    start: Date | string;
    allday: boolean;
    id: number
}

export default function Calendar() {
    const [ schedules, setSchedules ] = useState<any>([]);

    useEffect(() => {
        fetchSchedules();
    }, [schedules]);

    async function fetchSchedules() {
        const { data } = await supabase.from("calendar").select("*");
        setSchedules(data);

    }

    const handleDateSelect= async (args: DateSelectArg) => {
        const title = prompt('予定のタイトルを入力してください');
        const start = prompt('予定の開始時刻を入力してください');
        const end = prompt('予定の終了時刻を入力してください');
        const calendarInstance = args.view.calendar;

        calendarInstance.unselect()
        if (title) {
            await addSchedule(title, start, end);
        }
    }
    const router = useRouter();

    const handleDetail = (args: DateSelectArg) => {
        const slug: string = args.event.startStr;
        router.push( `/events/${slug}?date=${slug}`);
    }

    return (
        <>
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            hour12: false, // 24時間表記を強制
            }}
            events={schedules}
            selectable={true}
            select={handleDateSelect}
            eventClick={handleDetail}
            contentHeight={'auto'}
        />
        </>
    );
}
