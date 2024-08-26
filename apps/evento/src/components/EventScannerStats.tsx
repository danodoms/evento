"use client"

import React, { useState, useEffect, useRef } from 'react'
import { useQuery } from "@tanstack/react-query";
import { EventScannerStat, EventStat, getEventScannerStats, getEventsStats } from "@repo/models/Event";
import { format } from "date-fns"
import { Calendar as CalendarIcon, LogIn, LogOut, PieChart } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from './ui/badge';

export default function EventScannerStats() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [showLeftFade, setShowLeftFade] = useState(false);
    const [showRightFade, setShowRightFade] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const {
        data = [],
        error,
        isLoading,
    } = useQuery<EventScannerStat[]>({
        queryKey: ["eventScannerStats"],
        queryFn: getEventScannerStats,
    });

    const {
        data: eventsData = [],
    } = useQuery<EventStat[]>({
        queryKey: ["eventStats"],
        queryFn: getEventsStats,
    });

    useEffect(() => {
        console.log("Date changed:", date);
    }, [date]);

    const filteredData = data.filter((stat) => {
        if (!date) return true;
        return stat.date === format(date, "yyyy-MM-dd");
    });

    const filteredEventData = eventsData.find((stat) => {
        if (!date) return true;
        return stat.date === format(date, "yyyy-MM-dd");
    });


    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            const checkOverflow = () => {
                setShowRightFade(container.scrollWidth > container.clientWidth);
            };

            checkOverflow();
            window.addEventListener('resize', checkOverflow);
            return () => window.removeEventListener('resize', checkOverflow);
        }
    }, [filteredData]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const container = e.currentTarget;
        setShowLeftFade(container.scrollLeft > 0);
        setShowRightFade(
            container.scrollWidth > container.clientWidth &&
            container.scrollLeft < container.scrollWidth - container.clientWidth
        );
    };

    return (
        <div className='flex flex-col gap-2'>

            <div className='flex gap-4 items-center'>
                {/* <div className="font-semibold flex items-center text-sm mt-2 gap-2">
                    <PieChart className="size-5" />
                    <span className='text-nowrap'>Event Scanner</span>
                </div> */}

                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            <p className='font-medium'>{date ? format(date, "PPP") : <span>Pick a date</span>}</p>

                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>


            {filteredEventData && (
                <div>
                    <div className="bg-muted rounded-md p-4 gap-2 flex justify-evenly">
                        <div className='flex-col flex items-center'>
                            <p className='text-xs font-medium'>

                                Total Time In
                            </p>

                            <p className='font-bold text-lg flex gap-1 items-center'>
                                <LogIn className='size-4' />
                                {filteredEventData?.time_in_count}
                            </p>
                        </div>


                        <div className='flex-col flex items-center'>
                            <p className='text-xs font-medium'>
                                Total Time Out
                            </p>
                            <p className='font-bold flex gap-1 items-center text-lg'>
                                <LogOut className='size-4' />
                                {filteredEventData?.time_out_count}
                            </p>
                        </div>

                    </div>
                </div>
            )}



            <div className="relative">
                <div
                    ref={containerRef}
                    onScroll={handleScroll}
                    className='max-h-40 overflow-x-auto flex gap-2 w-auto'
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        WebkitOverflowScrolling: 'touch',
                    }}
                >
                    {filteredData.length > 0 ? (
                        filteredData.map((stat) => (
                            <div key={stat.date + stat.scanned_by_email} className="bg-muted rounded-md p-4 gap-2 flex flex-col min-w-40 shrink-0">
                                <h2 className='text-md font-bold mb-2'>{stat.scanned_by_email}</h2>
                                <div className='flex flex-col gap-2'>
                                    <div className='flex justify-between items-center'>
                                        <p className='text-xs font-medium flex gap-2 items-center'>
                                            Timed In
                                            <LogIn className='size-3' />
                                        </p>
                                        <Badge variant={"outline"}>
                                            {stat.time_in_count}
                                        </Badge>
                                    </div>
                                    <div className='flex justify-between'>
                                        <p className='text-xs font-medium flex gap-2 items-center'>
                                            Timed Out
                                            <LogOut className='size-3' />
                                        </p>
                                        <Badge variant={"outline"}>
                                            {stat.time_out_count}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center rounded-md  w-full p-4 bg-muted ">
                            <p className='font-medium text-sm'>
                                No data to show for this date
                            </p>
                        </div>
                    )}
                </div>
                {showLeftFade && (
                    <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none" />
                )}
                {showRightFade && (
                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
                )}
            </div>
        </div>
    )
}