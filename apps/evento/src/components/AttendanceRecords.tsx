


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

type AttendanceSectionProps = {
    groupedAttendanceRecords: GroupedAttendance[];
    events: Event[];
}



const AttendanceRecords: React.FC<AttendanceSectionProps> = ({ groupedAttendanceRecords, events }) => {

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

    return (
        <div className="md:max-h-96 overflow-y-auto  border-red-500 border-1 flex flex-col p-4 overflow-auto gap-4">


            {groupedAttendanceRecords.length > 0 ? (


                groupedAttendanceRecords.map((attendanceGroup) => (

                    <div key={attendanceGroup.date} className="min-w-full  bg-neutral-500  bg-opacity-10 rounded-md">

                        <div className="flex justify-between items-center p-4 opacity-50  rounded-md ">
                            {getEventNameFromDate(events, attendanceGroup.date) ? (
                                <span className="font-bold text-sm">
                                    {getEventNameFromDate(events, attendanceGroup.date)}
                                </span>
                            ) : (
                                <span className="font-bold text-sm italic">
                                    No Event
                                </span>
                            )}


                            <p className="text-xs flex  font-bold gap-2 items-center">
                                <Calendar className="size-3 " />
                                {formatDate(attendanceGroup.date)}
                            </p>
                        </div>





                        {/* SECTION FOR EACH ATTENDANCE RECORD */}
                        <Table className="">
                            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                            {/* <TableHeader>
								<TableRow >
									<TableHead className="hidden">Time</TableHead>
									<TableHead className="hidden">Scanner</TableHead>

								</TableRow>
							</TableHeader> */}
                            <TableBody className="">
                                {attendanceGroup?.records.map((record) => (
                                    <TableRow key={record.id} className="border-none outline-none justify-left flex align-middle">


                                        {record.is_time_in ?
                                            (<TableCell className="flex gap-4 items-center  flex-1"> <Badge variant={"secondary"} className="flex gap-2"><LogIn className="size-3" />{record.time}</Badge></TableCell>) :
                                            (<TableCell className="flex gap-4 items-center flex-1"> <Badge variant={"destructive"} className="flex gap-2"><LogOut className="size-3" />{record.time}</Badge></TableCell>)
                                        }


                                        {record.scanned_by_email ? (
                                            <TableCell className="text-xs ">
                                                {truncateString(record.scanned_by_email, 25)}
                                            </TableCell>
                                        ) : (
                                            <TableCell className="text-xs ">
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

export default AttendanceRecords