import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const FeaturesSection = () => (
    <div className="w-full py-20 lg:py-40 bg-neutral-500 bg-opacity-5">
        <div className="container mx-auto">
            <div className="flex gap-4 py-20 lg:py-40 flex-col items-start">
                <div>
                    <Badge>Features</Badge>
                </div>
                <div className="flex gap-2 flex-col">
                    <h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular">
                        Main Features
                    </h2>
                    {/* <p className="text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-muted-foreground">
                        Managing a small business today is already tough.
                    </p> */}
                </div>
                <div className="flex gap-10 pt-12 flex-col w-full">
                    <div className="grid grid-cols-2 items-start lg:grid-cols-3 gap-10">
                        <div className="flex flex-row gap-6 w-full items-start">
                            <Check className="w-4 h-4 mt-2 text-primary" />
                            <div className="flex flex-col gap-1">
                                <p>QR Code and Barcode Scanning</p>
                                {/* <p className="text-muted-foreground text-sm">

                                </p> */}
                            </div>
                        </div>
                        <div className="flex flex-row gap-6 items-start">
                            <Check className="w-4 h-4 mt-2 text-primary" />
                            <div className="flex flex-col gap-1">
                                <p>User Roles</p>
                                <p className="text-muted-foreground text-sm">
                                    Designate and limit access
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-6 items-start">
                            <Check className="w-4 h-4 mt-2 text-primary" />
                            <div className="flex flex-col gap-1">
                                <p>Responsive and Accessible by design</p>
                                {/* <p className="text-muted-foreground text-sm">
                                    We&apos;ve made it beautiful and modern.
                                </p> */}
                            </div>
                        </div>
                        <div className="flex flex-row gap-6 w-full items-start">
                            <Check className="w-4 h-4 mt-2 text-primary" />
                            <div className="flex flex-col gap-1">
                                <p>Event Report Generation</p>
                                <p className="text-muted-foreground text-sm">
                                    Export attendance event data
                                </p>
                            </div>
                        </div>
                        {/* <div className="flex flex-row gap-6 items-start">
                            <Check className="w-4 h-4 mt-2 text-primary" />
                            <div className="flex flex-col gap-1">
                                <p>Fast and reliable</p>
                                <p className="text-muted-foreground text-sm">
                                    We&apos;ve made it fast and reliable.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-6 items-start">
                            <Check className="w-4 h-4 mt-2 text-primary" />
                            <div className="flex flex-col gap-1">
                                <p>Beautiful and modern</p>
                                <p className="text-muted-foreground text-sm">
                                    We&apos;ve made it beautiful and modern.
                                </p>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    </div>
);