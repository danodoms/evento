


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
import { TableProperties, CircleAlert, Eye, AlignLeft, LogIn, LogOut, Calendar, Redo, UndoIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
// import { truncateString } from "@/utils/utils";

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
        <div className=" overflow-scroll border-red-500 border-1  gap-4 w-full grid-cols-2 grid">


            {groupedAttendanceRecords.length > 0 ? (


                groupedAttendanceRecords.map((attendanceGroup) => (

                    <div key={attendanceGroup.date} className=" bg-neutral-500  bg-opacity-10 rounded-md p-4">

                        <div className="flex flex-col justify-between items-left  rounded-md ">

                            <p className="text-xs flex  font-bold gap-2 items-center opacity-50  mb-2">
                                <Calendar className="size-3 " />
                                {formatDate(attendanceGroup.date)}
                            </p>


                            {getEventNameFromDate(events, attendanceGroup.date) ? (
                                <span className="font-bold ">
                                    {getEventNameFromDate(events, attendanceGroup.date)}
                                </span>
                            ) : (
                                <span className="font-bold text italic">
                                    No Event
                                </span>
                            )}
                        </div>





                        {/* SECTION FOR EACH ATTENDANCE RECORD */}
                        <div className="">
                            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                            {/* <TableHeader>
								<TableRow >
									<TableHead className="hidden">Time</TableHead>
									<TableHead className="hidden">Scanner</TableHead>

								</TableRow>
							</TableHeader> */}
                            <div className="">
                                {attendanceGroup?.records.map((record) => (
                                    <div key={record.id} className="border-none outline-none justify-left flex align-middle gap-4 py-1">


                                        {record.is_time_in ?
                                            (<div className="flex gap-2 items-center font-bold text-xs"> <div className="size-2 color-green-500 bg-green-500 opacity-80 rounded-full" />{record.time}</div>) :
                                            (<div className="flex gap-2 items-center font-bold text-xs"><div className="size-2 color-green-500 bg-red-500 opacity-80 rounded-full" />{record.time}</div>)
                                        }



                                    </div>
                                ))}
                            </div>
                        </div>
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