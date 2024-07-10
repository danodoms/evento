import { House, HouseIcon, Scan, History, GanttChart, UsersRound, CalendarFold, GanttChartIcon } from "lucide-react"
import Link from "next/link"
import { ModeToggle } from "./ModeToggle"

export default function BottomNav() {
    return (
        <nav className="fixed bottom-0 w-full bg-background border-t z-100">
            <div className="max-w-lg mx-auto flex justify-around items-center p-3">

                <Link href="/" className="button flex flex-col items-centerfocus:outline-none">
                    <House />

                </Link>

                {/* <Link href="/attendance" className="button flex flex-col items-center  focus:outline-none">
                    <GanttChart />

                </Link> */}

                <Link href="/scan" className="button flex flex-col items-center  focus:outline-none">
                    <Scan />

                </Link>


                <Link href="/students" className="button flex flex-col items-center  focus:outline-none">
                    <UsersRound />

                </Link>


                <Link href="/events" className="button flex flex-col items-center  focus:outline-none">
                    <CalendarFold />

                </Link>



                {/* <Link href="/history" className="button flex flex-col items-center  focus:outline-none">
                    <History />
                </Link> */}
                <div className="p-0">
                    <ModeToggle />
                </div>


            </div>
        </nav>
    )
}