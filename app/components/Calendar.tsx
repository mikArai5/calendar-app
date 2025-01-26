"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateSelectArg } from "@fullcalendar/core/index.js";
import { useRouter } from "next/navigation";
import { addSchedule } from "@/utils/supabaseFunctions";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";

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
    }, []);

    async function fetchSchedules() {
        const { data } = await supabase.from("calendar").select("*");
        setSchedules(data);
    }

    const handleDateSelect= async (args: DateSelectArg) => {
        const title = prompt('予定のタイトルを入力してください');
        const content = "test";
        const calendarInstance = args.view.calendar;

        calendarInstance.unselect()
        if (title) {
            calendarInstance.addEvent({
                title,
                content,
                start: args.startStr,
                end: args.endStr,
                allDay: args.allDay,
            })
            await addSchedule(title);
        }
    }
    const router = useRouter();

    const handleDetail = (args: DateSelectArg) => {
        const slug: string = args.event.startStr;
        router.push( `/events/${slug}?date=${slug}`);
    }
    
    return (
        <>
        <nav className="flex justify-between mb-12 border-b border-violet-100">
        <h1 className="font-bold text-2xl text-gray-700">Calendar</h1>
        </nav>
        <main>
            <div>
                <div>
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        eventTimeFormat={{
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false, // 24時間表記を強制
                        }}
                        events={[
                        { title: '終日イベント', start: '2024-10-15', end: '2024-10-20' },
                        { title: '時間イベント', start: '2024-10-25T00:00:00Z' },
                        { title: '時間イベント', start: '2024-10-25T09:00:00Z' },
                        { title: 'ハロウィン', start: '2024-10-31' },
                        ]}
                        selectable={true}
                        select={handleDateSelect}
                        eventClick={handleDetail}
                    />
                </div>
                <div>
                    {schedules.map((schedule: any)=> (
                        <div key={schedule.id}>
                            <p>{schedule.title}</p>
                            <p>
                                {schedule.start}
                                <span>~</span>
                                {schedule.end}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
        </>
    );
}
