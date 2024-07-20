"use client";

import { CalendarFold, House, Lock, Scan, QrCode, UsersRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { unknown } from "zod";
import { ModeToggle } from "./ModeToggle";
import { useAuth } from "@/hooks/useAuth";

export default function BottomNav() {
	const pathname = usePathname();
	const [activeLink, setActiveLink] = useState("");

	const { currentUserRole } = useAuth()

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
			} else if (pathname === "/admin") {
				setActiveLink("admin");
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
			<nav className="w-full z-50">
				{/* <nav className="fixed bottom-0 w-full bg-background border-t z-50"> */}
				<div className="max-w-lg mx-auto flex justify-around items-center px-2 pt-2 pb-1">
					<Link href="/" className={linkClasses("home")}>
						<House size={24} />
						<span className="text-xs  scale-75 tracking-wider font-semibold">Home</span>
					</Link>

					<Link href="/students" className={linkClasses("students")}>
						<UsersRound size={24} />
						<span className="text-xs  scale-75 tracking-wider font-semibold">Students</span>
					</Link>


					<Link href="/scan" className={linkClasses("scan")}>
						<QrCode size={24} />
						<span className="text-xs scale-75 tracking-wider font-semibold">Scan</span>
					</Link>

					<Link href="/events" className={linkClasses("events")}>
						<CalendarFold size={24} />
						<span className="text-xs scale-75 tracking-wider font-semibold">Events</span>
					</Link>

					{currentUserRole === "ADMIN" &&
						<Link href="/admin" className={linkClasses("admin")}>
							<Lock size={24} />
							<span className="text-xs scale-75 tracking-wider font-semibold">Manage</span>
						</Link>
					}
				</div>
			</nav>
		);
	}
}
