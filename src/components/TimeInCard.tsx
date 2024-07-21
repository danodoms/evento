import type { AttendanceRecord } from "@/models/Attendance";
import { LogIn, UserRound } from "lucide-react"; // Adjust imports as needed
import type React from "react";

interface Props {
	result: AttendanceRecord; // Define prop 'result' of type AttendanceRecord
}

const TimeInCard: React.FC<Props> = ({ result }) => (
	<div className="flex justify-between gap-4 items-center border-1 border-solid rounded-md relative  p-2">
		<div className="bg-green-500 w-2 flex-initial h-14 opacity-50 rounded-md">

		</div>
		<div className="flex gap-2 w-full flex-col">
			<div className="flex gap-4 items-center">
				<UserRound />
				<div className="flex flex-col">
					<div className="text-normal font-medium">{result.student.name}</div>
					<div className="text-xs font-extralight">
						{result.student.school_id}
					</div>
				</div>
				<div className="p-2 items-center flex flex-col ml-auto">
					<p className="font-bold">{result.time_in}</p>
					<p className="text-xs flex gap-1 font-semibold items-center opacity-50">
						<LogIn className="size-3" />
						TIME IN
					</p>

				</div>
			</div>
		</div>

	</div>
);

export default TimeInCard;
