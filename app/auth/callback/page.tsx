"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
    const router = useRouter();

    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            if (event === "SIGNED_IN" && session) {
                router.push("/dashboard");
            }
        });
    }, [router]);

    return (
        <div className="flex h-screen w-full items-center justify-center bg-white font-mono">
            <div className="flex flex-col items-center gap-4">
                <div className="h-10 w-10 border-4 border-black border-t-transparent animate-spin" />
                <div className="text-[10px] font-black uppercase tracking-[0.4em]">Establishing Secure Session...</div>
            </div>
        </div>
    );
}
