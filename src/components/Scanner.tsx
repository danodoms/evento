import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import UserMissingModal from '@/components/UserMissingModal'; // Import your ScanSuccessModal component
import { Student, getStudentDetailsByIdNum } from '@/models.old/Student';
import useScanHistoryStore from '@/store/useScanHistoryStore';
import { toast } from "sonner";
// import { addAttendanceRecord } from '@/models.old/Attendance';
import { getStudentByIdNum, getAllStudents } from '@/models/Student';

const Scanner = () => {
    const scannerRef = useRef<HTMLDivElement>(null);
    const html5QrcodeScannerRef = useRef<Html5QrcodeScanner | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [successModalTitle, setSuccessModalTitle] = useState("User not found");
    const [successModalDesc, setSuccessModalDesc] = useState("Lorem ipsum");
    const [successModalSubtitle, setSuccessModalSubtitle] = useState("Lorem ipsum");


    useEffect(() => {
        const successSound = new Audio('/success.mp3');
        const failSound = new Audio('/fail.mp3');


        const onScanSuccess = async (decodedText: string, decodedResult: any) => {
            console.log(`Scanned Value = ${decodedText}`, decodedResult);


            try {
                // const userDetails: Student | null = await getStudentDetailsByIdNum(decodedText);
                const userDetails: Student | null = await getStudentByIdNum(decodedText);
                getAllStudents();

                if (userDetails) {
                    setSuccessModalTitle("User found");
                    setSuccessModalDesc(`ID: ${decodedText}`);
                    setSuccessModalSubtitle(userDetails.name);
                    setIsModalOpen(true);
                    successSound.play();
                    // addAttendanceRecord(userDetails);
                } else {
                    html5QrcodeScannerRef.current?.pause();
                    setSuccessModalDesc("The scanned ID does not match any user.");
                    setSuccessModalSubtitle(`Scanned ID: ${decodedText}`);
                    failSound.play();
                    setIsModalOpen(true);
                }
            } catch (error) {
                console.error("Error fetching student details: ", error);
                html5QrcodeScannerRef.current?.pause();
                setSuccessModalTitle("Error");
                setSuccessModalDesc("An error occurred while fetching student details.");
                setSuccessModalSubtitle(`Scanned ID: ${decodedText}`);
                failSound.play();
                setIsModalOpen(true);
            }

            // Pause the scanner for 500ms after successful scan
            if (html5QrcodeScannerRef.current) {
                html5QrcodeScannerRef.current.pause();
                setTimeout(() => {
                    html5QrcodeScannerRef.current?.resume();
                }, 500);
            }
        };

        const onScanFailure = (error: any) => {
            // console.warn(`QR Code scan error: ${error}`);
        };

        if (scannerRef.current) {
            const html5QrcodeScanner = new Html5QrcodeScanner(
                scannerRef.current.id,
                { fps: 5, qrbox: { width: 250, height: 250 } },
                /* verbose= */ false
            );

            html5QrcodeScanner.render(onScanSuccess, onScanFailure);
            html5QrcodeScannerRef.current = html5QrcodeScanner; // Save the scanner instance

            // Indicate that scanning has started
            setIsScanning(true);

            return () => {
                // Cleanup the scanner when the component is unmounted
                html5QrcodeScanner.clear();
                setIsScanning(false);
            };
        }
    }, []);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        html5QrcodeScannerRef.current?.resume()
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div id="reader" ref={scannerRef} className="w-full max-w-sm rounded"></div>
            <UserMissingModal title={successModalTitle} subtitle={successModalSubtitle} description={successModalDesc} isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
};

export default Scanner;
