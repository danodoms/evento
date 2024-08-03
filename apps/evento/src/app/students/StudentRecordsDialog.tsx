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

import { StudentForm } from "./StudentForm";

import { log } from "console";
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
} from "@/models/Attendance";
import { Event, getEvents } from "@/models/Event";
import { Student } from "@/models/Student";
import useMediaQuery from "@custom-react-hooks/use-media-query";
import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { TableProperties, CircleAlert, Eye, AlignLeft, LogIn, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type StudentRecordsDialogProps = {
	student?: Student;
	schoolId?: string;
};



const formatDate = (dateString: string): string =>
	format(parseISO(dateString), "MMMM d, yyyy");


const getEventNameFromDate = (events: Event[], date: string) => {
	const event = events.find((event) => event.date === date);
	return event ? event.name : formatDate(date);
};


const StudentRecordsDialog = ({ schoolId, student }: StudentRecordsDialogProps) => {

	let schoolIdToUse = "0000-0000"
	let studentName = "Student"

	if (schoolId) {
		schoolIdToUse = schoolId
	} else if (student) {
		schoolIdToUse = student.school_id
		studentName = student.name
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

					<AttendanceRecordsSection attendanceRecords={attendanceRecords} events={events} />

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

				<AttendanceRecordsSection attendanceRecords={attendanceRecords} events={events} />

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
	attendanceRecords: Attendance[];
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

const AttendanceRecordsSection: React.FC<AttendanceSectionProps> = ({ attendanceRecords, events }) => {

	return (
		<div className="p-4 max-h-96 overflow-y-auto">
			{attendanceRecords.length > 0 ? (
				<Table>
					{/* <TableCaption>A list of your recent invoices.</TableCaption> */}
					<TableHeader>
						<TableRow>
							<TableHead>Date</TableHead>
							<TableHead>Time</TableHead>
							{/* <TableHead>Time Out</TableHead> */}
						</TableRow>
					</TableHeader>
					<TableBody className="">
						{attendanceRecords?.map((record) => (
							<TableRow key={record.id}>
								<TableCell className="font-medium">
									{getEventNameFromDate(events, record.date)}
								</TableCell>

								{record.is_time_in ?
									(<TableCell className="flex gap-4 items-center"> <Badge variant={"secondary"} className="flex gap-2"><LogIn className="size-3" />{record.time}</Badge></TableCell>) :
									(<TableCell className="flex gap-4 items-center"> <Badge variant={"destructive"} className="flex gap-2"><LogOut className="size-3" />{record.time}</Badge></TableCell>)
								}


								{/* <TableCell>{record.time_out}</TableCell> */}
								{/* <TableCell className="text-right">$250.00</TableCell> */}
							</TableRow>
						))}
					</TableBody>
				</Table>
			) : (
				<div className="flex items-center justify-center h-full">
					<p className="text-center text-sm px-4 py-2 rounded-full flex items-center gap-2"><CircleAlert className="size-4" />No records found</p>
				</div>
			)}
		</div>
	)

}

export default StudentRecordsDialog;
