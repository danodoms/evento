"use client";


import AttendanceCard from "@/components/AttendanceCard";
import { Separator } from "@/components/ui/separator";
import { getAllAttendance, getAllAttendanceRecords } from "@/models/Attendance";
import type { Attendance } from "@/models/Attendance";
import { useQuery } from "@tanstack/react-query";

interface AttendanceHistoryProps {
	title?: string;
}

const AttendanceHistory: React.FC<AttendanceHistoryProps> = ({
	title = "Recent scan results",
}) => {
	const {
		data: allAttendance = [],
		error,
		isLoading,
	} = useQuery<Attendance[]>({
		queryKey: ["attendanceRecords"],
		queryFn: getAllAttendance,
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
			{allAttendance?.map((attendance: Attendance) => (
				<AttendanceCard key={attendance.id} result={attendance} />
			))}
		</section>
	);
};

export default AttendanceHistory;
