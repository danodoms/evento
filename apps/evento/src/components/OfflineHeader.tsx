"use client"

import { Unplug, WifiOff } from 'lucide-react'
import React from 'react'
import useOnlineStatus from "@/hooks/useOnlineStatus";

export default function OfflineHeader() {

    const isOnline = useOnlineStatus();

    if (isOnline) return null;

    return (
        <div className='w-full bg-destructive flex p-1 items-center justify-center '>
            <p className='font-semibold text-sm flex gap-2 items-center'><Unplug className='size-4' />You are offline</p>
        </div>
    )
}
