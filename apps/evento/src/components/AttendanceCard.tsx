import React from 'react';
import { UserRound, LogIn, LogOut, Scan } from 'lucide-react';
import type { Attendance, AttendanceRecord } from "@repo/models/Attendance";

interface Props {
    result: AttendanceRecord;
}

const AttendanceCard: React.FC<Props> = ({ result }) => {


    function trimEmailDomain(email: string) {
        // Find the position of the "@" symbol
        const atIndex = email.indexOf('@');

        // If "@" is found, return the substring before it
        if (atIndex !== -1) {
            return email.substring(0, atIndex);
        }

        // If "@" is not found, return the original email (or handle as needed)
        return email;
    }


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
                        <div className='flex '>
                            <div className="text-xs font-extralight">{result.school_id}</div>
                            <div className="text-xs font-extralight border-1 rounded-full px-2 flex gap-1 items-center opacity-50">
                                <Scan className='size-3' />
                                {trimEmailDomain(result.scanned_by_email)}
                            </div>
                        </div>

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