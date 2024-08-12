import { SignIn } from "@clerk/nextjs";

import { CalendarDays, Download, Map, TriangleAlert, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from 'next/image'


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
        // <AuroraBackground className="">



        <div className="w-full flex items-center justify-center gap-8 flex-col flex-auto h-full py-16">
            <div className="rounded-lg items-center justify-center flex flex-col">
                <h1 className="font-extrabold lg:text-7xl text-6xl">
                    evento
                </h1>
                <p className="text-balance  text-xs opacity-70 flex gap-1 items-center"><Zap className="size-3" />Streamlining events</p>



                {/* <div className="flex items-center gap-2 mt-6">
                    <Image
                        src="/dorsu-icon.png"
                        alt="Picture of the author"
                        width={30}
                        height={30}
                        className="saturate-0"
                
                    />
                    <p className="text-xs text-left text-balance opacity-50">An internal web app of Davao Oriental State   <br /> University
                        Banaybanay Campus Student Council</p>
                </div> */}

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


        // </AuroraBackground>
    )
}