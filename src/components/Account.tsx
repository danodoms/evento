
"use client"
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { createClient } from "@/utils/supabase/client";


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
import { User } from "@supabase/supabase-js";



export default function Account() {

    const [user, setUser] = useState<User | null>(null);
    const supabase = createClient();
    useEffect(() => {
        const fetchUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            setUser(user);
        };
        fetchUser();
    }, []);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {/* <Button variant="outline">Open</Button> */}
                <div className="flex flex-wrap gap-3 items-center">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt={user?.email} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <div className="items-center">
                        <p className="text-xs opacity-50">Logged in as</p>
                        <p className="text-sm"> {user?.email ?? "user"}</p>
                    </div>


                    {user !== null ?
                        (<p>
                            {user.email ?? "user"}
                        </p>)
                        :
                        (<div>
                            <h1 className="text-destructive text-sm">No user logged in</h1>
                        </div>)}


                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>{user?.email ?? "user"}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LoginLogoutButton />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

