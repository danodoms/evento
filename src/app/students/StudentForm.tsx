"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { studentSchema } from "@/schemas/studentSchema";
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
} from "@/components/ui/select"
import { Department, getDepartments } from "@/models/Department";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { addStudent, Student, updateStudent } from "@/models/Student";
import { ToastContainer, toast } from "react-toastify";

const formSchema = studentSchema;

type StudentFormProps = {
    student?: Student;
}



export function StudentForm({ student }: StudentFormProps) {

    const { data: departments = [], error, isLoading } = useQuery<Department[]>({
        queryKey: ["departments"],
        queryFn: getDepartments,
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: student ?
            {
                name: student.name,
                school_id: student.school_id,
                dept_id: student.dept_id?.toString(),
            } : {
                school_id: "",
                name: "",
                dept_id: "0",
            },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);

        if (student) {
            await updateStudent({
                id: student.id,
                is_active: student.is_active,
                school_id: values.school_id,
                name: values.name,
                dept_id: Number(values.dept_id),
            })
        } else {
            await addStudent({
                school_id: values.school_id,
                is_active: undefined,
                name: values.name,
                dept_id: Number(values.dept_id),
            })
                .then((student) => {
                    if (student === "SCHOOL_ID_EXISTS") {
                        console.log("School ID already exists");
                        toast.error("School ID already in use");
                    } else {
                        console.log("Student added successfully");
                        toast.success("Student added successfully");
                        form.reset();
                    }
                })
                .catch((error) => {
                    console.error("Error adding student:", error);
                });
            form.reset();
        }

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
                                <FormMessage>{form.formState.errors.school_id.message}</FormMessage>
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
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {/* <SelectLabel>Departments</SelectLabel> */}
                                            <SelectItem value="0">
                                                No Department
                                            </SelectItem>
                                            {departments?.map((dept) => (
                                                <SelectItem key={dept.id} value={dept.id.toLocaleString()}>
                                                    {dept.short_name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            {form.formState.errors.dept_id && (
                                <FormMessage>{form.formState.errors.dept_id.message}</FormMessage>
                            )}
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
                    {
                        student ? (form.formState.isSubmitting ? "Saving changes..." : "Save changes") : (form.formState.isSubmitting ? "Submitting..." : "Submit")

                    }
                </Button>
            </form>
        </Form>
    );
}
