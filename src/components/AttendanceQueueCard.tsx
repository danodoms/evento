import { pushAttendanceRecord, QueuedAttendance } from "@/models/Attendance";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { TextSearch, UserRound } from "lucide-react";
import { Progress } from "@/components/ui/progress"

export function AttendanceQueueCard(result: QueuedAttendance) {

    const [progress, setProgress] = useState(100);
    const [startTime, setStartTime] = useState(performance.now()); // Start time in milliseconds

    useEffect(() => {
        const animate = (timestamp: any) => {
            const deltaTime = timestamp - startTime; // Time passed since animation started
            const duration = 10000; // 10 seconds in milliseconds
            const newProgress = Math.max(1, 100 - Math.floor((deltaTime / duration) * 100));

            setProgress(newProgress);

            if (newProgress > 1) {
                requestAnimationFrame(animate); // Continue animation until progress reaches 1
            }
        };

        requestAnimationFrame(animate); // Start animation

        return () => { }; // No cleanup needed for requestAnimationFrame
    }, [startTime]); // Run effect when startTime changes

    return (
        <div className="flex justify-between gap-4 items-center border-1 border-solid border rounded-md bg-secondary relative">
            <div className="flex gap-2 w-full flex-col p-4">
                <div className="flex gap-4 items-center">
                    <UserRound />
                    <div className="flex flex-col">
                        <div className="text-normal font-medium">{result.student.name}</div>

                        <div className="text-xs ">ID: {result.student.idNum}</div>


                    </div>
                    <Button className="ml-auto z-10" variant="outline">Cancel</Button>
                </div>
            </div>
            <Progress value={progress} className="w-full h-full absolute opacity-10 p-0 m-0 rounded-md" />
        </div>
    )
}