"use client";

import { useQuery } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Separator } from "@/components/ui/separator";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { BellIcon, CheckIcon } from "@radix-ui/react-icons";

// import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
	Building2,
	Calendar,
	Clock,
	Ellipsis,
	Filter,
	Hash,
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
	getFilteredPaginatedStudents,
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
import Search from "@/app/students/Search";
import PaginationComponent from "./Pagination";
import Loading from "@/components/Loading";
import { stat } from "fs/promises";

type StudentsPageProps = {
	searchParams?: {
		query?: string;
		page?: string;
	};
};

export default function StudentsPage({ searchParams }: StudentsPageProps) {

	const query = searchParams?.query || '';
	const currentPage = Number(searchParams?.page) || 1;

	const [departmentFilter, setDepartmentFilter] = useState<string>("all");
	const [statusFilter, setStatusFilter] = useState<"active" | "inactive">(
		"active",
	);
	const [isCompactView, setIsCompactView] = useState(false);


	const {
		data: { students = [], count: studentRowCount = null } = {},
		error: studentsError,
		isLoading: isStudentsLoading,
	} = useQuery<{ students: Student[]; count: number | null }>({
		queryKey: ["paginatedStudents", query, currentPage, departmentFilter, statusFilter],
		queryFn: () => getFilteredPaginatedStudents(currentPage, query, departmentFilter !== "all" ? Number(departmentFilter) : null, statusFilter === "active"),
	});

	const {
		data: departments = [],
		error: departmentsError,
		isLoading: isDepartmentsLoading,
	} = useQuery<Department[]>({
		queryKey: ["departments"],
		queryFn: getDepartments,
	});


	// const {
	// 	data: studentRowCount = 0,
	// } = useQuery<number>({
	// 	queryKey: ["studentRowCount"],
	// 	queryFn: getStudentRowCount,
	// });



	function getDepartmentNameById(departmentId: number): string | undefined {
		const department = departments.find((dept) => dept.id === departmentId);
		return department ? department.short_name : undefined;
	}

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
				<h1 className="text-3xl font-bold tracking-tight mr-auto">Students</h1>

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

			<div className="flex gap-2 flex-col justify-evenly">
				<Search />
			</div>




			{students.length > 0 ? (
				<div className="flex flex-col gap-3 md:grid md:grid-cols-2 lg:grid-cols-3 overflow-y-auto rounded-md w-full">
					{students.map((student, index) => (
						<div
							key={index}
							className="p-5 rounded-lg flex flex-col gap-1 backdrop-contrast-50 backdrop-opacity-20"
						>
							<div className="flex justify-between items-center">
								<div className="flex gap-2 items-center">
									<UserRound className="size-5" />
									<h2 className="font-bold">{student.name}</h2>
									{student.dept_id && (
										<Badge className="flex gap-1" variant={"secondary"}>
											<Building2 className="size-3" />
											{getDepartmentNameById(student.dept_id)}
										</Badge>
									)}
								</div>


								<div className="flex gap-4 items-center">



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

							{/* <Separator className="my-1" /> */}



							{/* <div className="text-xs text-balance truncate">
                                {event.description ? event.description : "No description"}
                            </div> */}

							<div className="flex gap-2 flex-wrap mt-1 justify-between">
								<div className="flex gap-2 items-center opacity-50">


									<p className="font-semibold text-sm">{student.school_id}</p>

									<StudentRecordsDialog student={student} />
								</div>



							</div>
						</div>
					))}


				</div>


			) : (
				<div className="flex flex-col mx-auto gap-4 p-20 opacity-50">
					<p>No students</p>
				</div>
			)}


			<PaginationComponent totalItems={studentRowCount} itemsPerPage={10} />

			<ToastContainer />
		</div>
	);
}
