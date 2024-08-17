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
import { userSchema } from "@/schemas/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { type User, updateUser, addUser } from "@repo/models/User";
import { ToastContainer, toast } from "react-toastify";

const formSchema = userSchema;

type UserFormProps = {
    user?: User;
    handleClose?: () => void;
    handleError?: (message: string) => void;
};

export function UserForm({ user, handleClose, handleError }: UserFormProps) {


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: user
            ? {
                email: user.email,
                role: String(user.role),
            }
            : {
                email: "",
                role: "",
            },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);


        //UPDATE THE USER
        if (user) {
            await updateUser({
                id: user.id,
                is_active: user.is_active,
                email: values.email,
                role: Number(values.role)
            })
                .then((student) => {
                    // if (student === "SCHOOL_ID_EXISTS") {
                    //     console.log("School ID already exists");
                    //     handleError?.("School ID already in use");
                    // } else {
                    //     console.log("Student updated successfully");
                    //     form.reset();
                    //     handleClose?.()
                    // }

                    console.log("User updated successfully");
                    form.reset();
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


        //ADD THE USER
        await addUser({
            email: values.email,
            role: Number(values.role),
        })
            .then((user) => {
                // if (student === "SCHOOL_ID_EXISTS") {
                //     console.log("School ID already exists");
                //     toast.error("School ID already in use");
                // } else {
                //     console.log("Student added successfully");
                //     toast.success("Student added successfully");
                //     form.reset();
                //     handleClose?.()
                // }

                console.log("User added successfully");
                toast.success("User added successfully");
                form.reset();
                handleClose?.()
            })
            .catch((error) => {
                toast.error("Error adding user");
                console.error("Error adding user:", error);
                handleError?.("Error adding user");
            });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter email" {...field} />
                            </FormControl>
                            {form.formState.errors.email && (
                                <FormMessage>
                                    {form.formState.errors.email.message}
                                </FormMessage>
                            )}
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value.toString()}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Roles</SelectLabel>
                                            <SelectItem value="2">Representative</SelectItem>
                                            <SelectItem value="1">Officer</SelectItem>
                                            <SelectItem value="0">Admin</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            {form.formState.errors.role && (
                                <FormMessage>
                                    {form.formState.errors.role.message}
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
                    {user
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
