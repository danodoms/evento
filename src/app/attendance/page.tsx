

"use client"

import { useQuery } from "@tanstack/react-query";
import { DataTable } from "./DataTable"
import { AttendanceRecord, getAllAttendanceRecords } from "@/models/Attendance";
import { columns } from "./columns"





export default function AttendancePage() {
    const { data: attendanceRecords = [], error, isLoading } = useQuery<AttendanceRecord[]>({
        queryKey: ["attendanceRecords"],
        queryFn: getAllAttendanceRecords,
    });

    return (
        <div className="p-4 flex flex-col gap-2">
            <DataTable columns={columns} data={attendanceRecords} />
        </div>
    )
}
