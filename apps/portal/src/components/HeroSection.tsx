// components/HeroSection.jsx\
"use client"
import { MoveDown, MoveRight, PhoneCall, QrCode } from "lucide-react";
import Link from "next/link"
import { Button } from "@/components/ui/button";
import { FlipWords } from "./ui/flip-words";
import Image from 'next/image'
import { Vortex } from "./ui/vortex";

export function HeroSection() {
    const words = ["Streamlined", "Digitized", "Modernized"];
    return (
        // <div className="w-full h-screen relative ">
        <div className=" top-0 z-[-2] h-screen w-full bg-background bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]">

            <div className="container mx-auto flex justify-center  h-full ">
                <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">

                    <div className="flex gap-4 flex-col flex-2 basis-11/12 justify-center">
                        <div className="flex items-center gap-2 justify-center">
                            <Image
                                src="/dorsu-icon.png"
                                alt="Picture of the author"
                                width={30}
                                height={30}
                                className="saturate-0"
                            // blurDataURL="data:..." automatically provided
                            // placeholder="blur" // Optional blur-up while loading
                            />
                            <p className="text-xs text-left text-balance opacity-50 ">An internal web app of Davao Oriental State   <br /> University
                                Banaybanay Campus Student Council</p>
                        </div>


                        <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
                            Events Attendance
                            <div>
                                <FlipWords words={words} />
                            </div>
                        </h1>
                        <p className="text-sm text-balance md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
                            {/* <span className="font-bold">evento</span> streamlines university event attendance tracking. */}
                            no pen. no paper. no hassle. just<span className="font-bold"> evento.</span>
                        </p>


                    </div>
                    {/* <Link href="/generate-qr" className="flex flex-row gap-3">
                        <Button size="lg" className="gap-4" variant="outline">
                            Generate QR Code <QrCode className="w-4 h-4" />
                        </Button>
                        <Button size="lg" className="gap-4">
                            Sign up here <MoveRight className="w-4 h-4" />
                        </Button>
                    </Link> */}

                    {/* <div>
                        <Button variant="secondary" size="sm" className="gap-4">
                            Read our launch article <MoveRight className="w-4 h-4" />
                        </Button>
                    </div> */}


                    <h3 className=" md:text-xl max-w-2xl tracking-tighter text-center font-regular flex flex-col h-full justify-center items-center gap-4 opacity-50 basis-1/12">
                        How it works
                        <MoveDown className="size-8 animate-bounce" />
                    </h3>

                </div>
            </div>
        </div>
        // </div>
    )
}