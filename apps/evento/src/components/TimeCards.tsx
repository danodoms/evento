import type { AttendanceRecord } from "@/models/Attendance";
import { UserRound } from "lucide-react"; // Adjust imports as needed
import type React from "react";

interface Props {
    result: AttendanceRecord; // Define prop 'result' of type AttendanceRecord
}

export const TimeInCard: React.FC<Props> = ({ result }) => (
    <Card result={result} />
);

export const TimeOutCard: React.FC<Props> = ({ result }) => (
    <Card result={result} />
);


const Card: React.FC<Props> = ({ result }) => (
    <div className="flex justify-between gap-4 items-center border-1 border-solid rounded-md relative bg-secondary">
        <div className="flex gap-2 w-full flex-col p-4">
            <div className="flex gap-4 items-center">
                <UserRound />
                <div className="flex flex-col">
                    <div className="text-normal font-medium">{result.student.name}</div>
                    <div className="text-xs font-extralight">
                        {result.student.school_id}
                    </div>
                </div>
                <div className="p-2 items-center flex flex-col ml-auto opacity-50">
                    <p className="text-xs">TIMED IN</p>
                    <p className="font-bold">{result.time}</p>
                </div>
            </div>
        </div>
    </div>
);

export default TimeInCard;
