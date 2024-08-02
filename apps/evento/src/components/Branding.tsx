import { Zap } from 'lucide-react'
import React from 'react'

export default function Branding() {
    return (
        <div className="rounded-lg items-center justify-center flex flex-col">
            <h1 className="font-extrabold lg:text-7xl text-6xl">
                evento
            </h1>
            <p className="text-balance  text-xs opacity-70 flex gap-1 items-center"><Zap className="size-3" />Streamlining university events</p>
        </div>
    )
}
