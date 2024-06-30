import { pushAttendanceRecord, QueuedAttendance } from "@/models/Attendance";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { TextSearch, UserRound, X } from "lucide-react";
import { Progress } from "@/components/ui/progress"

export function AttendanceQueueCard(result: QueuedAttendance) {

    const [progress, setProgress] = useState(0);
    const [startTime, setStartTime] = useState(performance.now()); // Start time in milliseconds

    useEffect(() => {
        const animate = (timestamp: any) => {
            const deltaTime = timestamp - startTime; // Time passed since animation started
            const duration = 7000; // 10 seconds in milliseconds
            const newProgress = Math.min(100, Math.floor((deltaTime / duration) * 100));

            setProgress(newProgress);

            if (newProgress < 100) {
                requestAnimationFrame(animate); // Continue animation until progress reaches 1
            }
        };

        requestAnimationFrame(animate); // Start animation

        return () => { }; // No cleanup needed for requestAnimationFrame
    }, [startTime]); // Run effect when startTime changes

    return (
        <div className={`flex justify-between gap-4 items-center border-1 border-solid border rounded-md relative ${result.time_out ? 'bg-destructive' : ''}`}>
            <div className="flex gap-2 w-full flex-col p-4">
                <div className="flex gap-4 items-center">
                    <UserRound />
                    <div className="flex flex-col">
                        <div className="text-normal font-medium">{result.student.name}</div>

                        <div className="text-xs ">ID: {result.student.school_id}</div>


                    </div>
                    <div className="ml-auto flex gap-4 items-center ">
                        {!result.time_out ? (
                            <div className="p-2 items-center flex flex-col ">
                                <p className="text-xs">TIMED IN</p>
                                <p className="font-bold">{result.time_in}</p>
                            </div>
                        ) : (
                            <div className=" p-2 items-center flex flex-col">
                                <p className="text-xs">TIMED OUT</p>
                                <p className="font-bold">{result.time_out}</p>
                            </div>
                        )}
                        <Button className=" z-10 flex gap-2" variant="ghost">   <X /> </Button>
                    </div>

                </div>
            </div>
            <Progress value={progress} className="w-full h-full absolute opacity-5 p-0 m-0 rounded-md" />
        </div>
    )
}