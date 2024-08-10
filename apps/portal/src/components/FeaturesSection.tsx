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
                    <div className="grid grid-cols-1 items-start lg:grid-cols-3 gap-10">
                        <div className="flex flex-row gap-6 w-full items-start">
                            <Check className="w-4 h-4 mt-2 text-primary" />
                            <div className="flex flex-col gap-1">
                                <p>Effortless Scanning</p>
                                <p className="text-muted-foreground text-sm">
                                    Quickly and accurately log attendance with QR code and barcode scanning. No more paper hassle.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-6 items-start">
                            <Check className="w-4 h-4 mt-2 text-primary" />
                            <div className="flex flex-col gap-1">
                                <p>Customizable Permissions</p>
                                <p className="text-muted-foreground text-sm">
                                    Assign roles and access levels to your team, ensuring the right people can manage events and data.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-6 items-start">
                            <Check className="w-4 h-4 mt-2 text-primary" />
                            <div className="flex flex-col gap-1">
                                <p>Responsive & Accessible</p>
                                <p className="text-muted-foreground text-sm">
                                    Evento&apos;s modern interface adapts seamlessly to any device, providing a smooth experience.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-6 w-full items-start">
                            <Check className="w-4 h-4 mt-2 text-primary" />
                            <div className="flex flex-col gap-1">
                                <p>Comprehensive Reporting</p>
                                <p className="text-muted-foreground text-sm">
                                    Generate detailed attendance reports and export data to analyze insights.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-6 items-start">
                            <Check className="w-4 h-4 mt-2 text-primary" />
                            <div className="flex flex-col gap-1">
                                <p>Secure, Centralized Data</p>
                                <p className="text-muted-foreground text-sm">
                                    Scanned attendance is stored securely in a centralized database.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-6 items-start">
                            <Check className="w-4 h-4 mt-2 text-primary" />
                            <div className="flex flex-col gap-1">
                                <p>Scalable Scanning</p>
                                <p className="text-muted-foreground text-sm">
                                    Empower multiple authorized officers to manage scanning as your events grow.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);