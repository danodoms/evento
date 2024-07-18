import { SignIn } from "@clerk/nextjs";


import { motion } from "framer-motion"
import { AuroraBackground } from "@/components/ui/aurora-background";

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



        <div className="h-screen w-full flex items-center justify-center gap-8 flex-wrap flex-col">
            <div className="rounded-lg items-center justify-center flex flex-col">
                <h1 className="font-extrabold lg:text-7xl text-6xl ">
                    evento
                </h1>
                <p className="text-balance mt-1 text-sm">Streamlining university events for students</p>


                <p className="text-sm text-center text-balance opacity-50 mt-2">An internal web app of Davao Oriental State   <br /> University
                    Banaybanay Campus Student Council</p>
            </div>


            <SignIn />

            <p className=" opacity-50">
                Only authorized emails can login
            </p>
        </div>

        //     </motion.div>
        // </AuroraBackground>
    )
}