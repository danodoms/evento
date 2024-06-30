
'use client';

import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats, Html5QrcodeScanType } from 'html5-qrcode';
import Scanner from '@/components/Scanner';
import AttendanceQueueSection from '@/components/AttendanceQueueSection';
import useQueuedAttendanceStore from '@/store/useQueuedAttendanceStore';

const ScanPage = () => {
    const { attendanceQueue } = useQueuedAttendanceStore()

    return (
        <section className="flex flex-col gap-4 justify-center min-h-screen bg-background pt-10 p-2">
            {/* <Toaster /> */}
            <div className='p-0 m-0'>
                <Scanner />
            </div>

            <div className=''>
                <AttendanceQueueSection results={attendanceQueue} />
            </div>

        </section >
    );
};

export default ScanPage;
