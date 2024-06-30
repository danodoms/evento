"use client";

import { useRef, useState } from 'react';
import { Html5QrcodeScanner, Html5QrcodeResult, Html5QrcodeScannerState } from 'html5-qrcode';
import { StudentMissingModal } from '@/components/modals/StudentMissingModal';
import { Student } from '@/models/Student';
import { createQueuedAttendanceRecord } from '@/models/Attendance';
import { getStudentByIdNum } from '@/models/Student';
import { successSound, failSound } from '@/utils/sound';
import useQueuedAttendanceStore from '@/store/useQueuedAttendanceStore';
import { QueuedAttendance } from '@/models/Attendance';

interface ModalContent {
    desc: string;
    subtitle: string;
}

const Scanner: React.FC = () => {
    const html5QrcodeScannerRef = useRef<Html5QrcodeScanner | null>(null);
    const [modalContent, setModalContent] = useState<ModalContent | null>(null);
    const addAttendanceQueue = useQueuedAttendanceStore((state) => state.addAttendanceQueue);

    const attendanceQueueProp: QueuedAttendance[] = []

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
            // SCANNING SHOULD BE PAUSED IMMEDIATELY SINCE FOLLOWING CODES ARE ASYNC
            pauseScanner(); // Pause scanning

            const student: Student | null = await getStudentByIdNum(decodedText);

            if (student) {
                successSound?.play();

                const queuedAttendance = await createQueuedAttendanceRecord(student);
                if (queuedAttendance) {
                    addAttendanceQueue(queuedAttendance);
                }


                setTimeout(() => {
                    resumeScanner(); // Resume scanning after a delay
                }, 800);

            } else {
                setModalContent({ desc: "The scanned ID does not match any user.", subtitle: `Scanned ID: ${decodedText}` });
                failSound?.play();
                pauseScanner(true); // Pause scanning
            }


        } catch (error) {
            console.error("Error fetching student details:", error);
            setModalContent({ desc: "An error occurred while fetching student details.", subtitle: `Scanned ID: ${decodedText}` });
            failSound?.play();
            pauseScanner(); // Pause scanning
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
            <div id="reader" ref={setScannerRef} className="w-full max-w-sm rounded"></div>
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

export default Scanner;
