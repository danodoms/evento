

"use client"

import { useQuery } from "@tanstack/react-query";
import { DataTable } from "./DataTable"
import { AttendanceRecord, getAllAttendanceRecords } from "@/models/Attendance";
import { columns } from "./columns"


import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"




export default function AttendancePage() {

    const { data: attendanceRecords = [], error, isLoading } = useQuery<AttendanceRecord[]>({
        queryKey: ["attendanceRecords"],
        queryFn: getAllAttendanceRecords,
    });

    return (

        <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl">Attendance Records</h1>

            <Tabs defaultValue="allRecords" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="allRecords" >All Records</TabsTrigger>
                    <TabsTrigger value="students">Students</TabsTrigger>
                    <TabsTrigger value="events">Events</TabsTrigger>
                </TabsList>

                <TabsContent value="students">
                </TabsContent>

                <TabsContent value="allRecords">
                    <div className="pt-2">
                        <DataTable columns={columns} data={attendanceRecords} />
                    </div>

                </TabsContent>
                <TabsContent value="events">

                </TabsContent>
            </Tabs>













        </div>
    )
}
