"use client";

import { TextSearch } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { AttendanceQueueCard } from "./AttendanceQueueCard";

import type { QueuedAttendance } from "@/models/Attendance";

interface AttendanceQueueSectionProps {
	results: QueuedAttendance[];
}

const AttendanceQueueSection: React.FC<AttendanceQueueSectionProps> = ({
	results,
}) => {
	return (
		<>
			{results.length > 0 ? (
				<div className="h-full overflow-auto w-full rounded-md flex flex-col gap-2">
					{results.map((result) => (
						<AttendanceQueueCard key={result.uniqueId} {...result} />
					))}
				</div>
			) : (
				<div className="flex gap-2 items-center justify-center opacity-50 h-full">
					<h4 className="text-sm font-medium leading-none text-center flex items-center gap-2">
						<TextSearch className="size-5" />
						Scan results will display here
					</h4>
				</div>
			)}
		</>
	);
};

export default AttendanceQueueSection;
