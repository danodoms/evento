"use client"


import { Separator } from "@/components/ui/separator";
import { appName } from "@/config";
import {

	Heart,
	QrCode,
	Map,
	RotateCw,
	UsersRound,
	CalendarFold,

} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import AttendanceHistory from "./history/AttendanceHistory";
import Account from "@/components/Account";
import { getAllUsers, User } from "@/models/User";
import { useQuery } from "@tanstack/react-query";
import { useClerk, useUser } from "@clerk/nextjs";
import FeaturesCarousel from "@/components/FeaturesCarousel";
import { ModeToggle } from "@/components/ModeToggle";
import { getStudentRowCount } from "@/models/Student";
import { getEventRowCount } from "@/models/Event";


export default function Home() {

	const {
		data: studentsRowCount = 0,
		error,
		isLoading,
	} = useQuery<number>({
		queryKey: ["studentsCount"],
		queryFn: getStudentRowCount,
	});


	const {
		data: eventsRowCount = 0,
		// error,
		// isLoading,
	} = useQuery<number>({
		queryKey: ["eventsCount"],
		queryFn: getEventRowCount,
	});


	return (
		<section className="flex flex-col p-2 gap-3 rounded-md ">
			{/* TOP SECTION */}

			<div className="flex justify-between items-center gap-4 mb-8 lg:hidden  bg-opacity-80">
				<div className="flex gap-2 items-center">
					<h1 className="font-bold text-xl text-pretty">{appName}</h1>
					<div className="opacity-50 scale-90">
						<ModeToggle compactMode={true} />
					</div>
				</div>


				<Account />
			</div>



			<div className="flex justify-between items-center">
				<h2 className="text-4xl text-pretty  font-bold items-center gap-2">
					Home
				</h2>

				<div className="flex gap-2">
					<div className="flex-col flex ">
						<p className="font-bold text-right flex gap-2 items-center py-2 px-3  bg-neutral-500 bg-opacity-10 rounded-md">
							<UsersRound className="size-4" />
							{studentsRowCount}
						</p>
						{/* <p className="text-xs font-semibold text-center py-1 px-3  rounded-b-md bg-neutral-500 bg-opacity-10">
							Students
						</p> */}

					</div>
					<div className="flex-col flex ">

						<p className="font-bold text-right flex gap-2 items-center py-2 px-3  bg-neutral-500 bg-opacity-10 rounded-md">
							<CalendarFold className="size-4" />
							{eventsRowCount}
						</p>
						{/* <p className="text-xs font-semibold text-center py-1 px-3  rounded-b-md bg-neutral-500 bg-opacity-10">
							Events
						</p> */}

					</div>
				</div>


			</div>



			<div className="font-semibold text-pretty flex items-center text-sm mt-2 gap-2">
				<Map className="size-5" />
				<span>Explore Features</span>
			</div>

			<FeaturesCarousel />





			<div className="flex justify-between">



				<div className="font-semibold text-pretty flex items-center text-sm mt-2 gap-2">
					<QrCode className="size-5" />
					<span>Recent Scan Results</span>
				</div>

				<div className="font-semibold text-pretty opacity-50 flex items-center text-sm mt-2 gap-2">
					<RotateCw className="size-5" />
					Refresh
				</div>
			</div>



			<div className="overflow-auto flex-1 max-h-96 rounded-lg">
				<AttendanceHistory />
			</div>
		</section >
	);
}
