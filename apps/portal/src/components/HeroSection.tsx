// components/HeroSection.jsx\
import { MoveRight, PhoneCall, QrCode } from "lucide-react";
import Link from "next/link"
import { Button } from "@/components/ui/button";

export function HeroSection() {
    return (
        <div className="w-full h-screen">
            <div className="container mx-auto flex justify-center  h-full ">
                <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
                    <div>
                        <Button variant="secondary" size="sm" className="gap-4">
                            Read our launch article <MoveRight className="w-4 h-4" />
                        </Button>
                    </div>
                    <div className="flex gap-4 flex-col">
                        <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
                            University Events Streamlined
                        </h1>
                        <p className="text-sm text-balance md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
                            Evento is a Progressive Web App (PWA) designed to streamline and modernize attendance tracking for university events by replacing the traditional pen and paper methods with a fast, efficient, and digital solution.
                        </p>
                    </div>
                    <Link href="/generate-qr" className="flex flex-row gap-3">
                        <Button size="lg" className="gap-4" variant="outline">
                            Generate QR Code <QrCode className="w-4 h-4" />
                        </Button>
                        {/* <Button size="lg" className="gap-4">
                            Sign up here <MoveRight className="w-4 h-4" />
                        </Button> */}
                    </Link>
                </div>
            </div>
        </div>
    )
}