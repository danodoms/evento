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

export default function FeaturesCarousel() {

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


    return (
        <Carousel >
            <CarouselContent>
                {features.map((feature, index) => (
                    <CarouselItem key={index}>

                        <Card className="bg-primary opacity-95 text-background  border-0 outline-0 drop-shadow-none">
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
    )
}
