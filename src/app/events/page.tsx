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

import { format, parseISO } from 'date-fns';
import { MapPin, Clock, Calendar, Pencil, Trash } from "lucide-react";

import Link from "next/link"







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

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold tracking-tight">Events</h1>
                <Link href="/events/create" className="flex gap-2 items-center button font-semibold border p-2 rounded-lg">
                    <Calendar className="mr size-4" />Add Event
                </Link>
            </div>

            <div className="flex flex-col gap-4">
                {events.map((event, index) => (
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

            <ToastContainer />
        </div>
    );
}