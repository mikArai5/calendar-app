"use client";
import Calendar from "@/app/components/Calendar";
import './styles/style.css';

export default function Home() {
  return (
    <>
    <div className="flex justify-between mb-12 border-b border-violet-100 p-4">
      <h1 className="font-bold text-2xl text-gray-700">Calendar</h1>
    </div>
    <main>
      <div className="calendar">
        <div className="calendar__inner">
          <Calendar />
        </div>
      </div>
    </main>
    </>
  );
}
