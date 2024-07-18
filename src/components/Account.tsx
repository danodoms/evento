
"use client"
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { createClient } from "@/utils/supabase/client";
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
import { useAuth, useUser } from "@clerk/nextjs";


export default function Account() {
    const { isLoaded, isSignedIn, user } = useUser();

    if (!isLoaded || !isSignedIn) {
        return <>NO USER FOUND</>;
    }


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {/* <Button variant="outline">Open</Button> */}
                <div className="flex flex-wrap gap-3 items-center">
                    <Avatar>
                        <AvatarImage src={user?.imageUrl} alt="user-profile" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <div className="items-center">
                        <p className="text-xs opacity-50">Logged in as</p>
                        <p className="text-sm"> {user?.fullName ?? "user"}</p>
                    </div>


                    {user !== null ?
                        (<p>
                            {/* {user.email ?? "user"} */}
                        </p>)
                        :
                        (<div>
                            <h1 className="text-destructive text-sm">No user logged in</h1>
                        </div>)}


                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>null</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LoginLogoutButton />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

