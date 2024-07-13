"use client";

import { useQuery } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Separator } from "@/components/ui/separator";

import { BellIcon, CheckIcon } from "@radix-ui/react-icons";

// import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { format, getMonth, getYear, parseISO } from "date-fns";
import {
	Building2,
	Calendar,
	Clock,
	Ellipsis,
	Filter,
	MapPin,
	Pencil,
	Plus,
	TableProperties,
	Trash,
	UserRound,
} from "lucide-react";

import Link from "next/link";

import { useMemo, useState } from "react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { type Department, getDepartments } from "@/models/Department";
import {
	type Student,
	deactivateStudent,
	getAllStudents,
} from "@/models/Student";
import StudentFormDialog from "./StudentFormDialog";

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import StudentRecordsDialog from "./StudentRecordsDialog";

export default function StudentsPage() {
	const {
		data: students = [],
		error: studentsError,
		isLoading: isStudentsLoading,
	} = useQuery<Student[]>({
		queryKey: ["students"],
		queryFn: getAllStudents,
	});

	const {
		data: departments = [],
		error: departmentsError,
		isLoading: isDepartmentsLoading,
	} = useQuery<Department[]>({
		queryKey: ["departments"],
		queryFn: getDepartments,
	});

	function getDepartmentNameById(departmentId: number): string | undefined {
		const department = departments.find((dept) => dept.id === departmentId);
		return department ? department.short_name : undefined;
	}

	const [isCompactView, setIsCompactView] = useState(false);

	const [filter, setFilter] = useState<string>("");
	const [departmentFilter, setDepartmentFilter] = useState<string>("all");
	const [statusFilter, setStatusFilter] = useState<"active" | "inactive">(
		"active",
	);

	const filteredStudents = students.filter((student) => {
		const matchesSearch =
			student.name.toLowerCase().includes(filter.toLowerCase()) ||
			student.school_id.toString().includes(filter.toLowerCase());

		const matchesStatus =
			statusFilter === "active" ? student.is_active : !student.is_active;

		const matchesDepartment =
			departmentFilter === "all" ||
			student.dept_id?.toString() === departmentFilter;

		return matchesSearch && matchesStatus && matchesDepartment;
	});

	const resetFilters = () => {
		setStatusFilter("active");
		setDepartmentFilter("all");
	};

	const countActiveFilters = () => {
		let count = 0;
		if (isCompactView) count++;
		if (statusFilter !== "active") count++;
		if (departmentFilter !== "all") count++;
		return count;
	};

	return (
		<div className="flex flex-col gap-3">
			<div className="flex justify-between gap-2 items-center">
				{/* <h1 className="text-2xl font-bold tracking-tight">Students</h1>
                <Link href="/students/create" className="flex gap-2 items-center button font-semibold border p-2 rounded-lg">
                    <UserRound className="mr size-4" />Add Student
                </Link> */}
				<h1 className="text-2xl font-bold tracking-tight mr-auto">Students</h1>

				<Link href="/students/create">
					<Button variant={"ghost"}>
						<Plus className="size-4" />
						Add
					</Button>
				</Link>
				<Sheet>
					<SheetTrigger asChild>
						<Button variant="outline">
							<Filter className="mr-2 size-4" />
							Filter
							{countActiveFilters() > 0 && (
								<Badge variant={"destructive"} className="ml-2">
									{countActiveFilters()}
								</Badge>
							)}
						</Button>
					</SheetTrigger>
					<SheetContent className="flex h-full justify-center flex-col">
						<SheetHeader>
							<SheetTitle>Filter Students</SheetTitle>
							<SheetDescription className="text-balance">
								Select filters to apply
							</SheetDescription>
						</SheetHeader>
						<div className="flex gap-1 flex-col justify-evenly py-4 ">
							<div className="flex items-center justify-between space-x-2 border rounded-md p-2">
								<Label htmlFor="compact-view">Compact View</Label>
								<Switch
									checked={isCompactView}
									onCheckedChange={setIsCompactView}
									id="compact-mode"
								/>
							</div>

							{/* ADD FILTERS HERE */}
							<p className="text-xs mt-2 opacity-50">Status</p>

							<Select
								onValueChange={(value: "active" | "inactive") =>
									setStatusFilter(value)
								}
								value={statusFilter}
							>
								<SelectTrigger className="">
									<SelectValue placeholder="All Departments" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Status</SelectLabel>
										<SelectItem value="active">Active</SelectItem>
										<SelectItem value="inactive">Inactive</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>

							<p className="text-xs mt-2 opacity-50">Department</p>

							<Select
								onValueChange={(value) => setDepartmentFilter(value)}
								value={departmentFilter}
							>
								<SelectTrigger className="">
									<SelectValue placeholder="All Departments" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Departments</SelectLabel>
										<SelectItem value="all">All Departments</SelectItem>
										{departments.map((department) => (
											<SelectItem
												key={department.id}
												value={department.id.toString()}
											>
												{department.short_name}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						<SheetFooter className="flex gap-2 flex-col">
							<SheetClose asChild>
								<Button type="submit" className="w-full mx-auto">
									Apply Filters
								</Button>
							</SheetClose>
							<Button
								className="mt-20 w-full"
								onClick={resetFilters}
								variant={"ghost"}
							>
								Reset Filters
							</Button>
						</SheetFooter>
					</SheetContent>
				</Sheet>
			</div>

			<div className="flex gap-2 justify-evenly">
				<Input
					type="text"
					placeholder="Search"
					onChange={(e) => setFilter(e.target.value)}
					value={filter}
				/>
			</div>

			{filteredStudents ? (
				<div className="flex flex-col gap-3 md:grid md:grid-cols-2 lg:grid-cols-3 overflow-y-auto max-h-screen rounded-md">
					{filteredStudents.map((student, index) => (
						<div
							key={index}
							className="p-4 border rounded-lg flex flex-col gap-2 backdrop-contrast-50 backdrop-opacity-25"
						>
							<div className="flex justify-between items-center">
								<div className="flex gap-2 items-center">
									<UserRound className="size-5" />
									<p className="font-bold text-sm">{student.school_id}</p>
								</div>
								<div className="flex gap-4 items-center">
									{/* <div className="flex gap-1 items-center">
                                        <TableProperties className="size-4" />
                                        <p className="text-xs font-bold">Records</p>

                                    </div> */}

									<StudentRecordsDialog student={student} />

									<DropdownMenu>
										<DropdownMenuTrigger className=" rounded-full text-sm flex gap-2 items-center">
											<Ellipsis className=" " />
										</DropdownMenuTrigger>
										<DropdownMenuContent>
											<DropdownMenuLabel>Actions</DropdownMenuLabel>
											<DropdownMenuSeparator />
											<DropdownMenuItem asChild>
												<StudentFormDialog student={student} />
											</DropdownMenuItem>
											<DropdownMenuItem
												onClick={() => deactivateStudent(student)}
											>
												<Trash className="size-4 mr-2" />
												Delete
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							</div>

							<Separator className="my-1" />

							<h2 className="font-bold text-xl">{student.name}</h2>

							{/* <div className="text-xs text-balance truncate">
                                {event.description ? event.description : "No description"}
                            </div> */}

							<div className="flex gap-2 flex-wrap mt-1">
								{student.dept_id && (
									<Badge className="flex gap-1">
										<Building2 className="size-3" />
										{getDepartmentNameById(student.dept_id)}
									</Badge>
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
