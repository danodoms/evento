// components/HeroSection.jsx\
"use client"
import { MoveDown, MoveRight, PhoneCall, QrCode } from "lucide-react";
import Link from "next/link"
import { Button } from "@/components/ui/button";
import { FlipWords } from "./ui/flip-words";
import Image from 'next/image'
import { Vortex } from "./ui/vortex";
import { useEffect, useState } from "react";
import MobileDeviceMockup from "./Mockup";

export function HeroSection() {
    const words = ["Streamlined", "Digitized", "Modernized"];



    return (
        // <div className="w-full h-screen relative ">
        <div className=" top-0 z-[-2] h-screen w-full bg-background bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]">

            <div className=" flex justify-center h-full container">
                <div className="flex gap-8 lg:py-40 w-full items-center justify-center flex-col">

                    <div className="flex gap-8 w-full flex-wrap grid-cols-2 md:grid justify-center ">
                        {/* <div className="flex items-center gap-2 justify-center">
                            <Image
                                src="/dorsu-icon.png"
                                alt="Picture of the author"
                                width={30}
                                height={30}
                                className="saturate-0"
                           
                            />
                            <p className="text-xs text-left text-balance opacity-50 ">An internal web app of Davao Oriental State   <br /> University
                                Banaybanay Campus Student Council</p>
                        </div> */}
                        <div className="flex gap-4 flex-col justify-center items-center md:items-start ">
                            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter font-regular text-center md:justify-start">
                                Events Attendance
                                <div className="md:text-left">
                                    <FlipWords words={words} />
                                </div>
                            </h1>
                            <p className="text-sm text-balance md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl">
                                {/* <span className="font-bold">evento</span> streamlines university event attendance tracking. */}
                                no pen. no paper. no hassle. just<span className="font-bold"> evento.</span>
                            </p>



                            <Link href="/" className="flex flex-row flex-wrap gap-3 justify-center">

                                <Button size="lg" className="gap-4">
                                    View Demo <MoveRight className="w-4 h-4" />
                                </Button>

                                <Button size="lg" className="gap-4" variant="outline">
                                    Join waitlist <QrCode className="w-4 h-4" />
                                </Button>
                            </Link>
                        </div>



                        <div className=" rounded-md aspect-video w-full relative place-content-center " >
                            {/* <Image
                                src="/wide.png"
                                alt="wide"
                                fill={true}
                                className="rounded-md object-fit"
                            />


                            <Image src="/narrow.png" alt=""
                                fill={true}
                                className=" rounded-md object-contain"
                            /> */}


                            <MobileDeviceMockup />


                        </div>







                    </div>


                    {/* <div>
                        <Button variant="secondary" size="sm" className="gap-4">
                            Read our launch article <MoveRight className="w-4 h-4" />
                        </Button>
                    </div> */}



                    {/* <h3 className=" md:text-xl max-w-2xl tracking-tighter text-center font-regular flex flex-col h-full justify-center items-center gap-4 opacity-50 basis-1/12">
                        How it works
                        <MoveDown className="size-8 animate-bounce" />
                    </h3> */}

                </div>
            </div>
        </div>
        // </div>
    )
}