import { SignIn } from "@clerk/nextjs";

import { CalendarDays, Download, Map, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";


import { motion } from "framer-motion"
import { AuroraBackground } from "@/components/ui/aurora-background";
import FeaturesCarousel from "@/components/FeaturesCarousel";
import InstallButton from "@/components/InstallButton";

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import DevInfo from "@/components/DevInfo";


export default function SignInPage() {
    return (
        // <AuroraBackground>
        //     <motion.div
        //         initial={{ opacity: 0.0, y: 40 }}
        //         whileInView={{ opacity: 1, y: 0 }}
        //         transition={{
        //             delay: 0.3,
        //             duration: 0.8,
        //             ease: "easeInOut",
        //         }}
        //         className="relative flex flex-col gap-4 items-center justify-center px-4"
        //     >
        //


        <div className="w-full flex items-center justify-center gap-8 flex-col flex-auto h-full py-16">
            <div className="rounded-lg items-center justify-center flex flex-col">
                <h1 className="font-extrabold lg:text-7xl text-6xl">
                    evento
                </h1>
                <p className="text-balance  text-xs opacity-70">Streamlining university events</p>


                <p className="text-sm text-center text-balance opacity-50 mt-6">An internal web app of Davao Oriental State   <br /> University
                    Banaybanay Campus Student Council</p>
            </div>

            <SignIn forceRedirectUrl={"/"} />

            <p className=" opacity-50 flex gap-2 items-center">
                <TriangleAlert className="size-4" /> Only authorized emails can login
            </p>


            <div className="rounded-lg flex flex-col gap-6">
                <InstallButton />
                <DevInfo />
            </div>





            {/* <div className="flex flex-col gap-1 p-4">


                <div className="max-w-sm p-1">
                    <div className="font-semibold text-pretty flex items-center gap-2 mb-2">
                        <Map />
                        <span>Explore Features</span>
                    </div>

                    <FeaturesCarousel />
                </div>
            </div>
 */}


        </div>

        //     </motion.div>
        // </AuroraBackground>
    )
}