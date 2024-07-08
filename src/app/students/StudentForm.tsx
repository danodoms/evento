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
import { addStudent } from "@/models/Student";
import { ToastContainer, toast } from "react-toastify";

const formSchema = studentSchema;




export function StudentForm() {

    const { data: departments = [], error, isLoading } = useQuery<Department[]>({
        queryKey: ["departments"],
        queryFn: getDepartments,
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            school_id: "",
            name: "",
            dept_id: "0",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);


        // if (values.school_id === "") {
        //     toast.error("School ID is required");
        //     return;
        // }

        //add the student to database from the values
        await addStudent({
            school_id: values.school_id,
            name: values.name,
            dept_id: null,
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
                        form.formState.isSubmitting ? "Submitting..." : "Submit"
                    }
                </Button>
            </form>
        </Form>
    );
}
