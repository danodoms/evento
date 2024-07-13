import type { QueuedAttendance } from "@/models/Attendance";
import { create } from "zustand";

// In-memory unique ID counter
let uniqueIdCounter = 0;

interface QueuedAttendanceState {
	attendanceQueue: QueuedAttendance[];
	addAttendanceQueue: (
		queuedAttendance: Omit<QueuedAttendance, "uniqueId">,
	) => void;
	removeAttendanceFromQueue: (uniqueId: number) => void;

	setAttendanceQueue: (attendanceQueue: QueuedAttendance[]) => void;
	markAttendanceAsPerformed: (uniqueId: number) => void;
}

const useQueuedAttendanceStore = create<QueuedAttendanceState>((set) => ({
	attendanceQueue: [],
	addAttendanceQueue: (queuedAttendance) =>
		set((state) => {
			const newAttendance = {
				...queuedAttendance,
				uniqueId: uniqueIdCounter++,
			};
			console.log(
				"ATTENDANCE QUEUE VALUES: ",
				useQueuedAttendanceStore.getState().attendanceQueue,
			); // Log the new value

			return {
				attendanceQueue: [newAttendance, ...state.attendanceQueue],
			};
		}),

	removeAttendanceFromQueue: (uniqueId: number) =>
		set((state) => ({
			attendanceQueue: state.attendanceQueue.filter(
				(item) => item.uniqueId !== uniqueId,
			),
		})),

	setAttendanceQueue: (attendanceQueue: QueuedAttendance[]) =>
		set({ attendanceQueue }),

	markAttendanceAsPerformed: (uniqueId: number) =>
		set((state) => ({
			attendanceQueue: state.attendanceQueue.map((item) =>
				item.uniqueId === uniqueId ? { ...item, performed: true } : item,
			),
		})),
}));

export default useQueuedAttendanceStore;
