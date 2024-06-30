"use client";

import * as React from "react";
import { TextSearch, UserRound } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { Progress } from "@/components/ui/progress"
import { AttendanceQueueCard } from "./AttendanceQueueCard";

import { pushAttendanceRecord, QueuedAttendance } from "@/models/Attendance";
import useQueuedAttendanceStore from "@/store/useQueuedAttendanceStore";


interface AttendanceQueueSectionProps {
    results: QueuedAttendance[];
}

const LiveResultsSection: React.FC<AttendanceQueueSectionProps> = ({ results }) => {
    const { attendanceQueue, addAttendanceQueue, removeAttendanceQueue, setAttendanceQueue } = useQueuedAttendanceStore();
    const [processing, setProcessing] = React.useState(false);

    // Function to process the queue with a delay
    const processQueueWithDelay = async () => {
        setProcessing(true);
        for (const result of results) {
            await new Promise((resolve) => setTimeout(resolve, 10000)); // 10 seconds delay
            await pushAttendanceRecord(result);
            removeAttendanceQueue(result);
        }
        setProcessing(false);
    };

    // Trigger the queue processing when results change
    React.useEffect(() => {
        if (results.length > 0 && !processing) {
            setAttendanceQueue(results);
            processQueueWithDelay();
        }
    }, [results]);

    return (
        <>
            {attendanceQueue.length > 0 ? (
                <div className="h-72 overflow-auto w-full rounded-md flex flex-col gap-2">
                    <Toaster />

                    {attendanceQueue.map((result, num) => (
                        <React.Fragment key={num}>
                            {/* <div className="flex justify-between gap-4 items-center border-1 border-solid border rounded-md p-4 bg-secondary">
                                <div className="flex gap-4 items-center">
                                    <UserRound />

                                    <div className="flex flex-col">
                                        <div className="text-normal font-medium">{result.student.name}</div>

                                        <div className="text-xs ">ID: {result.student.idNum}</div>
                                        <Progress value={10} />

                                    </div>
                                </div>
                            </div> */}
                            <AttendanceQueueCard {...result} />
                        </React.Fragment>
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

export default LiveResultsSection;
