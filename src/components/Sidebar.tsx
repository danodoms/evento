"use client";

import Link from "next/link";
import { CalendarFold, House, Scan, UsersRound } from "lucide-react";
import { Separator } from "./ui/separator";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Account from "./Account";


export default function Sidebar() {

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
        ${activeLink === link ? "bg-neutral-500 bg-opacity-20 opacity-100" : "opacity-70"}
       p-3 rounded-lg hover:bg-neutral-500 hover:bg-opacity-20 transition-all font-semibold w-full flex gap-3 items-center text-md
    `;


    if (pathname !== "/sign-in") {
        return (
            <nav className="border-r p-3 flex-col flex gap-1 h-full w-72">
                <p className="font-bold text-2xl p-3">
                    evento
                </p>

                <div className="p-3 mb-2 rounded-lg items-center hover:bg-neutral-500 hover:bg-opacity-20 flex">
                    <Account />
                </div>

                {/* <Separator className="" /> */}

                <Link href="/" className={linkClasses("home")}>
                    <House className="size-5" />Home
                </Link>

                <Link href="/students" className={linkClasses("students")}>
                    <UsersRound className="size-5" />Students
                </Link>

                <Link href="/events" className={linkClasses("events")}>
                    <CalendarFold className="size-5" />Events
                </Link>

                <Link href="/scan" className={linkClasses("scan")}>
                    <Scan className="size-5" />Scan
                </Link>



                {/* 
                <Link href="/scan" className="p-3 rounded-lg hover:bg-neutral-500 hover:bg-opacity-20 transition-all font-semibold w-full flex gap-2">
                    <Scan />Departments
                </Link> */}
            </nav>
        )
    }

    return (<nav></nav>)

}