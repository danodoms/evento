"use client"

import { createClient } from "@repo/utils/supabase";
import { getDepartments } from "@repo/models/Department";

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Attendance, getAttendanceRecordsBySchoolId } from "@repo/models/Attendance";
import { Event, getEvents } from "@repo/models/Event";
import { useQuery } from "@tanstack/react-query";
import AttendanceRecords from "@/components/AttendanceRecords";


export default function Records() {


    const schoolIdToUse = "2021-3439"



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




    return (
        <div className="min-h-screen  flex items-center  flex-col justify-center p-4 pt-8 ">

            {/* <div>Records</div>
            <Button onClick={getDepartments}>fetch depts</Button> */}
            <div className="max-h-screen w-full overflow-scroll">
                <AttendanceRecords groupedAttendanceRecords={groupedAttendanceRecords} events={events} />
            </div>

        </div >
    );
};
