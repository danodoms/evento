"use client"


import { useQuery } from "@tanstack/react-query";
import { EventForm } from "./EventForm";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { Event, getEvents } from "@/models/Event";

import { Separator } from "@/components/ui/separator";


import { BellIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
// import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge";

import { format, parseISO, getMonth, getYear } from 'date-fns';
import { MapPin, Clock, Calendar, Pencil, Trash } from "lucide-react";

import Link from "next/link"

import { useState, useMemo } from 'react';


import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"








export default function EventsPage() {


    const { data: events = [], error, isLoading } = useQuery<Event[]>({
        queryKey: ["events"],
        queryFn: getEvents,
    });

    function formatDate(dateString: string): string {
        // Parse the ISO format date string
        const parsedDate = parseISO(dateString);

        // Format the date in the desired text form
        const formattedDate = format(parsedDate, "MMMM d, yyyy");

        return formattedDate;
    }

    const [filter, setFilter] = useState<string>('');
    const [durationFilter, setDurationFilter] = useState<string>('');
    const [monthFilter, setMonthFilter] = useState<number | null>(null);
    const [yearFilter, setYearFilter] = useState<number | null>(null);



    const uniqueMonths = useMemo(() => {
        const months = events.map(event => getMonth(parseISO(event.date)));
        return Array.from(new Set(months));
    }, [events]);

    const uniqueYears = useMemo(() => {
        const years = events.map(event => getYear(parseISO(event.date)));
        console.log("Unique Years", Array.from(new Set(years)));
        return Array.from(new Set(years));
    }, [events]);

    function renderEventDuration(duration: Event["duration"]): string {
        switch (duration) {
            case "AM_ONLY":
                return "Morning";
            case "PM_ONLY":
                return "Afternoon";
            case "AM_AND_PM":
                return "Whole Day";
            default:
                return "Unknown";
        }
    }

    const filteredEvents = events.filter(event => {
        const eventDate = parseISO(event.date);
        return (
            event.name.toLowerCase().includes(filter.toLowerCase()) &&
            (durationFilter ? event.duration === durationFilter : true) &&
            (monthFilter !== null ? getMonth(eventDate) === monthFilter : true) &&
            (yearFilter !== null ? getYear(eventDate) === yearFilter : true)
        );
    });

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold tracking-tight">Events</h1>
                <Link href="/events/create" className="flex gap-2 items-center button font-semibold border p-2 rounded-lg">
                    <Calendar className="mr size-4" />Add Event
                </Link>
            </div>










            <div className="flex gap-2 justify-evenly">
                {/* <input
                    type="text"
                    placeholder="Filter by name"
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    className="p-2 border rounded-lg"
                /> */}



                <Select onValueChange={value => setYearFilter(value ? Number(value) : null)} value={yearFilter !== null ? yearFilter.toString() : ''}>
                    <SelectTrigger className="">
                        <SelectValue placeholder="All Years" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Years</SelectLabel>
                            <SelectItem value={null}>All Years</SelectItem>
                            {uniqueYears.map(year => (
                                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>




                <Select onValueChange={value => setMonthFilter(value ? Number(value) : null)} value={monthFilter !== null ? monthFilter.toString() : ''}>
                    <SelectTrigger className="">
                        <SelectValue placeholder="All Months" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Months</SelectLabel>
                            <SelectItem value={null}>All Months</SelectItem>
                            {uniqueMonths.map(month => (
                                <SelectItem key={month} value={month.toString()}>{format(new Date(0, month), "MMMM")}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>





                <Select onValueChange={value => setDurationFilter(value)} value={durationFilter}>
                    <SelectTrigger className="">
                        <SelectValue className="text-xs" placeholder="All Durations" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Durations</SelectLabel>
                            <SelectItem value={null}>All Durations</SelectItem>
                            <SelectItem value="AM_ONLY">Morning</SelectItem>
                            <SelectItem value="PM_ONLY">Afternoon</SelectItem>
                            <SelectItem value="AM_AND_PM">Whole Day</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

            </div>












            {filteredEvents ? (
                <div className="flex flex-col gap-4">
                    {/* RENDER EVENT CARDS */}
                    {/* RENDER EVENT CARDS */}
                    {/* RENDER EVENT CARDS */}
                    {filteredEvents.map((event, index) => (
                        <div key={index} className="p-4 border rounded-lg flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <div className="flex gap-2 items-center">
                                    <Calendar className="size-5" />
                                    <p className="font-bold text-sm">{formatDate(event.date)}</p>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <Link href="#" className="text-xs border p-2 rounded-full flex gap-1"><Trash className="size-4" /></Link>
                                    <Link href="#" className="text-xs border p-2 rounded-full flex gap-1"><Pencil className="size-4" /></Link>
                                </div>
                            </div>

                            <Separator className="my-1" />

                            <h2 className="font-bold text-xl">{event.name}</h2>

                            <div className="text-xs text-balance truncate">
                                {event.description ? event.description : "No description"}
                            </div>

                            <div className="flex gap-2 flex-wrap mt-1">
                                <Badge className="flex gap-1"><Clock className="size-3" />{renderEventDuration(event.duration)}</Badge>
                                {event.location && (
                                    <Badge className="flex gap-1"><MapPin className="size-3" />{event.location}</Badge>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    <p>No events</p>
                </div>
            )}



            <ToastContainer />
        </div>
    );
}