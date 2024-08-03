// components/Header.jsx
import Link from "next/link"
// import { ClockIcon } from "./Icons"

export function Header() {
    return (
        <header className="px-4 lg:px-6 h-14 flex items-center">
            <Link href="#" className="flex items-center justify-center" prefetch={false}>
                {/* <ClockIcon className="h-6 w-6" /> */}
                <p className="font-bold text-xl">
                    evento
                </p>
                <span className="sr-only">Attendance Tracker</span>
            </Link>
            <nav className="ml-auto flex gap-4 sm:gap-6">
                {["Features", "Pricing", "About", "Contact"].map((item) => (
                    <Link key={item} href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                        {item}
                    </Link>
                ))}
            </nav>
        </header>
    )
}