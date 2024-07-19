"use client";

import AttendanceQueueSection from "@/app/scan/AttendanceQueueSection";
import Scanner from "@/app/scan/Scanner";
import useQueuedAttendanceStore from "@/store/useQueuedAttendanceStore";
import { ToastContainer, toast } from "react-toastify";

const ScanPage = () => {
	const { attendanceQueue } = useQueuedAttendanceStore();

	return (
		<section className="flex flex-col gap-4 justify-center bg-background flex-wrap">

			<h1 className="text-2xl font-bold tracking-tight mr-auto">Scan</h1>
			{/* <Toaster /> */}
			<div className="p-0 m-0">
				<Scanner />
			</div>

			<div className="">
				<AttendanceQueueSection results={attendanceQueue} />
			</div>
			<ToastContainer />
		</section>
	);
};

export default ScanPage;
