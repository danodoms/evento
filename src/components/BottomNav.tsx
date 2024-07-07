import { House, Scan, History } from "lucide-react"
import Link from "next/link"


export default function BottomNav() {
    return (
        <nav className="fixed bottom-0 w-full bg-background border-t  border-1 z-100">
            <div className="max-w-lg mx-auto flex justify-around items-center p-4">

                <Link href="/" className="button flex flex-col items-centerfocus:outline-none">
                    <House />

                </Link>


                <Link href="/scan" className="button flex flex-col items-center  focus:outline-none">
                    <Scan />

                </Link>



                <Link href="/history" className="button flex flex-col items-center  focus:outline-none">
                    <History />
                </Link>

            </div>
        </nav>
    )
}