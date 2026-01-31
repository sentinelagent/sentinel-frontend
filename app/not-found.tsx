import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#F5F5F4] p-4 font-mono selection:bg-black selection:text-white">
            <div className="max-w-md w-full space-y-12 text-center">
                {/* Error Code */}
                <div className="relative inline-block">
                    <h1 className="text-[120px] font-black leading-none tracking-tighter italic opacity-10">404</h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-16 w-16 rotate-45 border-4 border-black bg-white flex items-center justify-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                            <span className="text-2xl font-black -rotate-45">?</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-3xl font-black uppercase italic tracking-tight underline decoration-black/10 underline-offset-8">Segment Not Found</h2>
                    <p className="text-xs font-bold text-black/40 uppercase tracking-[0.3em] leading-relaxed">
                        The requested resource has been moved, deleted, or never existed in the current knowledge base mapping.
                    </p>
                </div>

                <div className="pt-8 border-t border-black/10">
                    <Link href="/dashboard">
                        <Button className="rounded-none h-14 px-10 bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-all font-bold uppercase tracking-[0.4em] text-xs shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
                            Return to Core
                        </Button>
                    </Link>
                </div>

                <div className="pt-12">
                    <div className="text-[8px] font-black text-black/20 uppercase tracking-[0.5em]">Sentinel AI · Secure Infrastructure Monitoring</div>
                </div>
            </div>
        </div>
    );
}
