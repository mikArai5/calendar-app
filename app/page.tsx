'use client';
import Calendar from "@/app/components/Calendar";
import Header from "./components/Header";
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
      <Header />
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
