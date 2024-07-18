"use client"

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/dist/server/api-utils";
import Image from "next/image"
import Link from "next/link"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { appName } from "@/config";

// import { signInWithGoogle } from "./action";




export default function LoginPage() {

    async function signInWithGoogle() {
        const supabase = createClient();

        console.log("gdayufadhufgdauhfgvbaduhfgadhuib")
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${location.origin}/auth/callback`
            }
        });
    }

    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold px-4 py-2 rounded-full">{appName}</h1>
                        <p className="text-xs opacity-50 font-light tracking-wide">An internal attendance management web-app</p>
                        {/* <h2 className="text-lg mt-10">Login</h2> */}
                        <p className="text-balance text-muted-foreground mt-4">
                            Only authorized emails can login
                        </p>
                    </div>
                    <div className="grid gap-4">
                        {/* <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <Link
                                    href="/forgot-password"
                                    className="ml-auto inline-block text-sm underline"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                            <Input id="password" type="password" required />
                        </div>
                        <Button type="submit" className="w-full">
                            Login
                        </Button> */}
                        <Button variant="outline" className="w-full" onClick={() => signInWithGoogle()}>
                            Login with Google
                        </Button>
                    </div>
                    {/* <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="#" className="underline">
                            Sign up
                        </Link>
                    </div> */}
                </div>
            </div>
            <div className="hidden bg-muted lg:block">
                <Image
                    src="/placeholder.svg"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )



}