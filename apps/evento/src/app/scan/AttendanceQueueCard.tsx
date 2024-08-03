import { Progress } from "@/components/ui/progress";
// import useQueuedAttendanceStore from "@/store/useQueuedAttendanceStore";
import { Item } from "@radix-ui/react-dropdown-menu";
import { UserRound, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../components/ui/button";
import { AttendanceRecord } from "@/models/Attendance";

export function AttendanceQueueCard(result: AttendanceRecord) {


	return (
		<div
			className={`flex justify-between gap-4 items-center rounded-md relative ${result.is_time_in ? "bg-green-700" : "bg-destructive"}`}
		>
			<div className="flex gap-2 w-full flex-col px-4 py-2">
				<div className="flex gap-4 items-center">
					<UserRound />
					<div className="flex flex-col">
						<div className="text-normal font-medium">{result.student.name}</div>
						<div className="text-xs font-extralight">
							{result.student.school_id}
						</div>
					</div>
					<div className="ml-auto flex gap-4 items-center ">
						{result.is_time_in ? (
							<div className="p-2 items-center flex flex-col">
								<p className="text-xs">TIMED IN</p>
								<p className="font-bold">{result.time}</p>
							</div>
						) : (
							<div className="p-2 items-center flex flex-col">
								<p className="text-xs">TIMED OUT</p>
								<p className="font-bold">{result.time}</p>
							</div>
						)}


					</div>
				</div>
			</div>
			{/* <Progress
				value={progress}
				className="w-full h-full absolute opacity-5 p-0 m-0 rounded-md"
			/> */}
		</div>
	);
}
