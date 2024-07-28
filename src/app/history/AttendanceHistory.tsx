"use client";


import AttendanceCard from "@/components/AttendanceCard";
import { Separator } from "@/components/ui/separator";
import { getAllAttendanceRecords } from "@/models/Attendance";
import type { AttendanceRecord } from "@/models/Attendance";
import { useQuery } from "@tanstack/react-query";

interface AttendanceHistoryProps {
	title?: string;
}

const AttendanceHistory: React.FC<AttendanceHistoryProps> = ({
	title = "Recent scan results",
}) => {
	const {
		data: attendanceRecords = [],
		error,
		isLoading,
	} = useQuery<AttendanceRecord[]>({
		queryKey: ["attendanceRecords"],
		queryFn: getAllAttendanceRecords,
	});

	if (isLoading) {
		return <p>Loading...</p>; // Optional loading state while data is fetched
	}

	if (error) {
		return <p>Error: {error.message}</p>; // Optional error handling
	}

	return (
		<section className="flex flex-col gap-2 h-full overflow-auto">
			{/* <h1 className="font-semibold text-lg">{title}</h1> */}
			{attendanceRecords?.map((record: AttendanceRecord) => (
				<AttendanceCard key={record.id} result={record} />
			))}
		</section>
	);
};

export default AttendanceHistory;
