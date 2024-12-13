
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

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
import { TableProperties, CircleAlert, Eye, AlignLeft, LogIn, LogOut, Calendar, Redo, UndoIcon, ChevronLeft, ChevronRight, Hourglass, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
// import { truncateString } from "@/utils/utils";

type AttendanceSectionProps = {
    groupedAttendanceRecords: GroupedAttendance[];
    events: Event[];
}

type AttendanceRemark = "attended" | "incomplete" | "incomplete"

const AttendanceRecords: React.FC<AttendanceSectionProps> = ({ groupedAttendanceRecords, events }) => {

    // console.log("grouped attendance records: ", JSON.stringify(groupedAttendanceRecords))
    // console.log("events: ", JSON.stringify(events))




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




    // Function to calculate attendance summary
    function calculateEventSummary(events: Event[], attendanceRecords: GroupedAttendance[]) {
        // Object to store the total summary counts
        const totalSummary = {
            attended: 0,
            missed: 0,
            incomplete: 0
        };


        const summary = events
            .filter(event => event.is_active && event.is_required)  // Only process active events and required events
            .map((event) => {
                // Filter attendance records for the specific event date
                const recordsForEvent = attendanceRecords.filter(
                    (record) => record.date === event.date
                );
                // console.log("recordsForEvent", JSON.stringify(recordsForEvent))

                // Initialize the remark as "missed" by default
                let remark = "missed";

                let attendedDuration = 0

                if (event.is_required) {

                    if (recordsForEvent[0]?.records.length >= 1 && event.is_check_in_only) {
                        // If only one record exists but event is check-in only, mark as attended
                        remark = "attended";
                    }
                    else if (recordsForEvent[0]?.records.length === 1) {
                        // If only one record exists, mark as incomplete
                        remark = "incomplete";

                    } else if (recordsForEvent[0]?.records.length > 1) {

                        console.log("dsdasbsid")

                        // Calculate the duration covered by attendance
                        const times = recordsForEvent[0].records.map((record) => record.time);
                        // const earliest = Math.min(...times);
                        // const latest = Math.max(...times);
                        // const attendedDuration = (latest - earliest) / (60 * 1000); // in minutes






                        // Step 1: Convert time strings to total seconds
                        const totalSeconds = times.map(time => {
                            const [hours, minutes, seconds] = time.split(":").map(Number);
                            return hours * 3600 + minutes * 60 + seconds; // Total seconds from the start of the day
                        });

                        // Step 2: Find the earliest and latest times
                        const earliestSeconds = Math.min(...totalSeconds);
                        const latestSeconds = Math.max(...totalSeconds);

                        // Step 3: Calculate the duration in minutes
                        const durationSeconds = latestSeconds - earliestSeconds;
                        attendedDuration = durationSeconds / 60;


                        console.log("YOU ATTENDED MINUTESSS: ", event.name, attendedDuration)

                        // Compare attended duration with required duration
                        if (attendedDuration >= event.duration_in_minutes) {
                            remark = "attended";
                        } else {
                            remark = "incomplete";
                        }


                    }
                }


                // Update the total summary counts based on the remark
                if (remark === "attended") {
                    totalSummary.attended++;
                } else if (remark === "missed") {
                    totalSummary.missed++;
                } else if (remark === "incomplete") {
                    totalSummary.incomplete++;
                }


                // Return the event name, date, and calculated remark
                return {
                    name: event.name,
                    date: event.date,
                    duration_in_minutes: event.duration_in_minutes,
                    remark: remark as AttendanceRemark,
                    attended_duration_in_minutes: Math.floor(attendedDuration),
                    is_check_in_only: event.is_check_in_only
                };
            });

        // Return both the individual event summary and the total summary
        return {
            summary,
            totalSummary
        };
    }



    // console.log(calculateEventSummary(events, groupedAttendanceRecords))


    const { summary: attendanceSummary, totalSummary } = calculateEventSummary(events, groupedAttendanceRecords)




    return (


        <Tabs defaultValue="summary" className="w-full pt-4">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>
            <TabsContent value="summary" className="min-h-full">
                <div className="flex w-full gap-4 py-2">
                    <div className="p-4 bg-neutral-500 flex-auto rounded-md bg-opacity-20 items-center text-center">
                        <p className="font-bold text-sm">
                            Attended
                        </p>

                        <p className="font-bold text-xl">
                            {totalSummary.attended}
                        </p>
                    </div>



                    <div className="p-4 bg-yellow-500 flex-auto rounded-md bg-opacity-20 items-center text-center">
                        <p className="font-bold text-sm">
                            Incomplete
                        </p>

                        <p className="font-bold text-xl">
                            {totalSummary.incomplete}
                        </p>
                    </div>

                    <div className="p-4 bg-red-500 flex-auto rounded-md bg-opacity-20 items-center text-center">
                        <p className="font-bold text-sm">
                            Missed
                        </p>

                        <p className="font-bold text-xl">
                            {totalSummary.missed}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col w-full">
                    {attendanceSummary.map((item, index) => (
                        <div key={index} className=" rounded-md bg-neutral-500 bg-opacity-0 flex py-2 justify-between items-center gap-4">
                            <div className="flex flex-col flex-initial">
                                <p className="font-bold">{item.name}</p>

                                <div className="flex gap-1 opacity-50 text-xs font-semibold items-center">
                                    <Calendar className="size-2" />
                                    <p className="mr-1">{item.date}</p>

                                    {/* {item.duration_in_minutes && (
                                    <>
                                        <Hourglass className="size-2 " />
                                        <p className="mr-2">{item.duration_in_minutes}</p>
                                    </>
                                )} */}

                                    {item.attended_duration_in_minutes > 0 && (
                                        <>
                                            <Hourglass className="size-2" />
                                            <p className="mr-2">{item.attended_duration_in_minutes}/{item.duration_in_minutes} mn</p>
                                        </>
                                    )}

                                </div>


                                {(item.is_check_in_only) && (
                                    <div className="flex gap-1 opacity-50 text-xs font-semibold items-center">
                                        <LogIn className="size-3" />
                                        <p className="">Check-in only</p>
                                    </div>
                                )}


                            </div>





                            <div className={`font text-right p-4 rounded-md flex-auto bg-gradient-to-r from-transparent ${item.remark === 'attended'
                                ? 'to-neutral-500/20'
                                : item.remark === 'incomplete'
                                    ? 'to-yellow-500/20'
                                    : item.remark === 'missed'
                                        ? 'to-red-500/20'
                                        : 'to-neutral-500/20'
                                }`}>
                                <p>
                                    {item.remark}
                                </p>
                            </div>

                        </div>
                    ))}
                </div>

            </TabsContent>
            <TabsContent value="details" className="min-h-full">
                <div className=" overflow-scroll border-red-500 border-1  w-full grid-cols-2 grid gap-8 pt-4">
                    {groupedAttendanceRecords.length > 0 ? (
                        groupedAttendanceRecords.map((attendanceGroup) => (

                            <div key={attendanceGroup.date} className=" bg-neutral-500  bg-opacity-0 rounded-md">

                                <div className="flex flex-col justify-between items-left  rounded-md ">

                                    <p className="text-xs flex  font-bold gap-1 items-center opacity-50">

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
            </TabsContent>
        </Tabs>




    )

}

export default AttendanceRecords