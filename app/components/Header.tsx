import React from 'react';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import '../styles/components/header.css';

export default function Header () {
    const router = useRouter();
    const [ user, setUser ] = useState(null);
    

    const Logout = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { error: logoutError } = await supabase.auth.signOut();
            if (logoutError) {
                throw logoutError;
            }
            await router.push('/');
        } catch {
            alert('エラーが発生しました')
        }
    }
    return (
        <div className="flex justify-between mb-12 border-b border-violet-100 p-4">
        <h1 className="font-bold text-2xl text-gray-700">Calendar</h1>
        <form onSubmit={Logout}>
            <button className='logoutButton' type="submit">Log out</button>
        </form>
        </div>
    )
}