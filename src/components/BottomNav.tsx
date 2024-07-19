"use client";

import { CalendarFold, House, Scan, UsersRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { unknown } from "zod";
import { ModeToggle } from "./ModeToggle";

export default function BottomNav() {
	const pathname = usePathname();
	const [activeLink, setActiveLink] = useState("");

	useEffect(() => {
		if (pathname) {
			if (pathname === "/") {
				setActiveLink("home");
			} else if (pathname === "/students") {
				setActiveLink("students");
			} else if (pathname === "/scan") {
				setActiveLink("scan");
			} else if (pathname === "/events") {
				setActiveLink("events");
			}
		}
	}, [pathname]);

	const linkClasses = (link: string) => `
        flex flex-col items-center  
        ${activeLink === link ? "opacity-100" : "opacity-50"}
        transition-all duration-125 ease-in-out hover:opacity-100
    `;
	if (pathname !== "/sign-in") {
		return (
			<nav className="fixed bottom-0 w-full bg-background border-t z-50">
				<div className="max-w-lg mx-auto flex justify-around items-center p-2">
					<Link href="/" className={linkClasses("home")}>
						<House size={24} />
						{/* <span className="text-xs mt-1">Home</span> */}
					</Link>
					<Link href="/students" className={linkClasses("students")}>
						<UsersRound size={24} />
						{/* <span className="text-xs mt-1">Students</span> */}
					</Link>
					<Link href="/scan" className={linkClasses("scan")}>
						<Scan size={24} />
						{/* <span className="text-xs mt-1">Scan</span> */}
					</Link>
					<Link href="/events" className={linkClasses("events")}>
						<CalendarFold size={24} />
						{/* <span className="text-xs mt-1">Events</span> */}
					</Link>
					<div className="opacity-50 hover:opacity-100 transition-opacity duration-200 w-6">
						<ModeToggle compactMode={true} />
					</div>
				</div>
			</nav>
		);
	}
}
