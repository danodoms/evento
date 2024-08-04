import { Badge } from "@/components/ui/badge";
import { MoveRight, QrCode } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export const Content1 = () => (
    <div className="w-full py-20 lg:py-40">
        <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row gap-10 lg:items-center">
                <div className="flex gap-4 flex-col flex-1">
                    <div>
                        <Badge>Step 1</Badge>
                    </div>
                    <div className="flex gap-2 flex-col">
                        <h2 className="text-xl md:text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular text-left">
                            Generate your QR Code
                        </h2>
                        <p className="text-lg max-w-xl lg:max-w-sm leading-relaxed tracking-tight text-muted-foreground text-left">
                            Create a custom QR Code based on your student ID. Ensure your credentials are correct
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
                <div className="bg-muted rounded-md w-full aspect-video h-full flex-1"></div>
            </div>
        </div>
    </div>
);