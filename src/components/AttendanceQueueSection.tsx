"use client";

import { useEffect, useState, Fragment } from "react";
import { TextSearch } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { AttendanceQueueCard } from "./AttendanceQueueCard";

import { QueuedAttendance } from "@/models/Attendance";

interface AttendanceQueueSectionProps {
    results: QueuedAttendance[];
}

const AttendanceQueueSection: React.FC<AttendanceQueueSectionProps> = ({ results }) => {

    // // Function to process each queue item independently with a delay
    // const processQueueItem = async (item: QueuedAttendance) => {
    //     await new Promise((resolve) => setTimeout(resolve, 7000)); // 10 seconds delay
    //     await pushQueuedAttendanceRecord(item);
    //     removeAttendanceQueue(item.uniqueId);
    // };

    // // Trigger the queue processing when results change
    // useEffect(() => {
    //     if (results.length > 0) {
    //         processQueueItem(results[0])
    //     }
    // }, [results]);



    return (
        <>
            {results.length > 0 ? (
                <div className="h-72 overflow-auto w-full rounded-md flex flex-col gap-2">
                    <Toaster />
                    {results.map((result, num) => (
                        <AttendanceQueueCard key={num} {...result} />
                    ))}
                </div>
            ) : (
                <div className="flex gap-2 items-center place-content-center">
                    <TextSearch />
                    <h4 className="text-sm font-medium leading-none text-center">Results will display here</h4>
                </div>
            )}
        </>
    );
};

export default AttendanceQueueSection;
