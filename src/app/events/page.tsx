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
import { MapPin, Clock, Calendar } from "lucide-react";

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
                <h1 className="text-2xl font-bold tracking-tight ">
                    Events
                </h1>


                <Link href="/events/create" className="flex gap-2 items-center button font-semibold border p-2 rounded-lg">
                    <Calendar className="mr size-4" />Add Event
                </Link>


            </div>






            <div className=" flex flex-col gap-4">

                {events.map((event, index) => (
                    <div key={index} className="p-4 border rounded-lg flex-col flex gap-2" >


                        <div className="flex gap-2 items-center flex-wrap">
                            <Calendar className="size-5" />
                            <h2 className="font-bold text-lg">
                                {event.name}
                            </h2>


                        </div>



                        <div className="text-xs text-balance font-thin truncate">
                            {event.description ? (
                                <>
                                    {event.description}
                                </>
                            ) : (
                                "No description"
                            )}
                        </div>


                        <Separator className="my-1" />


                        <div className="flex gap-2 flex-wrap">
                            <Badge className="flex gap-1"><Calendar className="size-3" />{formatDate(event.date)}</Badge>
                            <Badge className="flex gap-1"><Clock className="size-3" />{renderEventDuration(event.duration)}</Badge>
                            <Badge className="flex gap-1"><MapPin className="size-3" />{event.location}</Badge>
                        </div>



                    </div>


                    // <Card className="w-full" key={index}>
                    //     <CardHeader>
                    //         <CardTitle>{event.name}</CardTitle>
                    //         <CardDescription>{event.date}</CardDescription>
                    //     </CardHeader>
                    //     <CardContent className="grid gap-4">

                    //     </CardContent>
                    //     <CardFooter>
                    //         <Button className="w-full">
                    //             <CheckIcon className="mr-2 h-4 w-4" /> Mark all as read
                    //         </Button>
                    //     </CardFooter>
                    // </Card>
                ))}

            </div>

            <ToastContainer />
        </div>
    );
}