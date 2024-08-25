import React from 'react';
import { UserRound, LogIn, LogOut } from 'lucide-react';
import type { Attendance, AttendanceRecord } from "@repo/models/Attendance";

interface Props {
    result: AttendanceRecord;
}

const AttendanceCard: React.FC<Props> = ({ result }) => {
    const isTimeOut = !result.is_time_in;

    const cardConfig = {
        backgroundColor: isTimeOut ? 'bg-red-500' : 'bg-green-500',
        icon: isTimeOut ? LogOut : LogIn,
        label: isTimeOut ? 'TIME OUT' : 'TIME IN',
        time: isTimeOut ? result.time : result.time,
    };

    // Determine the display name
    const displayName = result.student?.name ? result.student.name : 'Student';

    return (
        <div className="flex justify-between gap-4 items-center border-1 border-solid rounded-md relative p-2">
            <div className={`${cardConfig.backgroundColor} w-2 flex-initial h-14 opacity-50 rounded-md`} />
            <div className="flex gap-2 w-full flex-col">
                <div className="flex gap-4 items-center">
                    <UserRound />
                    <div className="flex flex-col">
                        <div className="text-normal font-medium">{displayName}</div>
                        <div className="text-xs font-extralight">{result.school_id}</div>
                    </div>
                    <div className="p-2 items-end flex flex-col ml-auto">

                        <p className="font-bold flex gap-2 items-center">
                            <cardConfig.icon className="size-3" />
                            {cardConfig.time}
                        </p>
                        <p className="text-xs flex gap-1 font-semibold items-center opacity-50">

                            {result.date}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendanceCard;