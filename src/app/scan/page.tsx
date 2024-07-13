
'use client';

import Scanner from '@/app/scan/Scanner';
import AttendanceQueueSection from '@/app/scan/AttendanceQueueSection';
import useQueuedAttendanceStore from '@/store/useQueuedAttendanceStore';
import { ToastContainer, toast } from 'react-toastify';

const ScanPage = () => {
    const { attendanceQueue } = useQueuedAttendanceStore()

    return (
        <section className="flex flex-col gap-4 justify-center bg-background pt-4 flex-wrap">
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
