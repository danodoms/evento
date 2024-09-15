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
} from "@repo/models/Attendance";
import { Event, getEvents } from "@repo/models/Event";
import { getStudentFullName, Student } from "@repo/models/Student";
import useMediaQuery from "@custom-react-hooks/use-media-query";
import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { TableProperties, CircleAlert, Eye, AlignLeft, LogIn, LogOut, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type StudentRecordsDialogProps = {
	student?: Student;
	schoolId?: string;
};



const formatDate = (dateString: string): string =>
	format(parseISO(dateString), "MMMM d, yyyy");


//*V2 This version also checks if event is active
const getEventNameFromDate = (events: Event[], date: string) => {
	const event = events.find((event) => event.date === date && event.is_active === true);
	return event && event.name;
};

//*V1 
// const getEventNameFromDate = (events: Event[], date: string) => {
// 	const event = events.find((event) => event.date === date);
// 	return event ? event.name : formatDate(date);
// };


type GroupedAttendance = {
	date: string;
	records: Attendance[];
};

const StudentRecordsDialog = ({ schoolId, student }: StudentRecordsDialogProps) => {

	let schoolIdToUse = "0000-0000"
	let studentName = "Student"

	if (schoolId) {
		schoolIdToUse = schoolId
	} else if (student) {
		schoolIdToUse = student.school_id
		studentName = getStudentFullName(student)
	}

	const {
		data: attendanceRecords = [],
		error: attendanceRecordsError,
		isLoading: isAttendanceRecordsLoading,
	} = useQuery<Attendance[]>({
		queryKey: ["studentAttendanceRecords", schoolId],
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

					<AttendanceRecordsSection groupedAttendanceRecords={groupedAttendanceRecords} events={events} />

					{/* <DialogFooter>
                <Button type="submit">Save changes</Button>
            </DialogFooter> */}
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer>
			<DrawerTrigger>
				{/* <Button variant="ghost" className="">Edit</Button> */}
				<Trigger />
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle className="text-xl">{studentName}</DrawerTitle>
					<p className="text-xs tracking-wide">
						{schoolIdToUse}
					</p>
					<DrawerDescription className="text-balance text-xs px-4"></DrawerDescription>
				</DrawerHeader>

				<AttendanceRecordsSection groupedAttendanceRecords={groupedAttendanceRecords} events={events} />

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




type AttendanceSectionProps = {
	groupedAttendanceRecords: GroupedAttendance[];
	events: Event[];
}


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







const AttendanceRecordsSection: React.FC<AttendanceSectionProps> = ({ groupedAttendanceRecords, events }) => {

	return (
		<div className="max-h-96 overflow-y-auto p-2 border-red-500 border-1 flex flex-col gap-2 overflow-auto">


			{groupedAttendanceRecords.length > 0 ? (


				groupedAttendanceRecords.map((attendanceGroup) => (

					<div key={attendanceGroup.date} className="min-w-full p-4 border bg-neutral-500 bg-opacity-10 rounded-md">

						<div className="flex justify-between items-center mb-4 p-4 bg-neutral-500 bg-opacity-10 rounded-md">
							{getEventNameFromDate(events, attendanceGroup.date) ? (
								<span className="font-medium text-sm">
									{getEventNameFromDate(events, attendanceGroup.date)}
								</span>
							) : (
								<span className="text-sm font-extralight italic opacity-50">
									No Event
								</span>
							)}


							<p className="text-xs flex  gap-2 items-center">
								<Calendar className="size-3" />
								{formatDate(attendanceGroup.date)}
							</p>
						</div>





						{/* SECTION FOR EACH ATTENDANCE RECORD */}
						<Table>
							{/* <TableCaption>A list of your recent invoices.</TableCaption> */}
							<TableHeader>
								<TableRow>
									<TableHead>Time</TableHead>
									<TableHead>Scanner</TableHead>

								</TableRow>
							</TableHeader>
							<TableBody className="">
								{attendanceGroup?.records.map((record) => (
									<TableRow key={record.id}>


										{record.is_time_in ?
											(<TableCell className="flex gap-4 items-center"> <Badge variant={"secondary"} className="flex gap-2"><LogIn className="size-3" />{record.time}</Badge></TableCell>) :
											(<TableCell className="flex gap-4 items-center"> <Badge variant={"destructive"} className="flex gap-2"><LogOut className="size-3" />{record.time}</Badge></TableCell>)
										}

										{/* <TableCell className="font-medium">
											{getEventNameFromDate(events, record.date)}
										</TableCell> */}


										{record.scanned_by_email ? (
											<TableCell className="text-xs">
												{record.scanned_by_email}
											</TableCell>
										) : (
											<TableCell className="text-xs">
												<span className="text-xs tracking-wide opacity-50">
													Unspecified
												</span>
											</TableCell>
										)}


									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				))




			) : (
				<div className="flex items-center justify-center h-full">
					<p className="text-center text-sm px-4 py-2 rounded-full flex items-center gap-2"><CircleAlert className="size-4" />No records found</p>
				</div>
			)}

		</div>
	)

}

export default StudentRecordsDialog;
