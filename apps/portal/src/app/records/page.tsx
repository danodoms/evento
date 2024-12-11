"use client";

import React, { useState, useEffect } from "react";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { getAttendanceRecordsBySchoolId } from "@repo/models/Attendance";
import { getEvents } from "@repo/models/Event";
import { getStudentBySchoolId } from "@repo/models/Student";
import AttendanceRecords from "@/components/AttendanceRecords";
import { debounce } from "@/utils/debounce"; // Create a debounce utility or use lodash
import { REGEXP_ONLY_DIGITS } from "input-otp";

export default function Records() {




    const [schoolId, setSchoolId] = useState("");
    // const [schoolIdToUse, setSchoolIdToUse] = useState("")
    const [isStudentFound, setIsStudentFound] = useState(false)
    const [isSchoolIdValid, setIsSchoolIdValid] = useState(false)
    const [isStudentFetchFail, setIsStudentFetchFail] = useState(false)

    useEffect(() => {
        function validateSchoolId(id: string): boolean {
            const regex = /^\d{8}$/; // Matches exactly 8 digits
            return regex.test(id);
        }

        if (schoolId) {
            setIsSchoolIdValid(validateSchoolId(schoolId));
        } else {
            setIsSchoolIdValid(false); // Reset if schoolId is empty
        }

        setIsStudentFetchFail(false)
    }, [schoolId]);



    const { data: attendanceRecords = [], isLoading: isAttendanceRecordsLoading, refetch: refetchAttendanceRecords } = useQuery({
        queryKey: ["studentAttendanceRecords", schoolId],
        queryFn: () => getAttendanceRecordsBySchoolId(formatWithDash(schoolId)),
    });

    const { data: events = [] } = useQuery({
        queryKey: ["events"],
        queryFn: getEvents,
    });

    const { data: student, refetch: refetchStudent, isError: isStudentError, isRefetchError } = useQuery({
        queryKey: ["student", schoolId],
        queryFn: () => getStudentBySchoolId(formatWithDash(schoolId)),
        enabled: false
    });


    function formatWithDash(value: string): string {
        // Remove all non-digit characters
        const digitsOnly = value.replace(/\D/g, "");

        // Insert a dash after the 4th digit if there are at least 5 digits
        if (digitsOnly.length <= 4) return digitsOnly;
        return `${digitsOnly.slice(0, 4)}-${digitsOnly.slice(4, 8)}`;
    }

    async function handleSearch() {
        const { data: fetchedStudent } = await refetchStudent(); // Wait for refetch and get the data

        if (!fetchedStudent) {
            console.log("NO STUDENT FOUND");
            setIsStudentFetchFail(true);
            setIsStudentFound(false);
            return;
        }

        setIsStudentFetchFail(false);
        setIsStudentFound(true);
        console.log(fetchedStudent);

        // Fetch attendance records
        refetchAttendanceRecords();
    }



    function displayErrorMessage() {

    }

    const groupedAttendanceRecords = Object.entries(
        attendanceRecords.reduce((acc, record) => {
            if (!acc[record.date]) acc[record.date] = [];
            acc[record.date].push(record);
            return acc;
        }, {} as Record<string, typeof attendanceRecords>)
    ).map(([date, records]) => ({
        date,
        records: records.sort((a, b) => a.time.localeCompare(b.time)),
    }));


    function truncateString(input: string, maxChars: number, extension: string = "..."): string {
        if (input.length <= maxChars) {
            return input;
        }
        return input.slice(0, maxChars) + extension;
    }


    return (
        <div className="min-h-screen flex items-center flex-col justify-center p-4 pt-16">
            {isStudentFound && student ? (
                <div>


                    <div className="p-4 text-center mb-4">
                        <p className="text-sm opacity-50 mb-2">Showing attendance records for</p>
                        <p className="text-3xl font-bold">{student && truncateString(student.first_name, 3, "...")} {student && truncateString(student.last_name, 1, ".")}</p>
                        <p className="tracking-wide opacity-50 font-bold">{student?.school_id}</p>
                        <Button className="w-full mt-4" variant="outline" onClick={() => setIsStudentFound(false)}>Search Again</Button>
                    </div>


                    <div className="h-auto w-full overflow-scroll">
                        <AttendanceRecords groupedAttendanceRecords={groupedAttendanceRecords} events={events} />
                    </div>


                </div>
            ) : (
                <div>
                    <p className="text-center text-3xl font-bold">evento Query</p>
                    <p className="text-center text-sm mb-8 opacity-50">Enter your school ID.</p>

                    <InputOTP inputMode="numeric" maxLength={8} value={schoolId} onChange={(value) => setSchoolId(value)} pattern={REGEXP_ONLY_DIGITS} >
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                            <InputOTPSlot index={6} />
                            <InputOTPSlot index={7} />
                        </InputOTPGroup>
                    </InputOTP>

                    <Button
                        variant="default"
                        className="mt-4 w-full"
                        onClick={() => handleSearch()}
                        disabled={!isSchoolIdValid}
                    >
                        Search
                    </Button>


                    {isStudentFetchFail && (
                        <p className="text-center mt-4 text-red-500">No records found</p>
                    )}

                </div>
            )}
        </div>
    );
}
