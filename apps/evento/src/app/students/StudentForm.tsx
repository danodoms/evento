"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
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
import { type Department, getDepartments } from "@repo/models/Department";
import { type Student, addStudent, updateStudent } from "@repo/models/Student";
import { studentSchema } from "@/schemas/studentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import type { z } from "zod";

const formSchema = studentSchema;

type StudentFormProps = {
	student?: Student;
	handleClose?: () => void;
	handleError?: (message: string) => void;
};

export function StudentForm({ student, handleClose, handleError }: StudentFormProps) {
	const {
		data: departments = [],
		error,
		isLoading,
	} = useQuery<Department[]>({
		queryKey: ["departments"],
		queryFn: getDepartments,
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: student
			? {
				name: student.name,
				school_id: student.school_id,
				dept_id: student.dept_id?.toString(),
			}
			: {
				school_id: "",
				name: "",
				dept_id: "0",
			},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);


		//UPDATE THE STUDENT
		if (student) {
			await updateStudent({
				id: student.id,
				is_active: student.is_active,
				school_id: values.school_id,
				name: values.name,
				dept_id: values.dept_id != "0" ? Number(values.dept_id) : null,
			})
				.then((student) => {
					if (student === "SCHOOL_ID_EXISTS") {
						console.log("School ID already exists");
						handleError?.("School ID already in use");
					} else {
						console.log("Student updated successfully");
						form.reset();
						handleClose?.()
					}

					handleClose?.();
				})
				.catch((error) => {
					if (error?.code === "23505") {
						console.log("School ID already exists");
						handleError?.("School ID already in use");
					} else {
						handleError?.("Error updating student");
					}
				})
			return
		}


		//ADD THE STUDENT
		await addStudent({
			school_id: values.school_id,
			is_active: undefined,
			name: values.name,
			dept_id: values.dept_id != "0" ? Number(values.dept_id) : null,
		})
			.then((student) => {
				if (student === "SCHOOL_ID_EXISTS") {
					console.log("School ID already exists");
					toast.error("School ID already in use");
				} else {
					console.log("Student added successfully");
					toast.success("Student added successfully");
					form.reset();
					handleClose?.()
				}
			})
			.catch((error) => {
				toast.error("Error adding student");
				console.error("Error adding student:", error);
				handleError?.("Error adding student");
			});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="school_id"
					render={({ field }) => (
						<FormItem>
							<FormLabel>School ID</FormLabel>
							<FormControl>
								<Input placeholder="Enter school ID" {...field} />
							</FormControl>
							{form.formState.errors.school_id && (
								<FormMessage>
									{form.formState.errors.school_id.message}
								</FormMessage>
							)}
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="Enter name" {...field} />
							</FormControl>
							{form.formState.errors.name && (
								<FormMessage>{form.formState.errors.name.message}</FormMessage>
							)}
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="dept_id"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Department</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select Department" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											{/* <SelectLabel>Departments</SelectLabel> */}
											<SelectItem value="0">No Department</SelectItem>
											{departments?.map((dept) => (
												<SelectItem
													key={dept.id}
													value={dept.id.toLocaleString()}
												>
													{dept.short_name}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							</FormControl>
							{form.formState.errors.dept_id && (
								<FormMessage>
									{form.formState.errors.dept_id.message}
								</FormMessage>
							)}
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					disabled={form.formState.isSubmitting}
					className="w-full"
				>
					{student
						? form.formState.isSubmitting
							? "Saving changes..."
							: "Save changes"
						: form.formState.isSubmitting
							? "Submitting..."
							: "Submit"}
				</Button>
			</form>
		</Form>
	);
}
