'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { fetchUserInfo } from "@/app/actions";
import { logout } from '@/app/actions';
import '../styles/components/header.css';

export default function Header () {
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
    console.log(userId);

    return (
        <div className="flex justify-between mb-12 border-b border-violet-100 p-4">
        <h1 className="font-bold text-2xl text-gray-700">Calendar</h1>
        { userId && (
            <button formAction={logout} className='logoutButton'>Log out</button>
        )}
        </div>
    )
}