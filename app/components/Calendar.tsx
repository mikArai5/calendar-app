"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core/index.js";
import { useRouter } from "next/navigation";
import { addSchedule } from "@/utils/supabaseFunctions";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import '../styles/components/calendar.css';


export default function Calendar() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        const start = prompt('予定の開始日を入力してください') as string;
        const end = prompt('予定の終了日を入力してください') as string;
        const calendarInstance = args.view.calendar;

        calendarInstance.unselect()
        if (title) {
            await addSchedule(title, start, end);
        }
    }
    const router = useRouter();

    const handleDetail = (args: EventClickArg) => {
        const slug: string = args.event.id;
        router.push( `/events/${slug}`);
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
