
'use client';

import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats, Html5QrcodeScanType } from 'html5-qrcode';
import ScanSuccessModal from '@/components/ScanSuccessModal'; // Import your ScanSuccessModal component
import Scanner from '@/components/Scanner';
import LiveResultsSection from '@/components/LiveResultsSection';

const ScanPage = () => {

    return (
        <section className="flex flex-col flex gap-4 items-center justify-center min-h-screen bg-background ">
            <div className=''>
                <Scanner />
            </div>

            <div>
                <LiveResultsSection />
            </div>

        </section >
    );
};

export default ScanPage;
