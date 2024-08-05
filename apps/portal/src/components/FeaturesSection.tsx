import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const FeaturesSection = () => (
    <div className="w-full py-20 lg:py-40 ">
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
                                <p className="text-muted-foreground text-sm">
                                    Effortlessly scan QR codes and barcodes for quick attendance logging.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-6 items-start">
                            <Check className="w-4 h-4 mt-2 text-primary" />
                            <div className="flex flex-col gap-1">
                                <p>Customizable User Roles</p>
                                <p className="text-muted-foreground text-sm">
                                    Tailor access permissions with flexible user roles to streamline your team&apos;s operations.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-6 items-start">
                            <Check className="w-4 h-4 mt-2 text-primary" />
                            <div className="flex flex-col gap-1">
                                <p>Responsive and Accessible by design</p>
                                <p className="text-muted-foreground text-sm">
                                    Enjoy a beautifully designed, responsive interface that adapts to any device for a smooth user experience.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-6 w-full items-start">
                            <Check className="w-4 h-4 mt-2 text-primary" />
                            <div className="flex flex-col gap-1">
                                <p>Event Report Generation</p>
                                <p className="text-muted-foreground text-sm">
                                    Generate detailed reports and export event data effortlessly to track attendance and analyze insights.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-6 items-start">
                            <Check className="w-4 h-4 mt-2 text-primary" />
                            <div className="flex flex-col gap-1">
                                <p>Centralized Data</p>
                                <p className="text-muted-foreground text-sm">
                                    Scanned data are synced in a centralized database
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-6 items-start">
                            <Check className="w-4 h-4 mt-2 text-primary" />
                            <div className="flex flex-col gap-1">
                                <p>Scalable Scanning Solutions</p>
                                <p className="text-muted-foreground text-sm">
                                    Expand your capabilities with scalable scanning, allowing administrators to assign multiple authorized officers for greater flexibility.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);