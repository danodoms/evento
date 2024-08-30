"use client";


import AttendanceCard from "@/components/AttendanceCard";
import { Separator } from "@/components/ui/separator";
import { getAllAttendance, getRecentAttendance, RecentAttendanceRecord, type Attendance, type AttendanceRecord } from "@repo/models/Attendance"
import { Student } from "@repo/models/Student";
import { useQuery } from "@tanstack/react-query";

interface AttendanceHistoryProps {
	title?: string;
}

const AttendanceHistory: React.FC<AttendanceHistoryProps> = ({
	title = "Recent scan results",
}) => {
	const {
		data: recentAttendance = [],
		error,
		isLoading,
	} = useQuery<RecentAttendanceRecord[]>({
		queryKey: ["recentAttendanceRecords"],
		queryFn: getRecentAttendance,
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
			{recentAttendance?.map((attendance: RecentAttendanceRecord) => (
				<AttendanceCard key={attendance.id} result={
					{
						id: attendance.id,
						student: {
							id: 0,
							first_name: attendance.first_name,
							school_id: attendance.school_id,
							last_name: attendance.last_name,
							dept_id: attendance.dept_id,
							is_active: true,
							created_at: "",
						},
						time: attendance.time,
						date: attendance.date,
						scanned_by_email: attendance.scanned_by_email,
						school_id: attendance.school_id,
						is_time_in: attendance.is_time_in,
					}
				} />
			))}
		</section>
	);
};

export default AttendanceHistory;
