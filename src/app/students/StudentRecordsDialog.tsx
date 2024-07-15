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
import { TableProperties } from "lucide-react";

type StudentRecordsDialogProps = {
	student: Student;
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

	const getEventNameFromDate = (date: string) => {
		const event = events.find((event) => event.date === date);
		return event ? event.name : formatDate(date);
	};

	const formatDate = (dateString: string): string =>
		format(parseISO(dateString), "MMMM d, yyyy");

	const isDesktop = useMediaQuery("(min-width: 768px)");

	const title = "Edit student";
	const description =
		"Make changes to the student here. Click save when you're done.";

	if (isDesktop) {
		return (
			<Dialog>
				<DialogTrigger>
					{/* <Button variant="ghost" className="">Edit</Button> */}
					<div className="flex gap-1 items-center">
						<TableProperties className="size-4" />
						<p className="text-xs font-bold">Records</p>
					</div>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>{title}</DialogTitle>
						<DialogDescription className="text-balance">
							{description}
						</DialogDescription>
					</DialogHeader>

					{/* <StudentForm student={student} /> */}

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
				<div className="flex gap-1 items-center rounded-full border px-3 py-1">
					<TableProperties className="size-4" />
					<p className="text-xs font-bold">View Records</p>
				</div>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle className="text-xl">{student?.name}</DrawerTitle>
					<p className="text-xs font-semibold leading-loose">
						{student?.school_id}
					</p>
					<DrawerDescription className="text-balance text-xs px-4">Viewing attendance records</DrawerDescription>
				</DrawerHeader>

				<div className="p-4 max-h-96 overflow-y-auto">
					{attendanceRecords.length > 0 ? (
						<Table>
							{/* <TableCaption>A list of your recent invoices.</TableCaption> */}
							<TableHeader>
								<TableRow>
									<TableHead>Date</TableHead>
									<TableHead>In</TableHead>
									<TableHead>Out</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody className="">
								{attendanceRecords?.map((record) => (
									<TableRow key={record.id}>
										<TableCell className="font-medium">
											{getEventNameFromDate(record.date)}
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
							<p className="text-center text-sm">No records found</p>
						</div>
					)}
				</div>

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

export default StudentRecordsDialog;
