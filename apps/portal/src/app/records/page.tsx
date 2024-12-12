"use client";

import React, { useState, useEffect } from "react";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { getAttendanceRecordsBySchoolId } from "@repo/models/Attendance";
import { getEvents } from "@repo/models/Event";
import { getStudentBySchoolId } from "@repo/models/Student";
import AttendanceRecords from "@/components/AttendanceRecords";
import { REGEXP_ONLY_DIGITS } from "input-otp";

export default function Records() {
    const COOLDOWN_TIME = 60000; // 1 minute in milliseconds

    const [schoolId, setSchoolId] = useState("");
    const [isStudentFound, setIsStudentFound] = useState(false);
    const [isSchoolIdValid, setIsSchoolIdValid] = useState(false);
    const [isStudentFetchFail, setIsStudentFetchFail] = useState(false);
    const [cooldownRemaining, setCooldownRemaining] = useState(0);

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

        setIsStudentFetchFail(false);
    }, [schoolId]);

    // Initialize cooldown timer
    useEffect(() => {
        const lastQueryTime = localStorage.getItem("lastQueryTime");
        if (lastQueryTime) {
            const timeElapsed = Date.now() - parseInt(lastQueryTime, 10);
            if (timeElapsed < COOLDOWN_TIME) {
                setCooldownRemaining(COOLDOWN_TIME - timeElapsed);
            }
        }
    }, []);

    useEffect(() => {
        if (cooldownRemaining > 0) {
            const timer = setInterval(() => {
                setCooldownRemaining((prev) => Math.max(0, prev - 1000));
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [cooldownRemaining]);

    const { data: attendanceRecords = [], refetch: refetchAttendanceRecords } = useQuery({
        queryKey: ["studentAttendanceRecords", schoolId],
        queryFn: () => getAttendanceRecordsBySchoolId(formatWithDash(schoolId)),
    });

    const { data: events = [] } = useQuery({
        queryKey: ["events"],
        queryFn: getEvents,
    });

    const { data: student, refetch: refetchStudent } = useQuery({
        queryKey: ["student", schoolId],
        queryFn: () => getStudentBySchoolId(formatWithDash(schoolId)),
        enabled: false,
    });

    function formatWithDash(value: string): string {
        const digitsOnly = value.replace(/\D/g, "");
        if (digitsOnly.length <= 4) return digitsOnly;
        return `${digitsOnly.slice(0, 4)}-${digitsOnly.slice(4, 8)}`;
    }

    async function handleSearch() {
        if (cooldownRemaining > 0) return;

        const { data: fetchedStudent } = await refetchStudent();

        if (!fetchedStudent) {
            setIsStudentFetchFail(true);
            setIsStudentFound(false);
            return;
        }

        setIsStudentFetchFail(false);
        setIsStudentFound(true);

        // Fetch attendance records
        refetchAttendanceRecords();

        // Save the current time as the last query time
        const currentTime = Date.now();
        localStorage.setItem("lastQueryTime", currentTime.toString());
        setCooldownRemaining(COOLDOWN_TIME);
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









    function deduplicateRecords(data) {
        const THIRTY_MINUTES = 30 * 60 * 1000; // 30 minutes in milliseconds

        return data.map((day) => {
            const sortedRecords = [...day.records].sort(
                (a, b) => new Date(a.created_at) - new Date(b.created_at)
            );

            const deduplicated = [];
            sortedRecords.forEach((record) => {
                if (
                    deduplicated.length === 0 || // Always keep the first record
                    new Date(record.created_at) - new Date(deduplicated[deduplicated.length - 1].created_at) >=
                    THIRTY_MINUTES
                ) {
                    deduplicated.push(record);
                }
            });

            return {
                date: day.date,
                records: deduplicated,
            };
        });
    }












    return (
        <div className="min-h-screen flex items-center flex-col justify-center p-4 pt-16 w-full">
            {isStudentFound && student ? (
                <div>
                    <div className="p-4 text-center">
                        {/* <p className="text-sm opacity-50 mb-2">Showing attendance records for</p> */}
                        <p className="text-3xl font-bold">{student && truncateString(student.first_name, 3, "...")} {student && truncateString(student.last_name, 1, ".")}</p>
                        <p className="tracking-wide opacity-50 font-bold">{student?.school_id}</p>
                        <Button className="w-full mt-4" variant="outline" onClick={() => setIsStudentFound(false)}>Search Again</Button>
                    </div>

                    <div className="h-auto w-full overflow-scroll">
                        <AttendanceRecords groupedAttendanceRecords={groupedAttendanceRecords} events={events} />
                        {/* <h2 className="font-bold my-8">Deduplicated records</h2>
                        <AttendanceRecords groupedAttendanceRecords={deduplicateRecords(groupedAttendanceRecords)} events={events} /> */}
                    </div>
                </div>
            ) : (
                <div>
                    <p className="text-center text-3xl font-bold">evento Query</p>
                    <p className="text-center text-sm mb-8 opacity-50">Enter your school ID.</p>

                    <InputOTP inputMode="numeric" maxLength={8} value={schoolId} onChange={(value) => setSchoolId(value)} pattern={REGEXP_ONLY_DIGITS}>
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
                        onClick={handleSearch}
                        disabled={!isSchoolIdValid || cooldownRemaining > 0}
                    >
                        {cooldownRemaining > 0
                            ? `Please wait ${Math.ceil(cooldownRemaining / 1000)}s`
                            : "Search"}
                    </Button>

                    {isStudentFetchFail && (
                        <p className="text-center mt-4 text-red-500">No records found</p>
                    )}
                </div>
            )}
        </div>
    );
}
