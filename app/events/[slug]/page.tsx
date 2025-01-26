'use client';
import { useSearchParams } from "next/navigation";

export default function Page() {
    const searchParams = useSearchParams();
    const pageName = searchParams.get("date");

    return(
        <>
            <p>{pageName}</p>
        </>
    )
}