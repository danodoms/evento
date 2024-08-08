"use client";
import { Badge } from "@/components/ui/badge";

import { useEffect, useState } from "react";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";

import { BadgeCheck, MoveRight, QrCode } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Card } from "./ui/card";
import Image from "next/image"

export const Content1 = () => {


    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        setTimeout(() => {
            if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
                setCurrent(0);
                api.scrollTo(0);
            } else {
                api.scrollNext();
                setCurrent(current + 1);
            }
        }, 1000);
    }, [api, current]);

    return (
        <div className="w-full py-20 lg:py-40">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row gap-10 lg:items-center">
                    <div className="flex gap-4 flex-col flex-1">
                        <div>
                            <Badge>Step 1</Badge>
                        </div>
                        <div className="flex gap-2 flex-col">
                            <h2 className="text-xl md:text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular text-left">
                                Generate QR Code
                            </h2>
                            <p className="text-lg max-w-xl lg:max-w-sm leading-relaxed tracking-tight text-muted-foreground text-left">
                                Attendees link their existing ID to generate a personalized Evento QR code.
                            </p>

                        </div>
                        <Link href="/generate-qr" className="flex flex-row gap-3">
                            <Button size="lg" className="gap-4" >
                                Generate QR Code <QrCode className="w-4 h-4" />
                            </Button>
                            {/* <Button size="lg" className="gap-4">
                            Sign up here <MoveRight className="w-4 h-4" />
                        </Button> */}
                        </Link>
                    </div>








                    <div className=" rounded-md w-full aspect-video h-full flex-1 relative">
                        <Image
                            src="/qrcode-generate.svg"
                            alt="wide"
                            fill={true}
                            className="rounded-md object-fit "
                        />
                    </div>

                    {/* <IdCard /> */}

                </div>
            </div>
        </div >
    )
};








const IdCard = () => {
    return (
        <Card id="card" className="aspect-[2/3] p-8 max-w-sm  grid gap-6 rounded-lg shadow-neutral-500 bg-muted shadow-sm bg-gradient-to-br from-muted to-slate-500 relative overflow-hidden drop-shadow-xl" >

            <div className="absolute font-bold text-9xl rotate-90 top-52 right-4 z-0 opacity-40 bg-gradient-to-r bg-clip-text text-transparent from-transparent to-slate-500">
                evento
            </div>
            <div className="absolute font-bold text-9xl rotate-90 top-8 left-8 z-0 opacity-40 bg-gradient-to-l bg-clip-text text-transparent from-transparent to-slate-500 ">
                evento
            </div>


            <div className="flex flex-col bg-opacity-20 p-2 rounded-full gap-4 z-50">
                <div className="flex items-center gap-2 justify-between">
                    <p className="font-bold">evento</p>

                    <BadgeCheck className="" />
                </div>

                <div className="flex flex-col">
                    <h3 className=" font-semibold text-xl mb-1 text-wrap">John Doe</h3>
                    {/* <p className="text-muted-foreground text-sm font-medium">BSIT</p> */}
                </div>
            </div>
            <div className="grid gap-4 z-50">
                {/* <div className="flex items-center justify-between border-b border-muted pb-2">
<span className="text-muted-foreground font-medium">ID Number:</span>
<span className="font-medium">123456789</span>
</div> */}

                {/* <h1 className="text-lg font-semibold tracking-widest mb-2 text-center">2021-3439</h1> */}

                <div className="flex justify-center rounded-md flex-col items-center">
                    {/* <img src="1" alt="QR Code" className="outline-2 rounded-md opacity-80" /> */}
                    <QrCode className="size-60 bg-primary rounded-md text-background opacity-60 bg-blend-light  " />

                    <h1 className="text-lg font-semibold tracking-widest my-2 text-center opacity-80">2021-5789</h1>
                </div>


            </div>
        </Card>
    )
};