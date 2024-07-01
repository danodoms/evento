
'use client';

import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats, Html5QrcodeScanType } from 'html5-qrcode';
import Scanner from '@/components/Scanner';
import AttendanceQueueSection from '@/components/AttendanceQueueSection';
import useQueuedAttendanceStore from '@/store/useQueuedAttendanceStore';
import { ToastContainer, toast } from 'react-toastify';

const ScanPage = () => {
    const { attendanceQueue } = useQueuedAttendanceStore()

    return (
        <section className="flex flex-col gap-4 justify-center bg-background pt-4 p-4">
            {/* <Toaster /> */}
            <div className='p-0 m-0'>
                <Scanner />
            </div>

            <div className=''>
                <AttendanceQueueSection results={attendanceQueue} />
            </div>
            <ToastContainer />
        </section >
    );
};

export default ScanPage;
