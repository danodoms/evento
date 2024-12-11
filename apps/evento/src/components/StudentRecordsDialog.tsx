import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Attendance,
	getAttendanceRecordsBySchoolId,
	type GroupedAttendance
} from "@repo/models/Attendance";
import { Event, getEvents } from "@repo/models/Event";
import { getStudentFullName, Student } from "@repo/models/Student";
import useMediaQuery from "@custom-react-hooks/use-media-query";
import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { TableProperties, CircleAlert, Eye, AlignLeft, LogIn, LogOut, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { truncateString } from "@/utils/utils";
import AttendanceRecords from "./AttendanceRecords";

type StudentRecordsDialogProps = {
	student?: Student;
	schoolId?: string;
};








const StudentRecordsDialog = ({ schoolId, student }: StudentRecordsDialogProps) => {

	let schoolIdToUse = "0000-0000"
	let studentName = "Student"

	if (schoolId) {
		schoolIdToUse = schoolId
		console.log("ON STUDENT RECORDS DIALOG: " + "using schoolId: " + schoolIdToUse)
	}

	if (student) {
		schoolIdToUse = student.school_id
		studentName = getStudentFullName(student)

		console.log("ON STUDENT RECORDS DIALOG: " + "using schoolId: " + schoolIdToUse)
		console.log("ON STUDENT RECORDS DIALOG: " + "using studentName: " + studentName)
	}

	const {
		data: attendanceRecords = [],
		error: attendanceRecordsError,
		isLoading: isAttendanceRecordsLoading,
	} = useQuery<Attendance[]>({
		queryKey: ["studentAttendanceRecords", schoolIdToUse],
		queryFn: () => getAttendanceRecordsBySchoolId(schoolIdToUse),
	});

	const {
		data: events = [],
		error: eventsError,
		isLoading: isEventsLoading,
	} = useQuery<Event[]>({
		queryKey: ["events"],
		queryFn: getEvents,
	});


	//* V2
	const groupedAttendanceRecords = Object.entries(
		attendanceRecords.reduce((acc, record) => {
			// Initialize array if it does not exist for the date
			if (!acc[record.date]) {
				acc[record.date] = [];
			}

			// Add the record to the array
			acc[record.date].push(record);

			return acc;
		}, {} as Record<string, typeof attendanceRecords>)
	).map(([date, records]) => ({
		date,
		// Sort records by time from earliest to latest
		records: records.sort((a, b) => a.time.localeCompare(b.time)),
	}));

	//* V1
	// const groupedAttendanceRecords = Object.entries(
	// 	attendanceRecords.reduce((acc, record) => {
	// 		(acc[record.date] = acc[record.date] || []).push(record);
	// 		return acc;
	// 	}, {} as Record<string, typeof attendanceRecords>)
	// ).map(([date, records]) => ({ date, records }));





	const isDesktop = useMediaQuery("(min-width: 768px)");

	const title = "Edit student";
	const description =
		"Make changes to the student here. Click save when you're done.";

	if (isDesktop) {
		return (
			<Dialog>
				<DialogTrigger>
					{/* <Button variant="ghost" className="">Edit</Button> */}
					<Trigger />
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>{studentName}</DialogTitle>

						<p className="text-xs tracking-wide">
							{schoolIdToUse}
						</p>
						<DialogDescription className="text-balance">
						</DialogDescription>
					</DialogHeader>

					<AttendanceRecords groupedAttendanceRecords={groupedAttendanceRecords} events={events} />

					{/* <DialogFooter>
                <Button type="submit">Save changes</Button>
            </DialogFooter> */}
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer >
			<DrawerTrigger>
				{/* <Button variant="ghost" className="">Edit</Button> */}
				<Trigger />
			</DrawerTrigger>
			<DrawerContent className="max-h-full">
				<DrawerHeader className="">
					<DrawerTitle className="text-xl">{studentName}</DrawerTitle>
					<p className="text-xs tracking-wide">
						{schoolIdToUse}
					</p>
					<DrawerDescription className="text-balance text-xs px-4"></DrawerDescription>
				</DrawerHeader>

				<AttendanceRecords groupedAttendanceRecords={groupedAttendanceRecords} events={events} />

				<DrawerFooter>
					{/* <Button>Submit</Button> */}
					<DrawerClose>
						<Button variant="ghost" className="w-full">
							Close
						</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};






const Trigger = () => {
	return (
		// <div className="flex gap-1 items-center rounded-full border px-3 py-1">
		// 	<TableProperties className="size-4" />
		// 	<p className="text-xs font-bold">View Records</p>
		// </div>
		<div className="flex gap-1 items-center rounded-full">
			<AlignLeft className="size-5" />
			{/* <p className="text-xs font-bold">Records</p> */}
		</div>
	)
}






export default StudentRecordsDialog;
