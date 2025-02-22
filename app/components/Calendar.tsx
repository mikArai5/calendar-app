"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core/index.js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import '../styles/components/calendar.css';

type Schedule = {
    id: string;
    title: string;
    start: string;
    end: string;
}
type Schedules = Schedule[];


export default function Calendar({allSchedules}) {

    const [ schedules, setSchedules ] = useState<Schedules>(allSchedules);


    // const handleDateSelect= async (args: DateSelectArg) => {

    //     // 登録した予定・開始日・終了日の入力値を取得して代入
    //     const title = prompt('予定のタイトルを入力してください');
    //     const start = prompt('予定の開始日を入力してください') as string;
    //     const end = prompt('予定の終了日を入力してください') as string;
    //     const calendarInstance = args.view.calendar;
    //     // ログインしているユーザーのIDを取得して代入
    //     const user = await fetchUserInfo();
    //     const userId = user?.id as string;

    //     // 選択状態を解除
    //     calendarInstance.unselect();

    //     // 登録した予定・開始日・終了日・ログインしているユーザーのIDをsupabaseに登録
    //     if (title) {
    //         await addSchedule(title, start, end, userId);
    //     }
    // }

    const router = useRouter();

    // 追加・表示した予定を押したら詳細ページに遷移
    const handleDetail = (args: EventClickArg) => {
        const slug: string = args.event.id;
        router.push( `/events/${slug}`);
    }

    const selectDate = async (args: DateSelectArg) => {
    }

    return (
        <>
        <div className="inputForm">
            <div className="inputForm__item">
                <label htmlFor="title">タイトル</label>
                <input className="schedule__title" id="title" type="text" />
            </div>
            <div className="inputForm__item">
                <label htmlFor="start">開始</label>
                <input id="start" type="date" />
            </div>
            <div className="inputForm__item">
                <label htmlFor="end">終了</label>
                <input id="end" type="date" />
            </div>
            <button className="addButton">追加</button>
        </div>
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
            select={selectDate}
            eventClick={handleDetail}
            contentHeight={'auto'}
        />
        </>
    );
}
