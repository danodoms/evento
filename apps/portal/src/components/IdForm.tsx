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
import { Info, QrCode, UserRound } from "lucide-react";
import { Department } from "@repo/models/Department";

import { useRef, useState } from "react";
import { departments } from "@/departments"



// const departments: Department[] = [
//     {
//         id: 1,
//         created_at: null,
//         short_name: "BSIT",
//         name: "Bachelor of Science in Information Technology"
//     },
//     {
//         id: 2,
//         created_at: null,
//         short_name: "BSBA",
//         name: "Bachelor of Science in Business Administration"
//     },
//     {
//         id: 3,
//         created_at: null,
//         short_name: "BSA",
//         name: "Bachelor of Science in Agriculture"
//     },
//     {
//         id: 4,
//         created_at: null,
//         short_name: "BTLED",
//         name: "Bachelor of Science in Technological Education"
//     }
// ];


// Define the form schema type
type FormSchemaType = z.infer<typeof IdSchema>;

// Define the props for IdForm component
interface IdFormProps {
    setId: React.Dispatch<React.SetStateAction<string>>;
    setFirstName: React.Dispatch<React.SetStateAction<string>>;
    setLastName: React.Dispatch<React.SetStateAction<string>>;
    setDept: React.Dispatch<React.SetStateAction<string>>;
    setPhoto: React.Dispatch<React.SetStateAction<File | null>>;

}

export function IdForm({ setFirstName, setLastName, setId, setDept, setPhoto }: IdFormProps) {
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(IdSchema),
    });

    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    async function onSubmit(values: FormSchemaType) {
        console.log(values);
        setId(values.school_id);
        setFirstName(values.firstName.trim())
        setLastName(values.lastName.trim())
        setDept(values.department.trim());
        setPhoto(selectedImage);
    }




    return (
        <Form {...form}>



            <form onSubmit={form.handleSubmit(onSubmit)} className="min-w-96 p-8 rounded-md flex gap-4 flex-col ">

                <h1 className="text-2xl max-w-2xl tracking-tighter  font-regular mb-4 flex justify-center gap-2 items-center">

                    <QrCode className="size-8" />
                    Generate QR Code

                </h1>
                <FormField
                    control={form.control}
                    name="school_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ID Number</FormLabel>
                            <FormControl>
                                <Input placeholder="ex. 1234-5678" {...field} />
                            </FormControl>
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
                            <FormLabel>First Name</FormLabel>
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
                            <FormLabel>Last Name</FormLabel>
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



                {/* Image Upload Section */}
                {/* <div className="flex items-center space-x-4">
                    <Avatar className="w-20 h-20">
                        {previewUrl ? (
                            <AvatarImage src={previewUrl} alt="Profile preview" />
                        ) : (
                            <AvatarFallback>Upload</AvatarFallback>
                        )}
                    </Avatar>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        className="hidden"
                    />

                  
                    <Button type="button" onClick={() => fileInputRef.current?.click()}>
                        Choose Photo
                    </Button>
                </div> */}


                {/* Image Upload */}
                {/* <FormField
                    control={form.control}
                    name="profilePhoto"
                    render={() => (
                        <FormItem>
                            <FormLabel>Profile Photo</FormLabel>
                            <FormControl>
                                <div className="flex items-center space-x-4">
                                    <Avatar className="w-20 h-20">
                                        {previewUrl ? (
                                            <AvatarImage src={previewUrl} alt="Profile preview" />
                                        ) : (
                                            <AvatarFallback>No Image</AvatarFallback>
                                        )}
                                    </Avatar>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        ref={fileInputRef}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage>
                                {form.formState.errors.profilePhoto && (
                                    <p>{form.formState.errors.profilePhoto.message}</p>
                                )}
                            </FormMessage>
                        </FormItem>
                    )}
                /> */}


                {/* {selectedImage ? (
                    <div className="md:max-w-[200px]">
                        <img
                            src={URL.createObjectURL(selectedImage)}
                            alt="Selected"
                        />
                    </div>
                ) : (
                    <div className="inline-flex items-center justify-between">
                        <div className="p-3 bg-slate-200  justify-center items-center flex">
                          
                        </div>
                    </div>
                )} */}





                <FormField
                    control={form.control}
                    name="profilePhoto"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Profile Photo</FormLabel>
                            <FormControl>
                                {/* <Button size="lg" type="button"> */}

                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-4 justify-center">
                                        <Avatar className="w-20 h-20">
                                            {selectedImage ? (
                                                <AvatarImage src={URL.createObjectURL(selectedImage)} alt="Profile preview" />
                                            ) : (
                                                <AvatarFallback>
                                                    <UserRound className="size-8" />
                                                </AvatarFallback>
                                            )}
                                        </Avatar>
                                    </div>

                                    <Input
                                        type="file"
                                        className="mouse-pointer"
                                        id="fileInput"
                                        accept="image/*"
                                        onBlur={field.onBlur}
                                        name={field.name}
                                        onChange={(e) => {
                                            field.onChange(e.target.files);
                                            setSelectedImage(e.target.files?.[0] || null);
                                        }}
                                        ref={field.ref}
                                    />


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
                            {/* <FormDescription>This is your public display email.</FormDescription> */}




                            <FormMessage />
                        </FormItem>
                    )}
                />










                <Button type="submit">Submit</Button>

                <p className="text-sm text-balance  leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center mb-8 flex gap-2 items-center justify-center">
                    <Info className="size-4" />
                    Ensure your ID Number is correct
                </p>

            </form>
        </Form>
    );
}
