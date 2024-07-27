"use client";

import { StudentMissingModal } from '@/components/modals/StudentMissingModal';
// import { createQueuedAttendanceRecord } from '@/models/Attendance';
// import type { QueuedAttendance } from '@/models/Attendance';
import { type Student, getAllStudents, getStudentByIdNum, getStudentBySchoolId } from '@/models/Student';
// import useQueuedAttendanceStore from '@/store/useQueuedAttendanceStore';
import { failSound, networkErrorSound, offlineSound, successSound } from '@/utils/sound';
import { type Html5QrcodeResult, Html5QrcodeScanner, Html5QrcodeScannerState } from 'html5-qrcode';
import { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fulfillWithTimeLimit, throwErrorAfterTimeout } from '@/utils/utils';
import { useQuery } from '@tanstack/react-query';
import { set } from 'zod';
import { createOrUpdateAttendanceRecord } from '@/models/Attendance';
import { motion } from 'framer-motion';
import { useAttendanceStore } from "@/store/useAttendanceStore";
import { UserRound } from 'lucide-react';
import useOnlineStatus from "@/hooks/useOnlineStatus";

interface ModalContent {
    desc: string;
    subtitle: string;
}

export default function Scanner() {
    const isOnline = useOnlineStatus();

    const { addAttendanceRecord } = useAttendanceStore();

    const [scannedStudent, setScannedStudent] = useState<Student | null>(null);


    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (scannedStudent) {
            timer = setTimeout(() => {
                setScannedStudent(null);
            }, 3000); // 3 seconds
        }
        return () => clearTimeout(timer);
    }, [scannedStudent]);


    const html5QrcodeScannerRef = useRef<Html5QrcodeScanner | null>(null);
    const [modalContent, setModalContent] = useState<ModalContent | null>(null);


    const pauseScanner = (pauseVideo = false) => {
        if (html5QrcodeScannerRef.current) {
            const state = html5QrcodeScannerRef.current.getState();
            if (state === Html5QrcodeScannerState.SCANNING) {
                html5QrcodeScannerRef.current.pause(pauseVideo); // freeze scanning
            }
        }
    };

    const resumeScanner = () => {
        if (html5QrcodeScannerRef.current) {
            const state = html5QrcodeScannerRef.current.getState();
            if (state === Html5QrcodeScannerState.PAUSED) {
                html5QrcodeScannerRef.current.resume();
            }
        }
    };

    const pauseAndResumeScanner = (milliseconds: number, pauseVideo: boolean = false) => {
        pauseScanner(pauseVideo);
        setTimeout(resumeScanner, milliseconds);
    };

    const onScanSuccess = async (decodedText: string, decodedResult: Html5QrcodeResult) => {
        try {
            // SCANNING SHOULD BE PAUSED IMMEDIATELY SINCE FOLLOWING CODE ARE ASYNC
            pauseScanner(); // Pause scanning

            // if (!navigator.onLine) {
            //     throw new Error("OFFLINE");
            // }

            if (!isOnline) {
                throw new Error("OFFLINE");
            }


            // checks first if there are students in the variable fetched by react-tanstack-query
            // if (studentsRef.current.length === 0) {
            //     throw new Error("EMPTY_STUDENTS_REFERENCE");
            // }


            //The commented initiates an API call everytime, it is replaced by a client side filtering method to reduce API calls and improve scanning responsiveness
            const student = await throwErrorAfterTimeout(2000, () => getStudentByIdNum(decodedText), "TIME_LIMIT_REACHED");
            // const student: Student | undefined = getStudentBySchoolId(studentsRef.current, decodedText);

            if (student) {

                setScannedStudent(student);
                const newAttendanceRecord = await throwErrorAfterTimeout(2000, () => createOrUpdateAttendanceRecord(student.id), "TIME_LIMIT_REACHED");

                if (newAttendanceRecord) {
                    // addAttendanceQueue(queuedAttendance);
                    addAttendanceRecord({ ...newAttendanceRecord, student });
                    successSound?.play();
                } else {
                    toast.error("Daily attendance limit reached!", { autoClose: 2500, toastId: "toast-daily-limit-reached" });
                }

                setTimeout(() => {
                    resumeScanner(); // Resume scanning after a delay
                }, 1250);

            } else {
                setModalContent({ desc: "The scanned ID does not match any student", subtitle: `Scanned ID: ${decodedText}` });
                failSound?.play();
                pauseScanner(true); // Pause scanning
            }


        } catch (error: Error | any) {
            console.error("Error fetching student details:", error);

            if (error.message === "EARLY_TIMEOUT") {
                failSound?.play();
                toast.error("Early time out detected, retry in a minute", { autoClose: 2500, toastId: "toast-early-timeout" });
                pauseAndResumeScanner(1000)
            } else if (error.message === "EARLY_TIMEIN") {
                failSound?.play();
                toast.error("Early time in detected, retry in 10 seconds", { autoClose: 2500, toastId: "toast-early-timein" });
                pauseAndResumeScanner(1000)
            } else if (error.message === "OFFLINE") {
                offlineSound?.play();
                toast.error("You are offline, please check your internet connection", { autoClose: 2500, toastId: "toast-offline" });
                pauseAndResumeScanner(1000)
            } else if (error.message === "TIME_LIMIT_REACHED") {
                networkErrorSound?.play();
                toast.error("Server took too long to respond, try again", { autoClose: 2500 });
                pauseAndResumeScanner(1000)
            } else if (error.message === "EMPTY_STUDENTS_REFERENCE") {
                toast.error("No students to compare in the database", { autoClose: 2500, toastId: "toast-empty-students" });
                failSound?.play();
                pauseAndResumeScanner(1000)
            } else {
                setModalContent({ desc: "An error occurred while fetching student details.", subtitle: `Scanned ID: ${decodedText}` });
                failSound?.play();
                pauseScanner(); // Pause scanning
            }

        }
    };

    const onScanFailure = (error: any) => {
        // Handle scan failure if needed
    };

    const handleCloseModal = () => {
        setModalContent(null);
        resumeScanner(); // Ensure scanner is resumed when modal is closed
    };

    const setScannerRef = (node: HTMLDivElement | null) => {
        if (node && !html5QrcodeScannerRef.current) {
            const scanner = new Html5QrcodeScanner(
                node.id,
                { fps: 15, qrbox: { width: 250, height: 250 }, aspectRatio: 1.0 },
                false
            );

            scanner.render(onScanSuccess, onScanFailure);
            html5QrcodeScannerRef.current = scanner;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center relative">
            <div id="reader" ref={setScannerRef} className="w-full max-w-sm rounded" />




            {scannedStudent && (
                <motion.div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    initial={{ opacity: 0, scale: 0.2 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="p-4 bg-background opacity-90 backdrop-blur-lg rounded-md text-center flex items-center flex-col gap-1 outline outline-1">
                        <UserRound className='size-8' />
                        <div>
                            <p className='font-bold'>{scannedStudent.name}</p>
                            <p className='text-sm'>{scannedStudent.school_id}</p>
                        </div>
                    </div>
                </motion.div>
            )}



            {modalContent && (
                <StudentMissingModal
                    subtitle={modalContent.subtitle}
                    description={modalContent.desc}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};
