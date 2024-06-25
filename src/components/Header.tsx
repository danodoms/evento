"use client"

import { ModeToggle } from "./ModeToggle"

export default function Header() {


    return (
        <nav
            className=" fixed top-0 z-50 flex w-full flex-auto gap-4 bg-background bg-opacity-50 backdrop-blur-lg p-2 border-b border-1"
        >

            <h2 className="font-bold text-xl flex-auto place-content-center">EVENTS+</h2>

            <div className="ml-auto">
                <ModeToggle />
            </div>




        </nav>
    )

}