'use client';

import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats, Html5QrcodeScanType } from 'html5-qrcode';
import UserMissingModal from '@/components/UserMissingModal'; // Import your ScanSuccessModal component
import { userExists } from '@/app/database/Users';

const Scanner = () => {
    const scannerRef = useRef<HTMLDivElement>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [successModalTitle, setSuccessModalTitle] = useState("User not found")
    const [successModalDesc, setSuccessModalDesc] = useState("Lorem ipsum")
    const [successModalSubtitle, setSuccessModalSubtitle] = useState("Lorem ipsum")

    // function evaluateId(id: string) {
    //     if (userExists(id)) {
    //         return 
    //     }
    // }


    useEffect(() => {
        const onScanSuccess = (decodedText: string, decodedResult: any) => {
            console.log(`Code matched = ${decodedText}`, decodedResult);
            setIsModalOpen(true); // Show the modal on successful scan


            if (userExists(decodedText)) {

            }


            setSuccessModalSubtitle(() => decodedText)
        };

        const onScanFailure = (error: any) => {
            console.warn(`QR Code scan error: ${error}`);
        };

        if (scannerRef.current) {
            const html5QrcodeScanner = new Html5QrcodeScanner(
                scannerRef.current.id,
                { fps: 3, qrbox: { width: 250, height: 250 } },
                /* verbose= */ false
            );

            html5QrcodeScanner.render(onScanSuccess, onScanFailure);

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
    };

    return (
        <div className="flex flex-col items-center justify-center">
            {/* <h1 className="text-2xl font-bold mb-4">Barcode/QR Code Scanner</h1> */}
            <div id="reader" ref={scannerRef} className="w-full max-w-sm  rounded"></div>
            {/* {isScanning && <p className="mt-2 text-green-500">Scanning...</p>} */}
            <UserMissingModal title={successModalTitle} subtitle={successModalSubtitle} description={successModalDesc} isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
};

export default Scanner;
