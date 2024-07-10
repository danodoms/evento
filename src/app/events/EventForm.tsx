"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { eventSchema } from "@/schemas/eventSchema";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Department, getDepartments } from "@/models/Department";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import { Value } from "@radix-ui/react-select";

import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"


import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { cn } from "@/lib/utils"

import { eventDuration, addEvent, Event, updateEvent } from "@/models/Event";
import { MapPin } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"





const formSchema = eventSchema;


type eventType = {
    text: string,
    value: eventDuration;
}


const eventTypes: eventType[] = [
    {
        text: "Morning only",
        value: "AM_ONLY"
    },
    {
        text: "Afternoon only",
        value: "PM_ONLY"
    },
    {
        text: "Morning and afternoon",
        value: "AM_AND_PM"
    }
]

type EventFormProps = {
    event?: Event;
}


export function EventForm({ event }: EventFormProps) {
    // const isEditMode = !!event;


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: event ? {
            name: event.name,
            date: new Date(event.date),
            description: event.description,
            location: event.location,
            duration: event.duration,
        } : {
            name: "",
            description: "",
            location: "",
        },
    });





    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("pass")
        console.log(values);

        const event: Event = {
            id: undefined,
            is_active: undefined,
            created_at: undefined,
            name: values.name,
            date: format(values.date, "yyyy-MM-dd"),
            description: values.description,
            location: values.location,
            duration: values.duration,
        }

        if (event) {
            await updateEvent(event)
        } else {
            await addEvent(event);
            form.reset();
        }



        // addStudent({
        //     school_id: values.school_id,
        //     name: values.name,
        //     dept_id: null,
        // })
        //     .then((student) => {
        //         if (student === "SCHOOL_ID_EXISTS") {
        //             console.log("School ID already exists");
        //             toast.error("School ID already in use");
        //         } else {
        //             console.log("Student added successfully");
        //             toast.success("Student added successfully");
        //             form.reset();
        //         }
        //     })
        //     .catch((error) => {
        //         console.error("Error adding student:", error);
        //     });
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter event name"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            {form.formState.errors.name && (
                                <FormMessage>{form.formState.errors.name.message}</FormMessage>
                            )}
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter event description"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            {form.formState.errors.description && (
                                <FormMessage>{form.formState.errors.description.message}</FormMessage>
                            )}
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex gap-2 items-center">
                                Location
                                {/* <MapPin className="size-4" /> */}
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="Enter event location" {...field} />
                            </FormControl>
                            {form.formState.errors.location && (
                                <FormMessage>{form.formState.errors.location.message}</FormMessage>
                            )}
                        </FormItem>
                    )}
                />



                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Schedule</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            {form.formState.errors.date && (
                                <FormMessage>{form.formState.errors.date.message}</FormMessage>
                            )}
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Event duration</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select event duration" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Event Duration</SelectLabel>
                                        {eventTypes?.map((type, index) => (
                                            <SelectItem key={index} value={type.value}>
                                                {type.text}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {form.formState.errors.duration && (
                                <FormMessage>{form.formState.errors.duration.message}</FormMessage>
                            )}
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
                    {
                        event ? (form.formState.isSubmitting ? "Saving changes..." : "Save changes") : (form.formState.isSubmitting ? "Submitting..." : "Submit")

                    }
                </Button>
            </form>
        </Form>
    );
}
