import { SignIn } from "@clerk/nextjs";

import { Download, Map } from "lucide-react";


import { motion } from "framer-motion"
import { AuroraBackground } from "@/components/ui/aurora-background";
import FeaturesCarousel from "@/components/FeaturesCarousel";
import InstallButton from "@/components/InstallButton";

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



        <div className="w-full flex items-center justify-center gap-8 flex-col flex-auto h-full py-16">
            <div className="rounded-lg items-center justify-center flex flex-col">
                <h1 className="font-extrabold lg:text-7xl text-6xl">
                    evento
                </h1>
                <p className="text-balance mt-1 text-sm">Streamlining university events for students</p>


                <p className="text-sm text-center text-balance opacity-50 mt-2">An internal web app of Davao Oriental State   <br /> University
                    Banaybanay Campus Student Council</p>
            </div>


            <SignIn forceRedirectUrl={"/"} />

            <p className=" opacity-50 ">
                Only authorized emails can login
            </p>


            {/* <div className="flex gap-2 border py-2 px-4 rounded-lg items-center">
                <Download />

                <div>
                    <p className="flex gap-2 ">Install this web-app</p>
                    <p className="opacity-50 text-sm">to enable offline features</p>
                </div>
                <p className="text-xs text-danger italic">Currently in development</p>
            </div> */}

            <InstallButton />





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