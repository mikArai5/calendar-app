"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core/index.js";
import { useRouter } from "next/navigation";
import { addSchedule } from "@/utils/supabaseFunctions";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import { PostgrestResponse } from "@supabase/supabase-js";
import '../styles/components/calendar.css';

type Schedule = {
    id: string;
    title: string;
    start: string;
    end: string;
}
type Schedules = Schedule[];

export default function Calendar() {

    const [ schedules, setSchedules ] = useState<Schedules>([]);

    useEffect(() => {
        fetchSchedules();
        
    }, [schedules]);

    async function fetchSchedules() {
        try {
            const { data, error }: PostgrestResponse<Schedule> = await supabase
                .from("calendar")
                .select("*");
    
            if (error) {
                console.error('Error fetching schedules:', error);
                return;
            }
    
            setSchedules(data);
        } catch (err) {
            console.error('Error fetching schedules:', err);
        }
    }

    async function fetchUserInfo() {
        try {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) {
                console.error('Error fetching user:', error);
            } else {
                console.log(user);
            }
        } catch (err) {
            console.error('Error in getUser:', err);
        }
    }

    useEffect(() => {
        fetchUserInfo();
    },[]);

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
