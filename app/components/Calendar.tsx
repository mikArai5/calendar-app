"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import jaLocale from "@fullcalendar/core/locales/ja";
import { DateSelectArg } from "@fullcalendar/core/index.js";



interface Event {
    title:string;
    start: Date | string;
    allday: boolean;
    id: number
}




export default function Calendar() {
    const handleDateClick = (arg: { dateStr: any }) => {
        alert(arg.dateStr)
    }
    const handleDateSelect= (args: DateSelectArg) => {
        const title = prompt('予定のタイトルを入力してください')
        const calendarInstance = args.view.calendar

        calendarInstance.unselect()
        if (title) {
            calendarInstance.addEvent({
                title,
                start: args.startStr,
                end: args.endStr,
                allDay: args.allDay,
            })
        }
    }
    const handleDetail = (arg: DateSelectArg) => {
        const eventUrl = '/event/' + arg.event.id;
        window.location.href = eventUrl;
    }
    return (
        <>
        <nav className="flex justify-between mb-12 border-b border-violet-100 p-4">
        <h1 className="font-bold text-2xl text-gray-700">Calendar</h1>
        </nav>
        <main className="flex min-h0screen flex-col items-center justify-center justify-between p-24">
        <div className="grid grid-cols-10">
            <div className="col-span-8">
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
        </div>
        </main>
        </>
    );
}

function renderEventContent(eventInfo: any) {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    )
}