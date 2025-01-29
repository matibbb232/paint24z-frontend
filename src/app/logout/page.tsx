"use client";

import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
    const router = useRouter();
    useEffect(() => {
        if (confirm('Are you sure you want to log out?')) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            redirect('/');
        } else {
            router.back();
        }
    }, []); 
    return (
        <div className="w-full h-full justify-center items-center text-center text-5xl font-jaro">redirecting...</div>
    );
}