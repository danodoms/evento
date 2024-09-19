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

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { IdSchema } from "@/schemas/IdSchema";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Info, Pen, QrCode, Upload, UserRound } from "lucide-react";
import { Department } from "@repo/models/Department";

import { useCallback, useRef, useState } from "react";
import { departments } from "@/departments"
import Cropper from "react-easy-crop";
import { Slider } from "@/components/ui/slider";
import CropperDialog from "./CropperDialog";
import { useStudentStore } from "@/store/useStudentStore";


// Define the form schema type
type FormSchemaType = z.infer<typeof IdSchema>;


export function IdForm() {

    const { id, firstName, lastName, dept, photo, croppedPhoto, isEditing, setId, setFirstName, setLastName, setDept, setPhoto, setCroppedPhoto, setIsEditing } = useStudentStore();


    const form = useForm<FormSchemaType>({
        resolver: zodResolver(IdSchema),
        defaultValues: {
            school_id: id || '', // If `id` is not available, use an empty string as the default value
            firstName: firstName || '',
            lastName: lastName || '',
            department: dept || '',
            photo: photo,
        }
    });


    async function onSubmit(values: FormSchemaType) {
        console.log(values);
        setId(values.school_id);
        setFirstName(values.firstName.trim())
        setLastName(values.lastName.trim())
        setDept(values.department.trim());
        setPhoto(photo)

        setIsEditing(false)
    }




    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="min-w-96 p-8 rounded-md flex gap-4 flex-col ">
                <h1 className="text-2xl max-w-2xl tracking-tighter  font-regular mb-4 flex justify-center gap-2 items-center">
                    {/* <QrCode className="size-8" />
                    Generate QR Code */}
                </h1>

                <FormField
                    control={form.control}
                    name="photo"

                    render={({ field }) => (
                        <FormItem>
                            {/* <FormLabel>Profile Photo</FormLabel> */}
                            <FormControl>
                                {/* <Button size="lg" type="button"> */}

                                <div className="flex items-center flex-col gap-4">
                                    <div className="flex items-center justify-center flex-col  ">


                                        {/* <p className="">
                                            Profile Photo
                                        </p> */}

                                        <div className="relative">
                                            <Avatar className="size-32 outline">
                                                {croppedPhoto ? (
                                                    <AvatarImage src={croppedPhoto} alt="Profile preview" className="object-cover" />
                                                ) : photo ? (
                                                    <AvatarImage src={photo} alt="Profile preview" className="object-cover" />
                                                ) : (
                                                    <AvatarFallback>
                                                        <UserRound className="size-8" />
                                                    </AvatarFallback>
                                                )}

                                                {/* Pen Icon Floating Over the Avatar */}


                                            </Avatar>

                                            <label htmlFor="fileInput" className="absolute z-50 bottom-0 right-0 bg-primary rounded-full p-2  cursor-pointer transition-transform duration-150 ease-in-out hover:scale-110 active:scale-100">
                                                <Upload className="text-background" />
                                            </label>
                                        </div>



                                    </div>


                                    <div className="flex gap-2">
                                        {photo && (
                                            <CropperDialog />
                                        )}

                                        <Input
                                            id="fileInput"
                                            type="file"
                                            className="mouse-pointer w-full hidden"
                                            accept="image/*"
                                            multiple={false}
                                            onBlur={field.onBlur}
                                            name={field.name}

                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                field.onChange(e.target.files);

                                                if (file) {
                                                    const fileUrl = URL.createObjectURL(file);
                                                    setPhoto(fileUrl)
                                                    setCroppedPhoto(undefined)
                                                } else {
                                                    setPhoto(undefined);
                                                    setCroppedPhoto(undefined)
                                                }
                                            }}
                                            ref={field.ref}
                                        />
                                    </div>
                                </div>


                                {/* <label
                                        htmlFor="fileInput"
                                        className="bg-blue-500 hover:bg-blue-600 text-neutral-90  rounded-md cursor-pointer inline-flex items-center"
                                    >

                                        <span className="whitespace-nowrap">
                                            choose your image
                                        </span>
                                    </label> */}
                                {/* </Button> */}
                            </FormControl>
                            <FormMessage className="flex justify-center" />
                        </FormItem>
                    )}
                />


                <FormField
                    control={form.control}
                    name="school_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-normal text-sm">ID Number</FormLabel>

                            <FormControl>
                                <Input placeholder="ex. 1234-5678" {...field} />
                            </FormControl>

                            <FormDescription>
                                <p className="text-xs text-balance  leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center flex gap-2 items-center">
                                    <Info className="size-4" />
                                    Ensure your ID Number is correct
                                </p>
                            </FormDescription>
                            <FormMessage>
                                {form.formState.errors.school_id && (
                                    <p>{form.formState.errors.school_id.message}</p>
                                )}
                            </FormMessage>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-normal text-sm">First Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter first name" {...field} />
                            </FormControl>
                            <FormMessage>
                                {form.formState.errors.firstName && (
                                    <p>{form.formState.errors.firstName.message}</p>
                                )}
                            </FormMessage>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-normal text-sm">Last Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter last name" {...field} />
                            </FormControl>
                            <FormMessage>
                                {form.formState.errors.lastName && (
                                    <p>{form.formState.errors.lastName.message}</p>
                                )}
                            </FormMessage>
                        </FormItem>
                    )}
                />


                <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-normal text-sm">Department</FormLabel>
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
                                            {/* <SelectItem value="0">No Department</SelectItem> */}
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
                            <FormMessage>
                                {form.formState.errors.department && (
                                    <p>{form.formState.errors.department.message}</p>
                                )}
                            </FormMessage>
                        </FormItem>
                    )}
                />





                <Button type="submit" className="mt-4 flex gap-2">
                    <QrCode className="size-4" />
                    Generate QR Code
                </Button>

                {/* <p className="text-sm text-balance  leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center mb-8 flex gap-2 items-center justify-center">
                    <Info className="size-4" />
                    Ensure your ID Number is correct
                </p> */}



            </form>
        </Form>
    );
}
