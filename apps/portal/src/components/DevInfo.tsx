import React from 'react'


import { Briefcase, CalendarDays, Download, Map, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";


import { motion } from "framer-motion"

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function DevInfo() {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <div className="flex text-sm font-semibold rounded-full items-center ">

                    <div className='flex gap-2 items-center font-semibold'>
                        <p>Developed by</p>
                        <Avatar className='size-8'>
                            <AvatarImage src="https://avatars.githubusercontent.com/u/165539900?v=4" />
                            <AvatarFallback>DD</AvatarFallback>
                        </Avatar>
                        <p>danodoms</p>




                    </div>
                </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                    <Avatar>
                        <AvatarImage src="https://avatars.githubusercontent.com/u/165539900?v=4" />
                        <AvatarFallback>VC</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold">@danodoms</h4>
                        <p className="text-sm">
                            I make things for the web.
                        </p>

                        <a href="https://danodoms.vercel.app" target='_blank' className=' underline italic font-normal text-xs flex gap-2 items-center'>

                            <Briefcase className='size-4' />

                            My Portfolio</a>

                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}
