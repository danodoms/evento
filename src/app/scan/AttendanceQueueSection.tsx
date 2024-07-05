"use client";

import { useEffect, useState, Fragment } from "react";
import { TextSearch } from "lucide-react";
import { AttendanceQueueCard } from "./AttendanceQueueCard";

import { QueuedAttendance } from "@/models/Attendance";

interface AttendanceQueueSectionProps {
    results: QueuedAttendance[];
}

const AttendanceQueueSection: React.FC<AttendanceQueueSectionProps> = ({ results }) => {
    return (
        <>
            {results.length > 0 ? (
                <div className="h-72 overflow-auto w-full rounded-md flex flex-col gap-2">
                    {results.map((result) => (
                        <AttendanceQueueCard key={result.uniqueId} {...result} />
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
