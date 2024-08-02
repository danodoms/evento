"use client";

import { TextSearch } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';

import type { AttendanceRecord } from "@/models/Attendance";
import AttendanceCard from "@/components/AttendanceCard";

interface AttendanceQueueSectionProps {
	results: AttendanceRecord[];
}

const AttendanceQueueSection: React.FC<AttendanceQueueSectionProps> = ({
	results,
}) => {
	const [animatedResults, setAnimatedResults] = useState<(AttendanceRecord & { isNew?: boolean })[]>([]);

	useEffect(() => {
		const newResults = results.filter(result => !animatedResults.some(ar => ar.uniqueId === result.uniqueId));
		setAnimatedResults(prev => [
			...newResults.map(result => ({ ...result, isNew: true })),
			...prev.map(result => ({ ...result, isNew: false }))
		]);
	}, [results]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setAnimatedResults(prev => prev.map(result => ({ ...result, isNew: false })));
		}, 1000); // Duration of the animation

		return () => clearTimeout(timer);
	}, [animatedResults]);

	return (
		<>
			{animatedResults.length > 0 ? (
				<div className="h-full overflow-auto w-full rounded-md flex flex-col">
					<AnimatePresence>
						{animatedResults.map((result) => (
							<motion.div
								key={result.uniqueId}
								initial={{ opacity: 0, x: -100 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -100 }}
								transition={{ duration: 0.3 }}
							>
								<div className={result.isNew ? 'animate-flash' : ''}>
									<AttendanceCard key={result.uniqueId} result={result} />
								</div>
							</motion.div>
						))}
					</AnimatePresence>
				</div>
			) : (
				<div className="flex gap-2 items-center justify-center opacity-50 h-full">
					<h4 className="text-sm font-medium leading-none text-center flex items-center gap-2">
						<TextSearch className="size-5" />
						Scan results will display here
					</h4>
				</div>
			)}
		</>
	);
};

export default AttendanceQueueSection;