

"use client"

import { useQuery } from "@tanstack/react-query";
import { DataTable } from "./DataTable"
import { AttendanceRecord, getAllAttendanceRecords } from "@/models/Attendance";
import { columns } from "./columns"





export default function DemoPage() {



    const { data: attendanceRecords = [], error, isLoading } = useQuery<AttendanceRecord[]>({
        queryKey: ["attendanceRecords"],
        queryFn: getAllAttendanceRecords,
    });

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={attendanceRecords} />
        </div>
    )
}
