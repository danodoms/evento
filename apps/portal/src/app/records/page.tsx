"use client"

import { createClient } from "@repo/utils/supabase";
import { getDepartments } from "@repo/models/Department";

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Attendance, getAttendanceRecordsBySchoolId } from "@repo/models/Attendance";
import { Event, getEvents } from "@repo/models/Event";
import { useQuery } from "@tanstack/react-query";
import AttendanceRecords from "@/components/AttendanceRecords";
import { getStudentBySchoolId, Student } from "@repo/models/Student";

export default function Records() {

    const [schoolIdToUse, setSchoolIdToUse] = useState("2021-2473")
    // setSchoolIdToUse("2021-2473")

    // studentName = getStudentFullName(student)





    const {
        data: attendanceRecords = [],
        error: attendanceRecordsError,
        isLoading: isAttendanceRecordsLoading,
    } = useQuery<Attendance[]>({
        queryKey: ["studentAttendanceRecords", schoolIdToUse],
        queryFn: () => getAttendanceRecordsBySchoolId(schoolIdToUse),
    });

    const {
        data: events = [],
        error: eventsError,
        isLoading: isEventsLoading,
    } = useQuery<Event[]>({
        queryKey: ["events"],
        queryFn: getEvents,
    });

    const {
        data: student = null,
        error: studentError,
        isLoading: isStudentLoading,
    } = useQuery<Student>({
        queryKey: ["student", schoolIdToUse],
        queryFn: () => getStudentBySchoolId(schoolIdToUse),
    });


    //* V2
    const groupedAttendanceRecords = Object.entries(
        attendanceRecords.reduce((acc, record) => {
            // Initialize array if it does not exist for the date
            if (!acc[record.date]) {
                acc[record.date] = [];
            }

            // Add the record to the array
            acc[record.date].push(record);

            return acc;
        }, {} as Record<string, typeof attendanceRecords>)
    ).map(([date, records]) => ({
        date,
        // Sort records by time from earliest to latest
        records: records.sort((a, b) => a.time.localeCompare(b.time)),
    }));



    function truncateString(input: string, maxChars: number, extension: string = "..."): string {
        if (input.length <= maxChars) {
            return input;
        }
        return input.slice(0, maxChars) + extension;
    }


    return (
        <div className="min-h-screen  flex items-center  flex-col justify-center p-4 pt-16 ">

            {/* <div>Records</div>
            <Button onClick={getDepartments}>fetch depts</Button> */}
            <div className="p-4 text-center mb-4">
                <p className="text-sm opacity-50 mb-2">Showing attendance records for</p>
                <p className="text-3xl font-bold">{student && truncateString(student.first_name, 3, "...")} {student && truncateString(student.last_name, 1, ".")}</p>
                <p className="tracking-wide opacity-50 font-bold">{student?.school_id}</p>
            </div>

            <div className="h-auto w-full overflow-scroll">
                <AttendanceRecords groupedAttendanceRecords={groupedAttendanceRecords} events={events} />
            </div>

        </div >
    );
};
