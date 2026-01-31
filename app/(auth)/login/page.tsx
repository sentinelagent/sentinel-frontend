"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FieldsetCard } from "@/components/common/fieldset-card";
import { Github, Chrome, Loader2 } from "lucide-react";
import { userService } from "@/lib/api";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await userService.login({
                email,
                password,
            });

            router.push("/dashboard");
        } catch (err: any) {
            setError(err.response?.data?.detail || err.message || "Failed to sign in");
        } finally {
            setLoading(false);
        }
    };

    const handleGithubLogin = async () => {
        // For GitHub OAuth, we'll still need to handle it. 
        // Usually, the backend provides a redirect URL.
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/users/github/login`;
    };

    return (
        <div className="w-full max-w-md space-y-12">
            {/* Logo */}
            <div className="text-center space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <span className="text-3xl font-bold">S</span>
                </div>
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tighter italic">Sentinel AI</h1>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">Secure Your Codebase</p>
                </div>
            </div>

            {/* Login Form */}
            <FieldsetCard legend="Sign in" dashed className="shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)]">
                <div className="space-y-6">
                    <form className="space-y-4" onSubmit={handleLogin}>
                        {error && (
                            <div className="p-3 border border-destructive bg-destructive/5 text-destructive text-[10px] font-bold uppercase tracking-widest">
                                {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-black/60">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="developer@sentinel.ai"
                                className="rounded-none border-black h-11 focus-visible:ring-0 focus-visible:border-black focus-visible:bg-black/5"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="password" className="text-[10px] font-bold uppercase tracking-widest text-black/60">Password</Label>
                                <Link href="#" className="text-[10px] font-bold uppercase tracking-widest text-black/40 hover:text-black hover:underline">Forgot?</Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className="rounded-none border-black h-11 focus-visible:ring-0 focus-visible:border-black focus-visible:bg-black/5"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full rounded-none h-11 bg-black text-white hover:bg-white hover:text-black border border-black transition-all duration-200 font-bold uppercase tracking-widest text-xs"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Continue"}
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <Separator className="w-full bg-black/10" />
                        </div>
                        <div className="relative flex justify-center text-[10px] font-bold uppercase">
                            <span className="bg-white px-4 text-black/40">or</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        <Button
                            variant="outline"
                            className="w-full rounded-none h-11 border-black hover:bg-black hover:text-white transition-all duration-200 text-[10px] font-bold uppercase tracking-widest gap-2"
                            onClick={handleGithubLogin}
                        >
                            <Github className="h-4 w-4" />
                            Continue with GitHub
                        </Button>
                        <Button variant="outline" className="w-full rounded-none h-11 border-black hover:bg-black hover:text-white transition-all duration-200 text-[10px] font-bold uppercase tracking-widest gap-2">
                            <Chrome className="h-4 w-4" />
                            Continue with Google
                        </Button>
                    </div>
                </div>
            </FieldsetCard>

            <div className="text-center space-y-4">
                <p className="text-[11px] font-bold text-black/40 uppercase tracking-widest">
                    Don&apos;t have an account yet?{" "}
                    <Link href="/signup" className="text-black underline underline-offset-4 decoration-black/20 hover:decoration-black transition-colors">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}
