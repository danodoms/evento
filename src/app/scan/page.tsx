"use client";

import AttendanceQueueSection from "@/app/scan/AttendanceQueueSection";
import Scanner from "@/app/scan/Scanner";
import useQueuedAttendanceStore from "@/store/useQueuedAttendanceStore";
import { ToastContainer, toast } from "react-toastify";
import CurrentTimeAndDate from "./CurrentTimeAndDate";
import { Eye, GalleryHorizontalEnd, GalleryVerticalEnd, Maximize, TextSearch, TriangleAlert } from "lucide-react";
import AttendanceHistoryDialog from "./AttendanceHistoryDialog";
import { Toggle } from "@/components/ui/toggle"


const ScanPage = () => {
	const { attendanceQueue } = useQueuedAttendanceStore();

	return (
		<section className="flex flex-col gap-3 justify-center bg-background h-full">
			<div className="flex gap-2 justify-between items-center">
				<h1 className="text-3xl font-bold">Scan</h1>

				{/* <div className='bg-red-500 size-3 rounded-full animate-pulse' /> */}
				<div className="flex-auto  w-full">

					<CurrentTimeAndDate />
				</div>
				{/* <Toggle variant="outline" aria-label="Toggle italic">
					<Eye />
				</Toggle> */}


			</div>



			{/* <Toaster /> */}
			<div className="">
				<Scanner />
			</div>

			<div className="flex justify-between max-w-sm mx-auto w-full">
				<h2 className='py-1 px-3 border text-background bg-primary flex-auto justify-center rounded-s-full text-xs font-semibold flex gap-1 items-center'>
					<TriangleAlert className='size-3' />
					Ensure date and time is correct
				</h2>

				<AttendanceHistoryDialog />
			</div>


			<AttendanceQueueSection results={attendanceQueue} />



			<ToastContainer />
		</section>
	);
};

export default ScanPage;
