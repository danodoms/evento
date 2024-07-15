"use client";

import { StudentMissingModal } from '@/components/modals/StudentMissingModal';
import { createQueuedAttendanceRecord } from '@/models/Attendance';
import type { QueuedAttendance } from '@/models/Attendance';
import { type Student, getAllStudents, getStudentBySchoolId } from '@/models/Student';
import useQueuedAttendanceStore from '@/store/useQueuedAttendanceStore';
import { failSound, networkErrorSound, offlineSound, successSound } from '@/utils/sound';
import { type Html5QrcodeResult, Html5QrcodeScanner, Html5QrcodeScannerState } from 'html5-qrcode';
import { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fulfillWithTimeLimit, throwErrorAfterTimeout } from '@/utils/utils';
import { useQuery } from '@tanstack/react-query';
import { set } from 'zod';

interface ModalContent {
    desc: string;
    subtitle: string;
}

export default function Scanner() {


    const { data: students = [], error, isLoading } = useQuery<Student[]>({
        queryKey: ["students"],
        queryFn: getAllStudents
    });

    const studentsRef = useRef(students);

    useEffect(() => {
        console.log('Student query status:', { isLoading, students, error });
        studentsRef.current = students;
    }, [students, isLoading, error]);





    const html5QrcodeScannerRef = useRef<Html5QrcodeScanner | null>(null);
    const [modalContent, setModalContent] = useState<ModalContent | null>(null);
    const addAttendanceQueue = useQueuedAttendanceStore((state) => state.addAttendanceQueue);





    const attendanceQueueProp: QueuedAttendance[] = []

    // const notify = () => toast.error("Daily attendance limit reached!");

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

    const onScanSuccess = async (decodedText: string, decodedResult: Html5QrcodeResult) => {
        try {
            // SCANNING SHOULD BE PAUSED IMMEDIATELY SINCE FOLLOWING CODE ARE ASYNC
            pauseScanner(); // Pause scanning

            if (!navigator.onLine) {
                throw new Error("OFFLINE");
            }


            // checks first if there are students in the variable fetched by react-tanstack-query
            if (studentsRef.current.length === 0) {
                throw new Error("EMPTY_STUDENTS_REFERENCE");
            }


            //The commented initiates an API call everytime, it is replaced by a client side filtering method to reduce API calls and improve scanning responsiveness
            // const student = await throwErrorAfterTimeout(2000, () => getStudentByIdNum(decodedText), "TIME_LIMIT_REACHED");
            const student: Student | undefined = getStudentBySchoolId(studentsRef.current, decodedText);

            if (student) {
                successSound?.play();

                // const queuedAttendance = await createQueuedAttendanceRecord(student);
                const queuedAttendance = await throwErrorAfterTimeout(2000, () => createQueuedAttendanceRecord(student), "TIME_LIMIT_REACHED");

                if (queuedAttendance) {
                    addAttendanceQueue(queuedAttendance);
                } else {
                    toast.error("Daily attendance limit reached!", { autoClose: 3000 })
                }

                setTimeout(() => {
                    resumeScanner(); // Resume scanning after a delay
                }, 800);

            } else {
                setModalContent({ desc: "The scanned ID does not match any user.", subtitle: `Scanned ID: ${decodedText}` });
                failSound?.play();
                pauseScanner(true); // Pause scanning
            }


        } catch (error: Error | any) {
            console.error("Error fetching student details:", error);

            if (error.message === "OFFLINE") {
                offlineSound?.play();
                toast.error("You are offline, please check your internet connection", { autoClose: 3000, toastId: "toast-offline" });
                resumeScanner(); // Resume scanning after a delay
            } else if (error.message === "TIME_LIMIT_REACHED") {
                networkErrorSound?.play();
                toast.error("Server took too long to respond, try again", { autoClose: 3000 });
                resumeScanner(); // Resume scanning after a delay
            } else if (error.message === "EMPTY_STUDENTS_REFERENCE") {
                toast.error("No students to compare in the database", { autoClose: 3000, toastId: "toast-empty-students" });
                failSound?.play();
                resumeScanner(); // Resume scanning after a delay
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
        <div className="flex flex-col items-center justify-center">
            <div id="reader" ref={setScannerRef} className="w-full max-w-sm rounded" />
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
