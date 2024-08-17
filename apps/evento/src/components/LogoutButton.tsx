"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { createClient } from "@repo/utils/supabase";
// import { signout } from "@/lib/auth-actions";

const LogoutButton = () => {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();
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
    if (user) {
        return (
            <Button
                onClick={() => {
                    // signout();
                    setUser(null);
                    router.push("/login");
                }}
            >
                Log out
            </Button>
        );
    }

};

export default LogoutButton;