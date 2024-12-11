import React from 'react';
import { UserRound, LogIn, LogOut, Scan } from 'lucide-react';
import type { Attendance, AttendanceRecord } from "@repo/models/Attendance";
import { getStudentFullName } from '@repo/models/Student';
import { Badge } from './ui/badge';
import { useQuery } from '@tanstack/react-query';
import { Department, getDepartments } from '@repo/models/Department';
import StudentRecordsDialog from './StudentRecordsDialog';


interface Props {
    result: AttendanceRecord;
}

const AttendanceCard: React.FC<Props> = ({ result }) => {


    const {
        data: departments = [],
        error: departmentsError,
        isLoading: isDepartmentsLoading,
    } = useQuery<Department[]>({
        queryKey: ["departments"],
        queryFn: getDepartments,
    });


    function getDepartmentShortNameById(departmentId: number): string | undefined {
        const department = departments.find((dept) => dept.id === departmentId);
        return department ? department.short_name : undefined;
    }


    function trimEmailDomain(email: string) {
        // Find the position of the "@" symbol
        const atIndex = email.indexOf('@');

        // If "@" is found, process the substring before it
        if (atIndex !== -1) {
            const username = email.substring(0, atIndex);

            // If the username is longer than 10 characters, add an ellipsis
            if (username.length > 20) {
                return username.substring(0, 20) + '...';
            }

            return username;
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

    const studentFullName = getStudentFullName(result.student)
    const displayName = studentFullName ? studentFullName : 'Student';

    return (
        <div className="flex justify-between gap-4 items-center border-1 border-solid rounded-md relative p-2">
            <div className={`${cardConfig.backgroundColor} w-2 flex-initial h-20 opacity-50 rounded-md`} />
            <div className="flex w-full flex-col">
                <div className="flex gap-4 items-center">
                    {/* <UserRound /> */}
                    <div className="flex flex-col gap-1">

                        <div className='flex gap-2'>
                            <div className="text-normal font-medium">{displayName}</div>



                        </div>

                        <div className='flex gap-2 items-center'>


                            <div className="text-xs font-extralight">{result.school_id}</div>

                            {result.student.dept_id &&
                                (
                                    <div className='text-xs font-bold tracking-wider opacity-80'>
                                        {getDepartmentShortNameById(result.student.dept_id)}
                                    </div>
                                )
                            }
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

                <div className='flex gap-2 items-center'>
                    <div className='opacity-50 fitems-center flex'>
                        <StudentRecordsDialog student={result.student} />
                    </div>
                    <div className="text-xs font-extralight border-1 rounded-full flex gap-1 items-center opacity-50">
                        <Scan className='size-3' />
                        {trimEmailDomain(result.scanned_by_email)}
                    </div>


                </div>

            </div>
        </div>
    );
};

export default AttendanceCard;