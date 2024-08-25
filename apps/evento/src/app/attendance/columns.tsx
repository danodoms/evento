"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { AttendanceRecord } from "@repo/models/Attendance";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Payment = {
//     id: string
//     amount: number
//     status: "pending" | "processing" | "success" | "failed"
//     email: string
// }

export const columns: ColumnDef<AttendanceRecord>[] = [
	// {
	//     id: "select",
	//     header: ({ table }) => (
	//         <Checkbox
	//             checked={
	//                 table.getIsAllPageRowsSelected() ||
	//                 (table.getIsSomePageRowsSelected() && "indeterminate")
	//             }
	//             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
	//             aria-label="Select all"
	//         />
	//     ),
	//     cell: ({ row }) => (
	//         <Checkbox
	//             checked={row.getIsSelected()}
	//             onCheckedChange={(value) => row.toggleSelected(!!value)}
	//             aria-label="Select row"
	//         />
	//     ),
	//     enableSorting: false,
	//     enableHiding: false,
	// },

	{
		header: "Name",
		accessorKey: "student.name",
	},
	{
		accessorKey: "student.school_id",
		header: "ID Number",
	},

	{
		accessorKey: "date",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="mr-auto"
				>
					Date
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		header: "Time in",
		accessorKey: "time_in",
	},
	{
		header: "Time out",
		accessorKey: "time_out",
	},
	// {
	//     accessorKey: "email",
	//     header: ({ column }) => {
	//         return (
	//             <Button
	//                 variant="ghost"
	//                 onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
	//             >
	//                 Email
	//                 <ArrowUpDown className="ml-2 h-4 w-4" />
	//             </Button>
	//         )
	//     },
	// },

	// {
	//     accessorKey: "amount",
	//     header: () => <div className="text-right">Amount</div>,
	//     cell: ({ row }) => {
	//         const amount = parseFloat(row.getValue("amount"))
	//         const formatted = new Intl.NumberFormat("en-US", {
	//             style: "currency",
	//             currency: "USD",
	//         }).format(amount)

	//         return <div className="text-right font-medium">{formatted}</div>
	//     },
	// },
	// {
	//     id: "actions",
	//     cell: ({ row }) => {
	//         const payment = row.original

	//         return (
	//             <DropdownMenu>
	//                 <DropdownMenuTrigger asChild>
	//                     <Button variant="ghost" className="h-8 w-8 p-0">
	//                         <span className="sr-only">Open menu</span>
	//                         <MoreHorizontal className="h-4 w-4" />
	//                     </Button>
	//                 </DropdownMenuTrigger>
	//                 <DropdownMenuContent align="end">
	//                     <DropdownMenuLabel>Actions</DropdownMenuLabel>
	//                     <DropdownMenuItem
	//                         onClick={() => navigator.clipboard.writeText(payment.id)}
	//                     >
	//                         Copy payment ID
	//                     </DropdownMenuItem>
	//                     <DropdownMenuSeparator />
	//                     <DropdownMenuItem>View customer</DropdownMenuItem>
	//                     <DropdownMenuItem>View payment details</DropdownMenuItem>
	//                 </DropdownMenuContent>
	//             </DropdownMenu>
	//         )
	//     },
	// },
];
