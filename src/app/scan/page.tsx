// 'use client'

// import { useEffect, useRef } from 'react';
// import Head from 'next/head';
// import { Html5Qrcode, Html5QrcodeScanType, Html5QrcodeScanner } from 'html5-qrcode';

// export default function ScanPage() {
//     const videoRef = useRef(null);

//     useEffect(() => {
//         if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//             navigator.mediaDevices.getUserMedia({ video: true })
//                 .then(stream => {
//                     if (videoRef.current) {
//                         //@ts-ignore
//                         videoRef.current.srcObject = stream;
//                         //@ts-ignore
//                         videoRef.current.play();
//                     }
//                 })
//                 .catch(err => {
//                     console.error("Error accessing the camera: ", err);
//                 });
//         }
//     }, []);



//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//             <Head>
//                 <title>Live Camera Feed</title>
//             </Head>
//             <h1 className="text-2xl font-bold mb-4">Live Camera Feed</h1>
//             <video ref={videoRef} className="w-full max-w-sm border border-gray-300 rounded" autoPlay playsInline />
//         </div>
//     );
// }










'use client';

import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats, Html5QrcodeScanType } from 'html5-qrcode';

const BarcodeScanner = () => {
    const scannerRef = useRef<HTMLDivElement>(null);
    const [isScanning, setIsScanning] = useState(false);

    useEffect(() => {
        // const config = {
        //     fps: 1, // Attempt scanning once every second
        //     qrbox: { width: 250, height: 250 },
        //     supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
        //     formatsToSupport: [
        //         Html5QrcodeSupportedFormats.QR_CODE,
        //         Html5QrcodeSupportedFormats.AZTEC,
        //         Html5QrcodeSupportedFormats.CODABAR,
        //         Html5QrcodeSupportedFormats.CODE_39,
        //         Html5QrcodeSupportedFormats.CODE_93,
        //         Html5QrcodeSupportedFormats.CODE_128,
        //         Html5QrcodeSupportedFormats.DATA_MATRIX,
        //         Html5QrcodeSupportedFormats.ITF,
        //         Html5QrcodeSupportedFormats.EAN_13,
        //         Html5QrcodeSupportedFormats.EAN_8,
        //         Html5QrcodeSupportedFormats.PDF_417,
        //         Html5QrcodeSupportedFormats.UPC_A,
        //         Html5QrcodeSupportedFormats.UPC_E,
        //     ],
        // };

        const onScanSuccess = (decodedText: string, decodedResult: any) => {
            console.log(`Code matched = ${decodedText}`, decodedResult);
        };

        const onScanFailure = (error: any) => {
            console.warn(`QR Code scan error: ${error}`);
        };

        if (scannerRef.current) {
            const html5QrcodeScanner = new Html5QrcodeScanner(
                scannerRef.current.id,
                { fps: 1, qrbox: { width: 250, height: 250 } },
                /* verbose= */ false);

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

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Barcode/QR Code Scanner</h1>
            <div id="reader" ref={scannerRef} className="w-full max-w-sm border border-gray-300 rounded"></div>
            {isScanning && <p className="mt-2 text-green-500">Scanning...</p>}
        </div>
    );
};

export default BarcodeScanner;
