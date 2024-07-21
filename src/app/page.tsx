// "use client"


import { Separator } from "@/components/ui/separator";
import { appName } from "@/config";
import {

	Heart,
	QrCode,
	Map,
	RotateCw,

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

	// const {
	// 	data: users = [],
	// 	error,
	// 	isLoading,
	// } = useQuery<User[]>({
	// 	queryKey: ["users"],
	// 	queryFn: getAllUsers,
	// });

	// const { isLoaded, isSignedIn, user } = useUser();
	// const { signOut } = useClerk();

	// if (isLoaded && users.length !== 0) {
	// 	const emailExists = (users: User[], email: string): boolean => {
	// 		return users.some(user => user.email === email && user.is_active);
	// 	};

	// 	if (emailExists(users, String(user?.primaryEmailAddress))) {
	// 		console.log("EMAIL IS AUTHORIZED");
	// 		console.log("EMAIL IS AUTHORIZED");
	// 		console.log("EMAIL IS AUTHORIZED");
	// 	} else {
	// 		console.log("EMAIL IS UNAUTHORIZED");
	// 		console.log("EMAIL IS UNAUTHORIZED");
	// 		console.log("EMAIL IS UNAUTHORIZED");
	// 		signOut({ redirectUrl: '/' });
	// 	}
	// }



	return (
		<section className="flex flex-col p-2 gap-3 rounded-md ">
			{/* TOP SECTION */}

			<div className="flex justify-between items-center gap-4 mb-8 lg:hidden  bg-opacity-80">
				<div className="flex gap-2 items-center">
					<h1 className="font-bold text-xl text-pretty">{appName}</h1>
					<div className="opacity-50">
						<ModeToggle compactMode={true} />
					</div>
				</div>


				<Account />
			</div>



			<div className="flex flex-col ">
				<h2 className="text-4xl text-pretty  font-bold items-center gap-2">
					Home
				</h2>
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

			<div className="font-semibold text-pretty flex items-center text-sm mt-2 gap-2">
				<Map className="size-5" />
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
