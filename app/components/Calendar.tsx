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
import "../styles/components/calendar.css";
import { fetchUserInfo } from "@/app/actions";

type Schedule = {
    id: string;
    title: string;
    start: string;
    end: string;
}
type Schedules = Schedule[];

interface CalendarProps {
    userId: string;
}

const Calendar: React.FC<CalendarProps> = ({ userId }) => {
    const [ title, setTitle ] = useState<string>("");
    const [ start, setStart ] = useState<string>("");
    const [ end, setEnd ] = useState<string>("");
    const [ schedules, setSchedules ] = useState<Schedules>([]);
    // 予定が追加されたタイミングで全ての予定取得

    useEffect(()=> {
        fetchSchedules();
    }, [schedules]);

    async function fetchSchedules() {
        try {
            // ログインしているユーザーのIDと一致する投稿のみを取得
            const { data, error }: PostgrestResponse<Schedule> = await supabase
                .from("calendar")
                .select("*")
                .eq("userId", userId)

            if (error) {
                console.error("Error fetching schedules:", error);
                return;
            }

            // schedulesを更新
            setSchedules(data);
        } catch (err) {
            console.error("Error fetching schedules:", err);
        }
    }
    const router = useRouter();

    // 追加・表示した予定を押したら詳細ページに遷移
    const handleDetail = (args: EventClickArg) => {
        const slug: string = args.event.id;
        router.push( `/events/${slug}`);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (title === "" || start === "" || end === "") return;
        const user = await fetchUserInfo();
        const userId = user?.id as string;
        
        await addSchedule(title, start, end, userId);
        setSchedules(schedules);
        setTitle("");
        setStart("");
        setEnd("");
    }

    return (
        <>
        <form className="inputForm" onSubmit={(e) => handleSubmit(e)}>
            <div className="inputForm__item inputForm__title">
                <label htmlFor="title">タイトル</label>
                <input
                    id="title"
                    type="text"
                    className="title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
            </div>
            <div className="inputForm__date">
                <div className="inputForm__item">
                    <label htmlFor="start">開始日</label>
                    <input
                        id="start"
                        type="date"
                        className="start"
                        onChange={(e) => setStart(e.target.value)}
                        value={start}
                    />
                </div>
                <div className="inputForm__item">
                    <label htmlFor="end">終了日</label>
                    <input
                        id="end"
                        type="date"
                        className="end"
                        onChange={(e) => setEnd(e.target.value)}
                        value={end}
                    />
                </div>
            </div>
            <button className="addButton">追加</button>
        </form>
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            eventTimeFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false, // 24時間表記を強制
            }}
            events={schedules}
            selectable={true}
            eventClick={handleDetail}
            contentHeight={"auto"}
            aspectRatio={1.6}
            businessHours={{ daysOfWeek: [1, 2, 3, 4, 5] }}
            firstDay={1}
        />
        </>
    );
}
export default Calendar;