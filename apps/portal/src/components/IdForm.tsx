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
import { zodResolver } from "@hookform/resolvers/zod";
import { IdSchema } from "@/schemas/IdSchema";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Info, QrCode } from "lucide-react";

// Define the form schema type
type FormSchemaType = z.infer<typeof IdSchema>;

// Define the props for IdForm component
interface IdFormProps {
    setName: React.Dispatch<React.SetStateAction<string>>;
    setId: React.Dispatch<React.SetStateAction<string>>;

}

export function IdForm({ setName, setId }: IdFormProps) {
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(IdSchema),
    });

    async function onSubmit(values: FormSchemaType) {
        console.log(values);
        setName(values.name);
        setId(values.school_id);

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
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter Name" {...field} />
                            </FormControl>
                            <FormMessage>
                                {form.formState.errors.name && (
                                    <p>{form.formState.errors.name.message}</p>
                                )}
                            </FormMessage>
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>


                <p className="text-sm text-balance  leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center mb-8 flex gap-2 items-center justify-center">
                    <Info className="size-4" />
                    Ensure your ID is correct
                </p>
            </form>
        </Form>
    );
}
