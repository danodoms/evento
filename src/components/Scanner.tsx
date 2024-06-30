"use client"

import React, { useRef, useState } from 'react';
import { Html5QrcodeScanner, Html5QrcodeResult, Html5QrcodeScannerState } from 'html5-qrcode';
import { StudentMissingModal } from '@/components/modals/StudentMissingModal';
import { Student } from '@/models/Student';
import { handleAttendanceRecord, createQueuedAttendanceRecord } from '@/models/Attendance';
import { getStudentByIdNum } from '@/models/Student';
import { successSound, failSound } from '@/utils/sound';
import useQueuedAttendanceStore from '@/store/useQueuedAttendanceStore';

interface ModalContent {
    desc: string;
    subtitle: string;
}



const Scanner: React.FC = () => {
    const html5QrcodeScannerRef = useRef<Html5QrcodeScanner | null>(null);
    const [modalContent, setModalContent] = useState<ModalContent | null>(null);


    const addAttendanceQueue = useQueuedAttendanceStore((state) => state.addAttendanceQueue);


    const pauseAndResumeScanner = (scanner: Html5QrcodeScanner | null, delay: number) => {
        if (scanner) {
            const state = scanner.getState();
            if (state === Html5QrcodeScannerState.SCANNING) {
                // scanner.pause(true);
                scanner.pause();
                setTimeout(() => {
                    if (scanner.getState() === Html5QrcodeScannerState.PAUSED) {
                        scanner.resume();
                    }
                }, delay);
            }
        }
    };

    const onScanSuccess = async (decodedText: string, decodedResult: Html5QrcodeResult) => {
        try {
            const student: Student | null = await getStudentByIdNum(decodedText);

            if (student) {
                // setModalContent({ desc: `ID: ${decodedText}`, subtitle: student.name });
                successSound?.play();
                // handleAttendanceRecord(student.id);

                const queuedAttendance = await createQueuedAttendanceRecord(student);
                if (queuedAttendance) {
                    addAttendanceQueue(queuedAttendance);
                }

            } else {
                setModalContent({ desc: "The scanned ID does not match any user.", subtitle: `Scanned ID: ${decodedText}` });
                if (html5QrcodeScannerRef.current?.getState() === Html5QrcodeScannerState.SCANNING) {
                    html5QrcodeScannerRef.current.pause();
                }
                failSound?.play();

            }

            pauseAndResumeScanner(html5QrcodeScannerRef.current, 700);
        } catch (error) {
            console.error("Error fetching student details:", error);
            setModalContent({ desc: "An error occurred while fetching student details.", subtitle: `Scanned ID: ${decodedText}` });
            failSound?.play();
            pauseAndResumeScanner(html5QrcodeScannerRef.current, 700);
        }
    };

    const onScanFailure = (error: any) => {
        // Handle scan failure if needed
    };

    const handleCloseModal = () => {
        setModalContent(null);
        if (html5QrcodeScannerRef.current?.getState() === Html5QrcodeScannerState.PAUSED) {
            html5QrcodeScannerRef.current.resume();
        }
    };

    const setScannerRef = (node: HTMLDivElement | null) => {
        if (node && !html5QrcodeScannerRef.current) {
            const html5QrcodeScanner = new Html5QrcodeScanner(
                node.id,
                { fps: 3, qrbox: { width: 250, height: 250 } },
                false
            );

            html5QrcodeScanner.render(onScanSuccess, onScanFailure);
            html5QrcodeScannerRef.current = html5QrcodeScanner;
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
