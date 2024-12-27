"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";


interface Event {
    title:string;
    start: Date | string;
    allday: boolean;
    id: number
}


export default function Calendar() {
    const handleDateClick = (arg) => {
        alert(arg.dateStr)
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
                plugins={[
                dayGridPlugin,
                interactionPlugin,
                timeGridPlugin
                ]}
                headerToolbar={{
                left: 'prev, next today',
                center: 'title',
                right: 'resourceTimelineWook, dayGridMonth, timeGridWeek'
                }}
                initialView="dayGridMonth"
                weekends={true}
                events={[
                {title: 'event 1', date: '2024-12-23'},
                {title: 'event 2', date: '2024-12-24'}
                ]}
                dateClick={handleDateClick}
                eventContent={renderEventContent}
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