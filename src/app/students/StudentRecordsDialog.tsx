
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"


import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import { StudentForm } from "./StudentForm"

import useMediaQuery from '@custom-react-hooks/use-media-query';
import { Student } from "@/models/Student"
import { TableProperties } from "lucide-react"
import { getAllAttendanceRecords, AttendanceRecord } from "@/models/Attendance"
import { useQuery } from "@tanstack/react-query"
import { log } from "console"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { format, parseISO } from "date-fns"
import { Event, getEvents } from "@/models/Event"



type StudentRecordsDialogProps = {
    student: Student;
}




const StudentRecordsDialog = ({ student }: StudentRecordsDialogProps) => {

    const { data: attendanceRecords = [], error: attendanceRecordsError, isLoading: isAttendanceRecordsLoading } = useQuery<AttendanceRecord[]>({
        queryKey: ["attendanceRecords"],
        queryFn: getAllAttendanceRecords,
    });

    const { data: events = [], error: eventsError, isLoading: isEventsLoading } = useQuery<Event[]>({
        queryKey: ["events"],
        queryFn: getEvents,
    });


    const getStudentAttendanceRecords = (student: Student) => {
        const records = attendanceRecords.filter(record => record.student_id === student.id)
        console.log("student records: ", records);

        return records
    }

    const getEventNameFromDate = (date: string) => {
        const event = events.find(event => event.date === date)
        return event ? event.name : formatDate(date)
    }

    const formatDate = (dateString: string): string => format(parseISO(dateString), "MMMM d, yyyy");


    const isDesktop = useMediaQuery("(min-width: 768px)")

    const title = "Edit student";
    const description = "Make changes to the student here. Click save when you're done.";


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
        )
    }

    return (
        <Drawer>
            <DrawerTrigger>
                {/* <Button variant="ghost" className="">Edit</Button> */}
                <div className="flex gap-1 items-center">
                    <TableProperties className="size-4" />
                    <p className="text-xs font-bold">Records</p>

                </div>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className="text-xl">{student?.name}</DrawerTitle>
                    <p className="text-xs font-semibold leading-loose">{student?.school_id}</p>
                    {/* <DrawerDescription className="text-balance text-xs px-4">Viewing attendance records</DrawerDescription> */}
                </DrawerHeader>

                <div className="p-4">
                    {/* <StudentForm student={student} /> */}


                    {/* {getStudentAttendanceRecords(student).map(record => ( */}

                    <Table className="max-h-5vh overflow-y-scroll">
                        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>In</TableHead>
                                <TableHead>Out</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>

                            {getStudentAttendanceRecords(student).map(record => (
                                <TableRow>
                                    <TableCell className="font-medium">{getEventNameFromDate(record.date)}</TableCell>
                                    <TableCell>{record.time_in}</TableCell>
                                    <TableCell>{record.time_out}</TableCell>
                                    {/* <TableCell className="text-right">$250.00</TableCell> */}
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>

                    {/* ))} */}


                </div>

                <DrawerFooter>
                    {/* <Button>Submit</Button> */}
                    <DrawerClose>
                        <Button variant="ghost" className="w-full">Close</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )


}

export default StudentRecordsDialog;