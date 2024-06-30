"use client";

import { useEffect, useState, Fragment } from "react";
import { TextSearch } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { AttendanceQueueCard } from "./AttendanceQueueCard";

import { pushAttendanceRecord, QueuedAttendance } from "@/models/Attendance";
import useQueuedAttendanceStore from "@/store/useQueuedAttendanceStore";

interface AttendanceQueueSectionProps {
    results: QueuedAttendance[];
}

const AttendanceQueueSection: React.FC<AttendanceQueueSectionProps> = ({ results }) => {
    const { attendanceQueue, addAttendanceQueue, removeAttendanceQueue, setAttendanceQueue } = useQueuedAttendanceStore();
    const [processing, setProcessing] = useState(false);

    // Function to process each queue item independently with a delay
    const processQueueItem = async (item: QueuedAttendance) => {
        await new Promise((resolve) => setTimeout(resolve, 7000)); // 10 seconds delay
        await pushAttendanceRecord(item);
        removeAttendanceQueue(item);
    };

    // Trigger the queue processing when results change
    useEffect(() => {
        if (results.length > 0) {
            processQueueItem(results[results.length - 1])
        }
    }, [results]);

    return (
        <>
            {attendanceQueue.length > 0 ? (
                <div className="h-72 overflow-auto w-full rounded-md flex flex-col gap-2">
                    <Toaster />
                    {attendanceQueue.map((result, num) => (
                        <Fragment key={num}>
                            <AttendanceQueueCard {...result} />
                        </Fragment>
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
