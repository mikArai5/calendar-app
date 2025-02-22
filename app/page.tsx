"use client";
import Calendar from "@/app/components/Calendar";
import Header from "./components/Header";
import './styles/style.css';

export default function Home() {
  return (
    <>
    <Header />
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
