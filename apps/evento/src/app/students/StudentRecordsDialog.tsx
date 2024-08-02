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
	getAttendanceRecordsByStudentId,
} from "@/models/Attendance";
import { Event, getEvents } from "@/models/Event";
import { Student } from "@/models/Student";
import useMediaQuery from "@custom-react-hooks/use-media-query";
import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { TableProperties, CircleAlert, Eye, AlignLeft } from "lucide-react";

type StudentRecordsDialogProps = {
	student: Student;
};



const formatDate = (dateString: string): string =>
	format(parseISO(dateString), "MMMM d, yyyy");


const getEventNameFromDate = (events: Event[], date: string) => {
	const event = events.find((event) => event.date === date);
	return event ? event.name : formatDate(date);
};


const StudentRecordsDialog = ({ student }: StudentRecordsDialogProps) => {
	const {
		data: attendanceRecords = [],
		error: attendanceRecordsError,
		isLoading: isAttendanceRecordsLoading,
	} = useQuery<Attendance[]>({
		queryKey: ["studentAttendanceRecords", student.id],
		queryFn: () => getAttendanceRecordsByStudentId(student.id),
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
						<DialogTitle>{student?.name}</DialogTitle>

						<p className="text-xs tracking-wide">
							{student?.school_id}
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
					<DrawerTitle className="text-xl">{student?.name}</DrawerTitle>
					<p className="text-xs tracking-wide">
						{student?.school_id}
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
		<div className="flex gap-1 items-center rounded-full ">
			<AlignLeft className="size-5" />
			<p className="text-xs font-bold">Records</p>
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
							<TableHead>Time In</TableHead>
							<TableHead>Time Out</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody className="">
						{attendanceRecords?.map((record) => (
							<TableRow key={record.id}>
								<TableCell className="font-medium">
									{getEventNameFromDate(events, record.date)}
								</TableCell>
								<TableCell>{record.time_in}</TableCell>
								<TableCell>{record.time_out}</TableCell>
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
