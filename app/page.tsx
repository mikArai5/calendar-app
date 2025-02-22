import Calendar from "@/app/components/Calendar";
import './styles/style.css';
import { PostgrestResponse } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";

type Schedule = {
  id: string;
  title: string;
  start: string;
  end: string;
}

const fetchSchedules = async() => {
  try {
      // ログインしているユーザーの情報を取得

      const supabase = await createClient();
      const authData = await supabase.auth.getUser();
      console.log({'authData': authData});

      if (!user?.id) {
          console.error('Useridが見つかりません');
          return;
      }
      const userId = user?.id as string;

      // ログインしているユーザーのIDと一致する投稿のみを取得
      const { data, error }: PostgrestResponse<Schedule> = await supabase
          .from("calendar")
          .select("*")
          .eq('userId', userId);
      if (error) {
          console.error('Error fetching schedules:', error);
          return;
      }

    } catch (err) {
        console.error('Error fetching schedules:', err);
    }
}

const allSchedules = await fetchSchedules();
console.log(allSchedules);

export default function Home() {
  return (
    <>
    <div className="flex justify-between mb-12 border-b border-violet-100 p-4">
      <h1 className="font-bold text-2xl text-gray-700">Calendar</h1>
    </div>
    <main>
      <div className="calendar">
        <div className="calendar__inner">
          <Calendar allSchedules={allSchedules}/>
        </div>
      </div>
    </main>
    </>
  );
}