import { Progress } from "@/components/ui/progress";
import {
	type QueuedAttendance,
	pushQueuedAttendanceRecord,
} from "@/models/Attendance";
import useQueuedAttendanceStore from "@/store/useQueuedAttendanceStore";
import { Item } from "@radix-ui/react-dropdown-menu";
import { UserRound, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../components/ui/button";

export function AttendanceQueueCard(result: QueuedAttendance) {
	// if (result.performed) {
	//     return
	// }

	const { removeAttendanceFromQueue, markAttendanceAsPerformed } =
		useQueuedAttendanceStore();

	const [cancel, setCancel] = useState(false);
	const [progress, setProgress] = useState(0);
	const [startTime, setStartTime] = useState(performance.now());
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	// Function to process each queue item independently with a delay
	const processQueueItem = async (item: QueuedAttendance) => {
		timeoutRef.current = setTimeout(async () => {
			if (!cancel) {
				await pushQueuedAttendanceRecord(item);
				removeAttendanceFromQueue(item.uniqueId);
				// markAttendanceAsPerformed(item.uniqueId)
			}
		}, 7000); // 7 seconds delay
	};

	useEffect(() => {
		processQueueItem(result);

		// Clean up the timeout when the component unmounts or when cancel is set
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [cancel]);

	const handleCancel = () => {
		setCancel(true);
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		removeAttendanceFromQueue(result.uniqueId);
		//markAttendanceAsPerformed(result.uniqueId)

		console.log("Cancelled");
	};

	useEffect(() => {
		const animate = (timestamp: any) => {
			const deltaTime = timestamp - startTime; // Time passed since animation started
			const duration = 7000; // 7 seconds in milliseconds
			const newProgress = Math.min(
				100,
				Math.floor((deltaTime / duration) * 100),
			);

			setProgress(newProgress);

			if (newProgress < 100) {
				requestAnimationFrame(animate); // Continue animation until progress reaches 1
			}
		};

		requestAnimationFrame(animate); // Start animation

		return () => {}; // No cleanup needed for requestAnimationFrame
	}, [startTime]);

	return (
		<div
			className={`flex justify-between gap-4 items-center border-1 border-solid border rounded-md relative ${result.time_out ? "bg-destructive" : ""}`}
		>
			<div className="flex gap-2 w-full flex-col p-4">
				<div className="flex gap-4 items-center">
					<UserRound />
					<div className="flex flex-col">
						<div className="text-normal font-medium">{result.student.name}</div>
						<div className="text-xs font-extralight">
							{result.student.school_id}
						</div>
					</div>
					<div className="ml-auto flex gap-4 items-center ">
						{!result.time_out ? (
							<div className="p-2 items-center flex flex-col">
								<p className="text-xs">TIMED IN</p>
								<p className="font-bold">{result.time_in}</p>
							</div>
						) : (
							<div className="p-2 items-center flex flex-col">
								<p className="text-xs">TIMED OUT</p>
								<p className="font-bold">{result.time_out}</p>
							</div>
						)}
						<Button
							className="z-10 flex gap-2"
							variant="ghost"
							onClick={handleCancel}
						>
							<X />
						</Button>
					</div>
				</div>
			</div>
			<Progress
				value={progress}
				className="w-full h-full absolute opacity-5 p-0 m-0 rounded-md"
			/>
		</div>
	);
}
