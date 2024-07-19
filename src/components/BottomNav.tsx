"use client";

import { CalendarFold, House, Lock, Scan, UsersRound } from "lucide-react";
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
			<nav className="w-full bg-background border-t z-50">
				{/* <nav className="fixed bottom-0 w-full bg-background border-t z-50"> */}
				<div className="max-w-lg mx-auto flex justify-around items-center p-2">
					<Link href="/" className={linkClasses("home")}>
						<House size={24} />
						<span className="text-xs  scale-75 tracking-wider">Home</span>
					</Link>
					<Link href="/students" className={linkClasses("students")}>
						<UsersRound size={24} />
						<span className="text-xs  scale-75 tracking-wider">Students</span>
					</Link>
					<Link href="/scan" className={linkClasses("scan")}>
						<Scan size={24} />
						<span className="text-xs scale-75 tracking-wider">Scan</span>
					</Link>

					<Link href="/events" className={linkClasses("events")}>
						<CalendarFold size={24} />
						<span className="text-xs scale-75 tracking-wider">Events</span>
					</Link>

					<Link href="/admin" className={linkClasses("events")}>
						<Lock size={24} />
						<span className="text-xs scale-75 tracking-wider">Manage</span>
					</Link>
				</div>
			</nav>
		);
	}
}
