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
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/2 p-8 bg-muted rounded-md flex gap-4 flex-col">
                <FormField
                    control={form.control}
                    name="school_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>School ID</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter School ID" {...field} />
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
                <Button type="submit">Generate ID</Button>
            </form>
        </Form>
    );
}
