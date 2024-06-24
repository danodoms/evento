import { House, Scan, History } from "lucide-react"

export default function BottomNav() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
            <div className="max-w-lg mx-auto flex justify-between items-center p-4">

                <a href="/" className="button flex flex-col items-center text-gray-700 hover:text-blue-500 focus:outline-none">
                    <House />
                    <span className="text-sm">Home</span>
                </a>


                <a href="/scan" className="button flex flex-col items-center text-gray-700 hover:text-blue-500 focus:outline-none">
                    <Scan />
                    <span className="text-sm">Scan</span>
                </a>



                <a href="/history" className="button flex flex-col items-center text-gray-700 hover:text-blue-500 focus:outline-none">
                    <History />
                    <span className="text-sm">History</span>
                </a>

            </div>
        </nav>
    )
}