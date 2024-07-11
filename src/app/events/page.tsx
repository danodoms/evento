"use client"

import { useQuery } from "@tanstack/react-query";
import { EventForm } from "./EventForm";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { deactivateEvent, Event, getEvents } from "@/models/Event";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { format, parseISO, getMonth, getYear } from 'date-fns';
import { MapPin, Clock, Calendar, Pencil, Trash, SquarePen, Ellipsis, Plus, EllipsisVertical, Filter } from "lucide-react";
import Link from "next/link"
import { useState, useMemo } from 'react';
import EventFormDialog from "./EventFormDialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Button
} from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import SelectFilter from "@/components/SelectFilter";
import { Value } from "@radix-ui/react-select";


import { eventDuration } from "@/models/Event"




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

    const [statusFilter, setStatusFilter] = useState<'active' | 'inactive'>('active');
    const [filter, setFilter] = useState<string>('');
    const [durationFilter, setDurationFilter] = useState<eventDuration | "all">('all');
    const [monthFilter, setMonthFilter] = useState<string>('all');
    const [yearFilter, setYearFilter] = useState<string>('all');

    const convertDuration = (duration: string): eventDuration | undefined => {
        if (duration.toLowerCase() == "morning") {
            return "AM_ONLY"
        } else if (duration.toLowerCase() == "afternoon") {
            return "PM_ONLY"
        } else if (duration.toLowerCase() == "whole day") {
            return "AM_AND_PM"
        }
    }

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

    const filteredEvents: Event[] = events.filter(event => {
        const eventDate = parseISO(event.date);
        return (
            event.name.toLowerCase().includes(filter.toLowerCase()) &&
            (statusFilter == 'active' ? event.is_active == true : event.is_active == false) &&
            (durationFilter !== 'all' ? event.duration === convertDuration(durationFilter) : true) &&
            (monthFilter !== 'all' ? extractMonthName(event.date) === monthFilter : true) &&
            (yearFilter !== 'all' ? getYear(eventDate) === Number(yearFilter) : true)
        );
    });

    function resetFilters() {
        setStatusFilter('active');
        setFilter('');
        setDurationFilter('all');
        setMonthFilter('all');
        setYearFilter('all');
    }

    function extractMonthName(dateString: string): string {
        // Parse the date string into a Date object
        const date = parseISO(dateString);
        // Format the date to get the full month name
        return format(date, 'MMMM');
    }


    function countActiveFilters() {
        let count = 0;
        if (statusFilter !== 'active') count++;
        if (durationFilter !== 'all') count++;
        if (monthFilter !== 'all') count++;
        if (yearFilter !== 'all') count++;
        return count;
    }

    function formatIsoDate(isoDate: any, includeTime = true) {
        const parsedDate = parseISO(isoDate);
        const dateFormat = includeTime ? 'MMMM d, yyyy h:mm:ss a OOOO' : 'MMMM d, yyyy';
        return format(parsedDate, dateFormat);
    }

    function convertMonthsToNames(months: number[]): string[] {
        return months.map(month => {
            // Create a date object for the given month and an arbitrary year and day
            const date = new Date(2021, month, 1);
            // Format the date to get the month name
            return format(date, 'MMMM');
        });
    }

    return (
        <div className="flex flex-col gap-4">
            {/* HEADER SECTION */}
            <div className="flex gap-2 items-center">

                <h1 className="text-2xl font-bold tracking-tight mr-auto">Events</h1>

                <Link href="/events/create" >
                    <Button variant={"ghost"}>  <Plus className="size-4" />Add</Button>
                </Link>

                {/* FILTER SECTION */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline"><Filter className="mr-2 size-4" />Filter
                            {countActiveFilters() > 0 && (
                                <Badge variant={"destructive"} className="ml-2">
                                    {countActiveFilters()}
                                </Badge>
                            )}
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="flex h-full justify-center flex-col">
                        <SheetHeader>
                            <SheetTitle>Filter Events</SheetTitle>
                            <SheetDescription className="text-balance">
                                Select filters to apply
                            </SheetDescription>
                        </SheetHeader>

                        <div className="flex gap-4 flex-col justify-evenly py-4">

                            {/* STATUS FILTER */}
                            <SelectFilter label="Status" items={["Inactive"]} value={statusFilter} setValue={setStatusFilter} defaultValue={{ label: "Active", value: "active" }} />

                            {/* YEAR FILTER */}
                            <SelectFilter label="Year" items={uniqueYears} value={yearFilter} setValue={setYearFilter} defaultValue={{ label: "All Years", value: "all" }} />

                            {/* MONTH FILTER */}
                            <SelectFilter label="Month" items={convertMonthsToNames(uniqueMonths)} value={monthFilter} setValue={setMonthFilter} defaultValue={{ label: "All Months", value: "all" }} />

                            {/* DURATION FILTER */}
                            <SelectFilter label="Duration" items={["Morning", "Afternoon", "Whole day"]} value={durationFilter} setValue={setDurationFilter} defaultValue={{ label: "All Durations", value: "all" }} />

                        </div>
                        <SheetFooter className="flex gap-2 flex-col">



                            <SheetClose asChild>
                                <Button type="submit">Apply Filters</Button>
                            </SheetClose>

                            <Button onClick={resetFilters} variant={"ghost"}>Reset Filters</Button>

                        </SheetFooter>
                    </SheetContent>
                </Sheet>

            </div>

            {/* CARDS SECTION */}
            {
                filteredEvents.length != 0 ? (
                    <div className="flex flex-col gap-3 md:grid grid-cols-2 overflow-y-auto max-h-screen rounded-md">
                        {/* RENDER EVENT CARDS */}
                        {filteredEvents.map((event, index) => (
                            <div key={index} className="p-4 border rounded-lg flex flex-col gap-2 backdrop-contrast-50 backdrop-opacity-25 ">
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-2 items-center">
                                        <Calendar className="size-5" />
                                        <p className="font-bold text-sm">{formatDate(event.date)}</p>

                                    </div>
                                    <div className="flex gap-2 items-center">

                                        <DropdownMenu>
                                            <DropdownMenuTrigger className="border rounded-full px-4 text-sm flex gap-2 items-center"><Ellipsis className=" " /></DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem asChild ><EventFormDialog event={event} /></DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => deactivateEvent(event)}><Trash className="size-4 mr-2" />Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>

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
                    <div className="flex flex-col mx-auto gap-4 p-20 opacity-50">
                        <p>No events</p>
                    </div>
                )
            }

            <ToastContainer />
        </div >
    );
}




