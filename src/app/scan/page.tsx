
'use client';

import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats, Html5QrcodeScanType } from 'html5-qrcode';
import ScanSuccessModal from '@/components/ScanSuccessModal'; // Import your ScanSuccessModal component
import Scanner from '@/components/Scanner';

const ScanPage = () => {


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <Scanner />
        </div >
    );
};

export default ScanPage;
