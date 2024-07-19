"use client"


import { Separator } from "@/components/ui/separator";
import { appName } from "@/config";
import {

	Heart,
	QrCode,
	Map,

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

interface UiButton {
	name: string;
	iconName: React.ComponentType;
	link: string;
}


export default function Home() {

	const {
		data: users = [],
		error,
		isLoading,
	} = useQuery<User[]>({
		queryKey: ["users"],
		queryFn: getAllUsers,
	});

	const { isLoaded, isSignedIn, user } = useUser();
	const { signOut } = useClerk();

	if (isLoaded && users.length != 0) {
		const emailExists = (users: User[], email: string): boolean => {
			return users.some(user => user.email === email);
		};

		if (emailExists(users, String(user?.primaryEmailAddress))) {
			console.log("EMAIL IS AUTHORIZED")
			console.log("EMAIL IS AUTHORIZED")
			console.log("EMAIL IS AUTHORIZED")
		} else {
			console.log("EMAIL IS UNAUTHORIZED")
			console.log("EMAIL IS UNAUTHORIZED")
			console.log("EMAIL IS UNAUTHORIZED")
			signOut({ redirectUrl: '/' })
		}
	}



	return (
		<section className="flex flex-col gap-4 p-2">
			{/* TOP SECTION */}

			<div className="flex justify-between items-center gap-4 mb-8 lg:hidden">
				<div className="flex gap-2 items-center">
					<h1 className="font-bold text-xl text-pretty">{appName}</h1>
					<div className="opacity-50">
						<ModeToggle compactMode={true} />
					</div>
				</div>


				<Account />
			</div>



			<div className="flex flex-col gap-2 rounded-lg -">
				<h2 className="text-4xl text-pretty  font-bold items-center gap-2">
					Home
					{/* <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-blue-500">
						{" "}
						{appName}
					</span> */}
					<div className="w-full leading-relaxed rounded-md font-normal flex justify-between text-sm pt-1 mb-2 ">
						Streamlining university events for students.
					</div>
				</h2>

				{/* <Separator /> */}

				<div className="w-full leading-relaxed rounded-md flex justify-between text-xs opacity-70 text-balance">
					An internal web app for Davao Oriental State University Banaybanay
					Campus Student Council.
				</div>

				<div className="flex text-xs font-normal gap-1 opacity-50 pt-1 rounded-md items-center">
					made with
					<Heart className="size-3" />
					by
					<a
						href="https://danodoms.vercel.app"
						target="_blank"
						className="underline"
						rel="noreferrer"
					>
						danodoms
					</a>
				</div>
			</div>



			{/* <div className="flex flex-col gap-2 p-4 border rounded-lg">
				<div className="font-semibold text-md text-pretty flex items-center gap-2">
					Dashboard
				</div>

				<div className="w-full rounded-md p-4 flex justify-between border">
					<p>No Upcoming Event</p>

					<CalendarX />
				</div>
			</div> */}

			<div className="font-semibold text-pretty flex items-center gap-2">
				<Map />
				<span>Explore Features</span>
			</div>

			<FeaturesCarousel />



			{/* BOTTOM SECTION */}
			{/* <div className="gap-4 flex flex-col grid-cols-2 md:grid">

        {buttons.map((button, index) => (
          <Link href={button.link} key={index} className="w-full p-8 flex justify-center gap-2 border rounded-lg bg-card text-card-foreground shadow-sm">
            {React.createElement(button.iconName)}
            <p className="font-semibold">
              {button.name}
            </p>
          </Link>
        ))}
      </div> */}

			<div className="font-semibold text-pretty flex items-center gap-2">
				<QrCode />

				<span>Recent Scan Results</span>
			</div>

			<div className="overflow-auto max-h-96 overflow-y-auto rounded-lg">
				<AttendanceHistory />
			</div>
		</section >
	);
}
