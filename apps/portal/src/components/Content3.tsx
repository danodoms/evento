



import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Content3 = () => (
    <div className="w-full">
        <div className="container mx-auto">
            <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
                {/* <div>
                    <Badge variant="outline">We&apos;re live!</Badge>
                </div> */}
                <div className="flex gap-4 flex-col">
                    <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
                        Designed to Integrate
                    </h1>
                    <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center text-balance">
                        Evento is designed to work seamlessly with your organization&apos;s existing ID system, allowing attendees to easily check in using their IDs.
                    </p>
                </div>
                {/* <div className="flex flex-row gap-3">
                    <Button size="lg" className="gap-4" variant="outline">
                        Jump on a call <PhoneCall className="w-4 h-4" />
                    </Button>
                    <Button size="lg" className="gap-4">
                        Sign up here <MoveRight className="w-4 h-4" />
                    </Button>
                </div> */}
            </div>
        </div>
    </div>
);