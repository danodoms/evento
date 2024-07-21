"use client";

import AttendanceQueueSection from "@/app/scan/AttendanceQueueSection";
import Scanner from "@/app/scan/Scanner";
import useQueuedAttendanceStore from "@/store/useQueuedAttendanceStore";
import { ToastContainer, toast } from "react-toastify";
import CurrentTimeAndDate from "./CurrentTimeAndDate";
import { GalleryHorizontalEnd, GalleryVerticalEnd, TextSearch } from "lucide-react";

const ScanPage = () => {
	const { attendanceQueue } = useQueuedAttendanceStore();

	return (
		<section className="flex flex-col gap-3 justify-center bg-background h-full">
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

			<div className="flex justify-center w-full">
				<h4 className="text-xs font-semibold text-center px-4 py-1 border rounded-full flex gap-2 items-center">
					<GalleryHorizontalEnd className="size-4" />
					View History
				</h4>
			</div>


			<AttendanceQueueSection results={attendanceQueue} />



			<ToastContainer />
		</section>
	);
};

export default ScanPage;
