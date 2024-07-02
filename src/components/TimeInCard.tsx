import React from 'react';
import { UserRound } from 'lucide-react'; // Adjust imports as needed
import { AttendanceRecord } from '@/models/Attendance';

interface Props {
    result: AttendanceRecord; // Define prop 'result' of type AttendanceRecord
}

const TimeInCard: React.FC<Props> = ({ result }) => (
    <div className={`flex justify-between gap-4 items-center border-1 border-solid border rounded-md relative ${result.time_out ? 'bg-destructive' : ''}`}>
        <div className="flex gap-2 w-full flex-col p-4">
            <div className="flex gap-4 items-center">
                <UserRound />
                <div className="flex flex-col">
                    <div className="text-normal font-medium">{result.name}</div>
                    <div className="text-xs font-extralight">{result.school_id}</div>
                </div>
                <div className="p-2 items-center flex flex-col">
                    <p className="text-xs">TIMED IN</p>
                    <p className="font-bold">{result.time_in}</p>
                </div>
            </div>
        </div>
    </div>
);

export default TimeInCard;
