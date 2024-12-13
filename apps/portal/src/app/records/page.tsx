"use client";

import React, { useState, useEffect } from "react";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { getAttendanceRecordsBySchoolId, GroupedAttendance } from "@repo/models/Attendance";
import { getEvents } from "@repo/models/Event";
import { getStudentBySchoolId } from "@repo/models/Student";
import AttendanceRecords from "@/components/AttendanceRecords";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import html2canvas from 'html2canvas';
import { toPng } from "html-to-image";
import { Download, Search } from "lucide-react";
import { useGlobalStore } from "@/hooks/useGlobalStore";

export default function Records() {
    const COOLDOWN_TIME = 300000; // 1 minute in milliseconds

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


    // Helper function to determine if a color is light or dark
    function isLightColor(color) {
        // Convert RGB to a brightness value (lighter colors will have higher brightness)
        const rgb = color.match(/\d+/g);
        if (!rgb) return true; // Default to light if the color format is not RGB

        const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
        return brightness > 127; // If brightness is greater than 127, it's a light color
    }

    async function downloadImageWithWatermark(elementId, watermarkTexts) {
        const element = document.getElementById(elementId);

        if (!element) {
            console.error('Element not found');
            return;
        }

        try {
            // Capture the HTML element as an image
            const dataUrl = await toPng(element, { quality: 1 });

            // Create an image object to draw the captured content
            const img = new Image();
            img.src = dataUrl;

            img.onload = () => {
                // Create a canvas for watermarking
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');

                // Draw the captured image onto the canvas
                ctx.drawImage(img, 0, 0);

                // Calculate the background color of the element (light or dark)
                const backgroundColor = window.getComputedStyle(element).backgroundColor;
                const isLightBackground = isLightColor(backgroundColor);

                // Set watermark style
                ctx.font = 'bold 48px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                // Adjust watermark color based on the background
                ctx.fillStyle = isLightBackground ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'; // Dark text for light background, light text for dark background

                // Define diagonal spacing for watermark
                const spacing = 200; // Distance between watermarks
                let textIndex = 0;

                // Draw diagonal watermark pattern with text
                for (let y = -canvas.height; y < canvas.height * 2; y += spacing) {
                    for (let x = -canvas.width; x < canvas.width * 2; x += spacing) {
                        ctx.save();
                        ctx.translate(x, y);
                        ctx.rotate(-Math.PI / -4); // Rotate text -45 degrees

                        // Use the next text in the array
                        ctx.fillText(watermarkTexts[textIndex], 0, 0);
                        textIndex = (textIndex + 1) % watermarkTexts.length; // Cycle through texts

                        ctx.restore();
                    }
                }

                // Add a second layer of tiny green dots watermark
                ctx.fillStyle = isLightBackground ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'; // Semi-transparent green

                const dotSpacing = 100; // Distance between dots

                // Draw diagonal pattern of green dots
                for (let y = -canvas.height; y < canvas.height * 2; y += dotSpacing) {
                    for (let x = -canvas.width; x < canvas.width * 2; x += dotSpacing) {
                        ctx.save();
                        ctx.translate(x, y);
                        ctx.rotate(-Math.PI / -4); // Rotate dots -45 degrees

                        // Draw a small green dot
                        ctx.beginPath();
                        ctx.arc(0, 0, 5, 0, Math.PI * 2); // Radius 5 for tiny dots
                        ctx.fill();

                        ctx.restore();
                    }
                }

                // Convert the canvas to an image
                const finalImage = canvas.toDataURL('image/png');

                // Create a downloadable link
                const link = document.createElement('a');
                link.href = finalImage;
                link.download = 'screenshot_with_diagonal_watermark_and_dots.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            };

            img.onerror = (err) => {
                console.error('Error loading image:', err);
            };
        } catch (error) {
            console.error('Failed to download image with watermark:', error);
        }
    }








    //* FUNCTION TO DEDUPLICATE ATTENDANCE RECORDS
    //* FUNCTION TO DEDUPLICATE ATTENDANCE RECORDS
    //* FUNCTION TO DEDUPLICATE ATTENDANCE RECORDS
    // function deduplicateRecords(data: GroupedAttendance[]) {
    //     const THIRTY_MINUTES = 30 * 60 * 1000; // 30 minutes in milliseconds

    //     return data.map((day) => {
    //         const sortedRecords = [...day.records].sort(
    //             (a, b) => new Date(a.created_at) - new Date(b.created_at)
    //         );

    //         const deduplicated = [];
    //         sortedRecords.forEach((record) => {
    //             if (
    //                 deduplicated.length === 0 || // Always keep the first record
    //                 new Date(record.created_at) - new Date(deduplicated[deduplicated.length - 1].created_at) >=
    //                 THIRTY_MINUTES
    //             ) {
    //                 deduplicated.push(record);
    //             }
    //         });

    //         return {
    //             date: day.date,
    //             records: deduplicated,
    //         };
    //     });
    // }






    const { globalRecords } = useGlobalStore()
    const combinedRecords = String(globalRecords.attended) + String(globalRecords.incomplete) + String(globalRecords.missed)





    return (
        <div className="min-h-screen flex items-center flex-col justify-center pt-20 w-full px-8 min-w-full pb-8 bg-background" id="attendance_page">
            {isStudentFound && student ? (
                <div>
                    <div className=" text-center">
                        {/* <p className="text-sm opacity-50 mb-2">Showing attendance records for</p> */}
                        <p className="text-3xl font-bold">{student && truncateString(student.first_name, 3, "...")} {student && truncateString(student.last_name, 1, ".")}</p>
                        <p className="tracking-wide opacity-50 font-bold">{student?.school_id}</p>

                    </div>

                    <div className="h-auto w-full overflow-scroll">
                        <AttendanceRecords groupedAttendanceRecords={groupedAttendanceRecords} events={events} />
                        {/* <h2 className="font-bold my-8">Deduplicated records</h2>
                        <AttendanceRecords groupedAttendanceRecords={deduplicateRecords(groupedAttendanceRecords)} events={events} /> */}
                    </div>
                    <Button className="w-full mt-4 gap-1" variant="default" onClick={() => downloadImageWithWatermark("attendance_page", ["evento", student.school_id, combinedRecords + combinedRecords])}><Download className="size-4" />Download Summary</Button>
                    <Button className="w-full mt-4 gap-1" variant="ghost" onClick={() => setIsStudentFound(false)}><Search className="size-4" />Search Again</Button>

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
