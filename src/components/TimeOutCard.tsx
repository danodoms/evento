import type { AttendanceRecord } from "@/models/Attendance";
import { LogOut, UserRound } from "lucide-react"; // Adjust imports as needed
import type React from "react";

interface Props {
	result: AttendanceRecord; // Define prop 'result' of type AttendanceRecord
}

const TimeOutCard: React.FC<Props> = ({ result }) => (
	<div
		className={`flex justify-between gap-4 items-center border-1 border-solid rounded-md relative p-2`}
	>
		<div className="bg-red-500 w-2 flex-initial h-14 opacity-50 rounded-md">

		</div>

		<div className="flex gap-2 w-full flex-col ">

			<div className="flex gap-4 items-center">
				<UserRound />
				<div className="flex flex-col">
					<div className="text-normal font-medium">{result.student.name}</div>
					<div className="text-xs font-extralight">
						{result.student.school_id}
					</div>
				</div>
				<div className="p-2 items-center flex flex-col ml-auto">
					<p className="font-bold">{result.time_out}</p>
					<p className="text-xs flex font-semibold gap-1 items-center opacity-50">
						<LogOut className="size-3" />
						TIME OUT
					</p>

				</div>
			</div>


		</div>

	</div>
);

export default TimeOutCard;
