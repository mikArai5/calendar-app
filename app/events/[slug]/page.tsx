'use client';

import { useSearchParams } from "next/navigation";

export default function Page() {
    const searchParams = useSearchParams();
    const allQuaryParameters = searchParams.toString();
    console.log(allQuaryParameters);
    return(
        <>
            <p></p>
            <p></p>
        </>
    )
}