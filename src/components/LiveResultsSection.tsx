import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { User } from '@/app/database/Users';
import { Trash } from "lucide-react";

interface LiveResultsSectionProps {
    results: User[];
}

export default function LiveResultsSection({ results }: LiveResultsSectionProps) {
    return (
        <ScrollArea className="h-72 w-full rounded-md border">
            <div className="p-4">
                <h4 className="mb-4 text-sm font-medium leading-none">Results</h4>
                {results.map((result, num) => (
                    <React.Fragment key={num}>
                        <div className="flex justify-between gap-4 items-center">
                            <div className="text-normal font-medium">
                                {result.name}
                            </div>

                            <div className="text-xs ">
                                ID:{result.id}
                            </div>

                            <a href="#" className="button">
                                <Trash />
                            </a>
                        </div>

                        <Separator className="my-2" />
                    </React.Fragment>
                ))}
            </div>
        </ScrollArea>
    );
}
