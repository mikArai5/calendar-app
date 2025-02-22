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

export default function Calendar() {

    const [ schedules, setSchedules ] = useState<Schedules>([]);
    const [userId, setUserId] = useState("");
    // 予定が追加されたタイミングで全ての予定取得

    useEffect(() => {
        const getUserId = async () => {
            const user = await fetchUserInfo();
            const id = user?.id as string;
            setUserId(id);
        }
        getUserId();
    },[])

    if (userId) {
        const fetchSchedules = async() => {
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
        fetchSchedules();
    }



    const handleDateSelect= async (args: DateSelectArg) => {

        // 登録した予定・開始日・終了日の入力値を取得して代入
        const title = prompt("予定のタイトルを入力してください");
        const start = prompt("予定の開始日を入力してください") as string;
        const end = prompt("予定の終了日を入力してください") as string;
        const calendarInstance = args.view.calendar;
        // ログインしているユーザーのIDを取得して代入
        const user = await fetchUserInfo();
        const userId = user?.id as string;

        // 選択状態を解除
        calendarInstance.unselect();

        // 登録した予定・開始日・終了日・ログインしているユーザーのIDをsupabaseに登録
        if (title) {
            await addSchedule(title, start, end, userId);
        }
    }
    const router = useRouter();

    // 追加・表示した予定を押したら詳細ページに遷移
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
            hour: "2-digit",
            minute: "2-digit",
            hour12: false, // 24時間表記を強制
            }}
            events={schedules}
            selectable={true}
            select={handleDateSelect}
            eventClick={handleDetail}
            contentHeight={"auto"}
        />
        </>
    );
}