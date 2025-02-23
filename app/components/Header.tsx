'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { fetchUserInfo } from "@/app/actions";
import { logout } from '@/app/actions';
import '../styles/components/header.css';

export default function Header () {
    const [ id, setId] = useState('');

    // ログイン中のユーザーIDを取得
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
        <div className="flex justify-between border-b border-violet-100 header">
        <h1 className="font-bold text-gray-700">Calendar</h1>
        { userId && (
            <form>
                <button formAction={logout} className='logoutButton'>Log out</button>
            </form>
        )}
        </div>
    )
}