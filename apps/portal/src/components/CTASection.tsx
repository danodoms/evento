import { MoveRight, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const CTASection = () => (
    <div className="w-full py-20 lg:py-40 ">
        <div className="container mx-auto">
            <div className="flex flex-col text-center bg-muted rounded-md p-4 lg:p-14 gap-8 items-center">
                <div>
                    <Badge>Get started</Badge>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular">
                        Get Started with Evento
                    </h3>
                    <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-pretty">
                        Interested in bringing Evento to your organization? Evento is currently cloud-hosted and only available for internal use. Contact us to learn how you can deploy your own instance and enhance your event management experience.
                    </p>
                </div>
                <div className="flex flex-row gap-4">
                    <Button className="gap-4" variant="outline">
                        Jump on a call <PhoneCall className="w-4 h-4" />
                    </Button>
                    <Button className="gap-4">
                        Sign up here <MoveRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    </div>
);