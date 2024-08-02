import { ToastContainer } from "react-toastify";
import { EventForm } from "../EventForm";
import "react-toastify/dist/ReactToastify.css";

import { Calendar } from "lucide-react";
import Link from "next/link";

export default function AddEventPage() {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold tracking-tight">Add Event</h1>
				<Link
					href="/events"
					className="flex gap-2 items-center button font-semibold border p-2 rounded-lg"
				>
					<Calendar className="mr size-4" />
					View Events
				</Link>
			</div>

			<div className="gap-y-6">
				<EventForm />
			</div>

			<ToastContainer />
		</div>
	);
}
