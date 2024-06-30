import { House, Scan, History } from "lucide-react"

export default function BottomNav() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-background border-t  border-1 z-100">
            <div className="max-w-lg mx-auto flex justify-around items-center p-4">

                <a href="/" className="button flex flex-col items-centerfocus:outline-none">
                    <House />

                </a>


                <a href="/scan" className="button flex flex-col items-center  focus:outline-none">
                    <Scan />

                </a>



                <a href="/history" className="button flex flex-col items-center  focus:outline-none">
                    <History />
                </a>

            </div>
        </nav>
    )
}