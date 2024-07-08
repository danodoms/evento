"use client"


import { useQuery } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


import { Separator } from "@/components/ui/separator";


import { BellIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
// import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge";

import { format, parseISO, getMonth, getYear } from 'date-fns';
import { MapPin, Clock, Calendar, Pencil, Trash, UserRound, Building2 } from "lucide-react";

import Link from "next/link"

import { useState, useMemo } from 'react';


import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"



import { Student, getAllStudents } from "@/models/Student";
import { Department, getDepartments } from "@/models/Department";
import { Input } from "@/components/ui/input";






export default function StudentsPage() {


    const { data: students = [], error: studentsError, isLoading: isStudentsLoading } = useQuery<Student[]>({
        queryKey: ["students"],
        queryFn: getAllStudents,
    });

    const { data: departments = [], error: departmentsError, isLoading: isDepartmentsLoading } = useQuery<Department[]>({
        queryKey: ["departments"],
        queryFn: getDepartments,
    });


    // function formatDate(dateString: string): string {
    //     // Parse the ISO format date string
    //     const parsedDate = parseISO(dateString);

    //     // Format the date in the desired text form
    //     const formattedDate = format(parsedDate, "MMMM d, yyyy");

    //     return formattedDate;
    // }

    function getDepartmentNameById(departmentId: number): string | undefined {
        const department = departments.find(dept => dept.id === departmentId);
        return department ? department.short_name : undefined;
    }


    const [filter, setFilter] = useState<string>('');
    const [departmentFilter, setDepartmentFilter] = useState<string>('');


    const filteredStudents = students.filter(student => {
        return (
            student.name.toLowerCase().includes(filter.toLowerCase()) &&
            (departmentFilter ? student.dept_id?.toString() === departmentFilter : true)
        );
    });

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold tracking-tight">Students</h1>
                <Link href="/students/create" className="flex gap-2 items-center button font-semibold border p-2 rounded-lg">
                    <UserRound className="mr size-4" />Add Student
                </Link>
            </div>










            <div className="flex gap-2 justify-evenly">


                <Input type="text" placeholder="Filter by name" onChange={e => setFilter(e.target.value)} value={filter} />



                <Select onValueChange={value => setDepartmentFilter(value)} value={departmentFilter}>
                    <SelectTrigger className="">
                        <SelectValue placeholder="All Departments" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Departments</SelectLabel>
                            <SelectItem value={null}>All Departments</SelectItem>
                            {departments.map(department => (
                                <SelectItem key={department.id} value={department.id.toString()}>{department.short_name}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>








            {filteredStudents ? (
                <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
                    {filteredStudents.map((student, index) => (
                        <div key={index} className="p-4 border rounded-lg flex flex-col gap-2 backdrop-contrast-50 backdrop-opacity-25">
                            <div className="flex justify-between items-center">
                                <div className="flex gap-2 items-center">
                                    <UserRound className="size-5" />
                                    <p className="font-bold text-sm">{student.school_id}</p>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <Link href="#" className="text-xs border p-2 rounded-full flex gap-1"><Trash className="size-4" /></Link>
                                    <Link href="#" className="text-xs border p-2 rounded-full flex gap-1"><Pencil className="size-4" /></Link>
                                </div>
                            </div>

                            <Separator className="my-1" />

                            <h2 className="font-bold text-xl">{student.name}</h2>

                            {/* <div className="text-xs text-balance truncate">
                                {event.description ? event.description : "No description"}
                            </div> */}

                            <div className="flex gap-2 flex-wrap mt-1">
                                {student.dept_id && (
                                    <Badge className="flex gap-1"><Building2 className="size-3" />{getDepartmentNameById(student.dept_id)}</Badge>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    <p>No events</p>
                </div>
            )}



            <ToastContainer />
        </div>
    );
}