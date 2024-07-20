"use client";

import AttendanceQueueSection from "@/app/scan/AttendanceQueueSection";
import Scanner from "@/app/scan/Scanner";
import useQueuedAttendanceStore from "@/store/useQueuedAttendanceStore";
import { ToastContainer, toast } from "react-toastify";
import CurrentTimeAndDate from "./CurrentTimeAndDate";

const ScanPage = () => {
	const { attendanceQueue } = useQueuedAttendanceStore();

	return (
		<section className="flex flex-col gap-3 justify-center bg-background flex-wrap">
			<div className="flex gap-2">
				{/* <h1 className="text-2xl font-bold tracking-tight mr-auto grow-0">Scan</h1> */}
				<div className="flex-auto  w-full">
					<CurrentTimeAndDate />
				</div>

			</div>




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
