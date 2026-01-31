import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FieldsetCard } from "@/components/common/fieldset-card";
import { Github, Chrome } from "lucide-react";

export default function SignupPage() {
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

            {/* Signup Form */}
            <FieldsetCard legend="Create Account" dashed className="shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)]">
                <div className="space-y-6">
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-black/60">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="developer@sentinel.ai"
                                className="rounded-none border-black h-11 focus-visible:ring-0 focus-visible:border-black focus-visible:bg-black/5"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" name="password" className="text-[10px] font-bold uppercase tracking-widest text-black/60">Create Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className="rounded-none border-black h-11 focus-visible:ring-0 focus-visible:border-black focus-visible:bg-black/5"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirm-password" name="confirm-password" className="text-[10px] font-bold uppercase tracking-widest text-black/60">Confirm Password</Label>
                            <Input
                                id="confirm-password"
                                type="password"
                                placeholder="••••••••"
                                className="rounded-none border-black h-11 focus-visible:ring-0 focus-visible:border-black focus-visible:bg-black/5"
                            />
                        </div>

                        <Button type="submit" className="w-full rounded-none h-11 bg-black text-white hover:bg-white hover:text-black border border-black transition-all duration-200 font-bold uppercase tracking-widest text-xs">
                            Create Account
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

                    <Button variant="outline" className="w-full rounded-none h-11 border-black hover:bg-black hover:text-white transition-all duration-200 text-[10px] font-bold uppercase tracking-widest gap-2">
                        <Github className="h-4 w-4" />
                        Sign up with GitHub
                    </Button>
                </div>
            </FieldsetCard>

            <div className="text-center space-y-4">
                <p className="text-[11px] font-bold text-black/40 uppercase tracking-widest">
                    Already have an account?{" "}
                    <Link href="/login" className="text-black underline underline-offset-4 decoration-black/20 hover:decoration-black transition-colors">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}
