
"use client"
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { createClient } from "@repo/utils/supabase"
import { auth, currentUser } from "@clerk/nextjs/server";


import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import LoginButton from "./LogoutButton";
import LoginLogoutButton from "./LogoutButton";
import { set } from "date-fns";
import { useAuth, useUser, UserButton } from "@clerk/nextjs";


export default function Account() {
    const { isLoaded, isSignedIn, user } = useUser();

    if (!isLoaded || !isSignedIn) {
        return <>NO USER FOUND</>;
    }





    return (
        <div className="flex flex-wrap gap-3 items-center">
            <div className="items-center lg:order-last">
                <p className="text-xs opacity-50 hidden lg:block">Logged in as</p>
                <p className="text-sm font-semibold"> {user?.fullName ?? "user"}</p>
            </div>

            <div className="flex items-center">

                <UserButton />
            </div>
        </div>
    )
}