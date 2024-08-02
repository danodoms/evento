"use client"

import Link from "next/link"
import { Lock, TriangleAlert, LogInIcon, User, UserRound } from "lucide-react"
import { useClerk, useUser } from "@clerk/nextjs";
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Branding from "../Branding";

export default function Unauthorized() {
    const { user } = useUser();
    const { signOut } = useClerk();


    return (
        <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 ">
            <div className="mx-auto max-w-md text-center pb-28">
                <div className="mx-auto h-12 w-12 text-primary" />

                {/* <Card className="flex items-center gap-4 p-4 shadow-sm border-none">
                    <Avatar className="h-12 w-12 rounded-full">
                        <AvatarImage src={user?.imageUrl} />
                        <AvatarFallback><UserRound /></AvatarFallback>
                    </Avatar>
                    <div className="grid gap-0.5 text-left">
                        <div className="font-medium">{user?.primaryEmailAddress?.emailAddress}</div>
                        <div className="text-muted-foreground text-sm">Email Address</div>
                    </div>
                </Card> */}
                <div className="scale-50 border p-4 rounded-lg">
                    <Branding />
                </div>



                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl items-center flex">
                    <Lock className="mr-2 inline-block" />
                    Unauthorized email
                </h1>


                <div className="flex items-center gap-2 justify-center mt-4" >
                    <Avatar className=" rounded-full size-6">
                        <AvatarImage src={user?.imageUrl} />
                        <AvatarFallback><UserRound /></AvatarFallback>
                    </Avatar>

                    <p className=" text-muted-foreground font-semibold text-sm">
                        {user?.primaryEmailAddress?.emailAddress}
                    </p>

                </div>



                <div className="mt-6">
                    <Link
                        href="/sign-in"
                        className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        prefetch={false}

                        onClick={() => signOut()}
                    >
                        <LogInIcon className="mr-2 inline-block h-5 w-5" />Sign In
                    </Link>
                </div>
            </div>
        </div >
    )
}
