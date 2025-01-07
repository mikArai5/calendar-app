'use client';

import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    return(
        <>
            <p>{router.query.id}</p>
            <p>{router.query.name}</p>
        </>
    )
}