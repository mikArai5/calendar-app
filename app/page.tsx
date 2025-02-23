'use client';
import Calendar from "@/app/components/Calendar";
import './styles/style.css';
import { fetchUserInfo } from "./actions";
import { useState, useEffect } from 'react';

export default function Home() {
  const [ id, setId] = useState('');

  useEffect(() => {
    const getUserId = async () => {
      const user = await fetchUserInfo();
      const userId = user?.id as string;
      setId(userId);
    };

    getUserId();
  }, []); 

  const userId = id;

  return (
    <>
      <div className="flex justify-between mb-12 border-b border-violet-100 p-4">
        <h1 className="font-bold text-2xl text-gray-700">Calendar</h1>
      </div>
      <main>
        <div className="calendar">
          <div className="calendar__inner">
            <Calendar userId={userId}/>
          </div>
        </div>
      </main>
    </>
  );
}
