import { Separator } from "@/components/ui/separator";
import { appName } from "@/config";
import {
	Asterisk,
	CalendarFold,
	CalendarX,
	GanttChart,
	GanttChartIcon,
	Heart,
	Scan,
	UserRoundPlus,
	UsersRound,
	QrCode,
	Map,
	ArrowRight,
	FlaskConical,
	Circle,
	Badge,
	BadgeCheck,
	CircleCheckBig
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel"


// import { Badge } from "@/components/ui/badge";
import AttendanceHistory from "./history/AttendanceHistory";

interface UiButton {
	name: string;
	iconName: React.ComponentType;
	link: string;
}

const buttons: UiButton[] = [
	{
		name: "Attendance",
		iconName: GanttChart,
		link: "/attendance",
	},
	{
		name: "Students",
		iconName: UsersRound,
		link: "/students",
	},
	{
		name: "Events",
		iconName: CalendarFold,
		link: "/events",
	},
];

const features = [
	{
		name: "Attendance Tracking",
		iconName: GanttChartIcon,
		description: "Track attendance and participation",
	},
	{
		name: "QR Code Scanning",
		iconName: QrCode,
		description: "Scan QR codes to mark attendance",
	},
	{
		name: "Student Management",
		iconName: UsersRound,
		description: "Manage student information",
	},
	{
		name: "Event Report Generation",
		iconName: CalendarX,
		description: "Export event attendance reports",
	},
];

export default function Home() {
	return (
		<section className="flex flex-col gap-4 p-2">
			{/* TOP SECTION */}

			<div className="flex justify-between items-center gap-4 mb-8 lg:hidden">
				<h1 className="font-bold text-xl text-pretty">{appName}</h1>
				<Avatar>
					<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
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

			<Carousel className="w-full ">
				<CarouselContent>
					{features.map((feature, index) => (
						<CarouselItem key={index}>

							<Card className="bg-primary opacity-95 text-background ">
								<CardHeader>
									<CardTitle className="flex gap-2 items-center">{feature.name} 	<CircleCheckBig className="size-5 " /></CardTitle>
									<CardDescription>{feature.description}</CardDescription>

								</CardHeader>
								{/* <CardContent>

								</CardContent> */}
								<CardFooter className="flex gap-1 items-center opacity-50 ">
									{/* <Button className="w-full">
										<Check className="mr-2 h-4 w-4" /> Mark all as read
									</Button> */}
									<p className="text-xs">Swipe right to reveal more features </p>
									<ArrowRight className="size-4" />
								</CardFooter>
							</Card>

						</CarouselItem>
					))}
				</CarouselContent>
				{/* <CarouselPrevious />
				<CarouselNext /> */}
			</Carousel>



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

			<div className="overflow-auto h-80 rounded-lg">
				<AttendanceHistory />
			</div>
		</section >
	);
}
