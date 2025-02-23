'use client';
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import Link from "next/link";
import './styles/style.css';
import { deleteSchedule, getAllSchedules, updateSchedule } from "@/utils/supabaseFunctions";
import { useRouter } from "next/navigation";
import { PostgrestResponse } from "@supabase/supabase-js";
import { fetchUserInfo } from "@/app/actions";

type EditSchedule = {
    id: string;
    title: string;
    start: string;
    end: string;
}

type Schedule = {
    id: string;
    title: string;
    start: string;
    end: string;
}

type Schedules = Schedule[];

export default function Page() {
    // urlからid取得
    const path = usePathname();
    const scheduleId = path.split('/').pop() as string;

    const [ schedule, setSchedule ] = useState<Schedule>({
        id: '',
        title: '',
        start: '',
        end: '',
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ schedules, setSchedules ] = useState<Schedules>([]);
    const [ otherSchedules, setOtherSchedules ] = useState<Schedules>([]);
    const [ editSchedule, setEditSchedule ] = useState<EditSchedule>({
        id: scheduleId,
        title: schedule.title,
        start: schedule.start,
        end: schedule.end,
    });

    const router = useRouter();

    // urlから取得したidと一致するスケジュールを取得
    async function fetchSchedule() {
        try {
            const { data, error } = await supabase.from("calendar").select("*").eq('id', scheduleId).single();

            if (error) {
                console.error("Error fetching schedules:", error);
                return;
            }
            setSchedule(data);
        } catch (err) {
            console.error("Error fetching schedules:", err);
        }

    }

    // scheduleの値が更新されたらsetEditScheduleにscheduleの値を入れる
    useEffect(() => {
        setEditSchedule(schedule);
        fetchOtherSchedule();
    }, [schedule]);
    
    // 初回レンダリング時に登録ずみの全ての予定を取得
    useEffect(() => {
        fetchSchedule();
    }, []);

     // 変更後の予定のタイトルをeditScheduleにセットする
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const changedScheduleTitle = { ...editSchedule, title: e.target.value};
        setEditSchedule(changedScheduleTitle);
    }
    // 変更後の開始日をeditScheduleにセットする
    const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const changedScheduleStart = { ...editSchedule, start: e.target.value };
        setEditSchedule(changedScheduleStart);
    }
    // 変更後の終了日をeditScheduleにセットする
    const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const changedScheduleEnd = { ...editSchedule, end: e.target.value };
        setEditSchedule(changedScheduleEnd);
    }

    // 更新ボタンを押したら、editScheduleに入っている内容でsupabaseのデータを更新
    const handleSubmit = async(id: string, title: string, start: string, end: string) => {
        await updateSchedule(id, title, start, end);
        // カレンダー一覧画面に戻す
        router.push('/');
    }

    // 削除ボタンを押したら表示中の予定を削除し、一覧画面に戻る
    const handleDelete = async (id: string) => {
        await deleteSchedule(id);
        // 削除されていないテーブルのデータを全て取得・表示
        const schedules = await getAllSchedules();
        setSchedules(schedules);
        // カレンダー一覧画面に戻す
        router.push('/');
    }

    async function fetchOtherSchedule() {
        try {
            // ログインしているユーザーの情報を取得
            const user = await fetchUserInfo();
            if (!user?.id) {
                console.error('Useridが見つかりません');
                return;
            }
            const userId = user?.id as string;

            // ログインしているユーザーのIDと一致する投稿のみを取得
            const { data, error }: PostgrestResponse<Schedule> = await supabase
                .from("calendar")
                .select("*")
                .match({'userId': userId, 'start': schedule.start })
                .neq('id', schedule.id);

            if(data === null && undefined) {
                return;
            }
    
            if (error) {
                console.error('Error fetching schedules:', error);
                return;
            }
            setOtherSchedules(data);
            console.log(otherSchedules);
        } catch (err) {
            console.error('Error fetching schedules:', err);
        }
    }


    return(
        <>
        <div className="detail">
            <div className="detail__inner">
                <ul className="inputArea">
                    <li>
                        <label htmlFor="title">予定</label>
                        <input 
                            id="title"
                            type="text"
                            defaultValue={schedule.title}
                            onChange={handleTitleChange}
                        />
                    </li>
                    <li>
                        <label htmlFor="start">開始日</label>
                        <input
                            id="start"
                            type="date"
                            defaultValue={schedule.start}
                            onChange={handleStartChange}
                        />
                    </li>
                    <li>
                        <label htmlFor="end">終了日</label>
                        <input
                            id="end"
                            type="date"
                            defaultValue={schedule.end}
                            onChange={handleEndChange}
                        />
                    </li>
                </ul>
                <div className="buttons">
                    <span className="update" onClick={()=> handleSubmit(editSchedule.id, editSchedule.title, editSchedule.start, editSchedule.end)}>更新</span>
                    <span className="delete" onClick={()=> handleDelete(schedule.id)}>削除</span>
                    <Link className="back" href="/">戻る</Link>
                </div>
                <div className="otherSchedules">
                    <p>同じ日の予定：</p>
                    <ul>
                        {otherSchedules?.map((otherSchedule) => (
                            <li key={otherSchedule.id}>{otherSchedule?.title}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
        </>
    )
}