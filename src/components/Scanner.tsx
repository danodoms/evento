"use client"

import React, { useRef, useState } from 'react';
import { Html5QrcodeScanner, Html5QrcodeResult } from 'html5-qrcode';
import { StudentMissingModal } from '@/components/StudentMissingModal';
import { Student } from '@/models/Student';
import { handleAttendanceRecord } from '@/models/Attendance';
import { getStudentByIdNum } from '@/models/Student';

interface ModalContent {
    desc: string;
    subtitle: string;
}

const Scanner: React.FC = () => {
    const html5QrcodeScannerRef = useRef<Html5QrcodeScanner | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<ModalContent>({ desc: "", subtitle: "" });

    const successSound = new Audio('/success.mp3');
    const failSound = new Audio('/fail.mp3');

    const onScanSuccess = async (decodedText: string, decodedResult: Html5QrcodeResult) => {
        try {
            const student: Student | null = await getStudentByIdNum(decodedText);

            if (student) {
                setModalContent({ desc: `ID: ${decodedText}`, subtitle: student.name });
                successSound.play();
                handleAttendanceRecord(student.id);
            } else {
                setModalContent({ desc: "The scanned ID does not match any user.", subtitle: `Scanned ID: ${decodedText}` });
                failSound.play();
            }

            setIsModalOpen(true);
            html5QrcodeScannerRef.current?.pause(shouldPauseVideo = true);
            setTimeout(() => html5QrcodeScannerRef.current?.resume(), 500);
        } catch (error) {
            console.error("Error fetching student details:", error);
            setModalContent({ desc: "An error occurred while fetching student details.", subtitle: `Scanned ID: ${decodedText}` });
            failSound.play();
            setIsModalOpen(true);
            html5QrcodeScannerRef.current?.pause();
        }
    };

    const onScanFailure = (error: any) => {
        // console.warn(`QR Code scan error: ${error}`);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        html5QrcodeScannerRef.current?.resume();
    };

    const setScannerRef = (node: HTMLDivElement | null) => {
        if (node && !html5QrcodeScannerRef.current) {
            const html5QrcodeScanner = new Html5QrcodeScanner(
                node.id,
                { fps: 4, qrbox: { width: 250, height: 250 } },
                false
            );

            html5QrcodeScanner.render(onScanSuccess, onScanFailure);
            html5QrcodeScannerRef.current = html5QrcodeScanner;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div id="reader" ref={setScannerRef} className="w-full max-w-sm rounded"></div>
            <StudentMissingModal
                subtitle={modalContent.subtitle}
                description={modalContent.desc}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    );
};

export default Scanner;
