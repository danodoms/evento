"use client"

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const signIn = () => {
    supabase.auth.signInWithOAuth({
        provider: 'google',
    })
}

export default function LoginPage() {
    return (
        <Button onClick={() => signIn()}>Sign in with google</Button>
    )
}