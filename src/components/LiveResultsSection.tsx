import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Student } from '@/app/models/Student';
import { Trash, CircleUserRound, UserRound, TextSearch } from "lucide-react";
import { Toaster } from "@/components/ui/sonner"

interface LiveResultsSectionProps {
    results: Student[];
}

export default function LiveResultsSection({ results }: LiveResultsSectionProps) {
    // return (
    //     <ScrollArea className="h-72 w-full rounded-md border">
    //         <div className="p-4">
    //             <h4 className="mb-4 text-sm font-medium leading-none">Results</h4>
    //             {results.map((result, num) => (
    //                 <React.Fragment key={num}>
    //                     <div className="flex justify-between gap-4 items-center">
    //                         <div className="text-normal font-medium">
    //                             {result.name}
    //                         </div>

    //                         <div className="text-xs ">
    //                             ID:{result.id}
    //                         </div>

    //                         <a href="#" className="button">
    //                             <Trash />
    //                         </a>
    //                     </div>

    //                     <Separator className="my-2" />
    //                 </React.Fragment>
    //             ))}
    //         </div>
    //     </ScrollArea>
    // );


    return (
        <>
            {results.length > 0 ? (
                <div className="h-72 overflow-auto w-full rounded-md flex flex-col gap-2">
                    <Toaster />

                    {results.map((result, num) => (

                        <React.Fragment key={num}>
                            <div className="flex justify-between gap-4 items-center border-1 border-solid border rounded-md p-4 bg-secondary">

                                <div className="flex gap-4 items-center">
                                    <UserRound />

                                    <div className="flex flex-col">
                                        <div className="text-normal font-medium">
                                            {result.name}
                                        </div>

                                        <div className="text-xs ">
                                            ID:{result.idNum}
                                        </div>
                                    </div>

                                </div>

                                {/* <a href="#" className="button icon">
                                <Trash />
                            </a> */}
                            </div>
                        </React.Fragment>
                    ))}

                </div>
            ) : (
                <div className="flex gap-2 items-center place-content-center">
                    <TextSearch />
                    <h4 className="text-sm font-medium leading-none text-center">Results will display here</h4>
                </div>

            )}
        </>
    );
}
