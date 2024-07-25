import { UserRound } from 'lucide-react'
import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

export default function StudentCardSkeleton() {
    return (
        <div
            className="p-5 rounded-lg flex flex-col gap-1 backdrop-contrast-50 backdrop-opacity-20"
        >
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center w-full">
                    {/* REPLACE WITH SKELETON */}
                    {/* <UserRound className="size-5" /> */}
                    <Skeleton className='size-5 rounded-full' />

                    {/* REPLACE WITH SKELETON */}
                    {/* <h2 className="font-bold">{student.name}</h2> */}
                    <Skeleton className="h-4 w-10/12 rounded-full" />
                </div>


                <div className="flex gap-4 items-center">

                </div>
            </div>

            <div className="flex gap-2 flex-wrap mt-3 justify-between">
                <div className="flex gap-2 items-center opacity-50 w-full">
                    {/* REPLACE WITH SKELETON */}
                    {/* <p className="font-semibold text-sm">{student.school_id}</p> */}
                    <Skeleton className="h-3 w-1/2 rounded-full" />
                </div>
            </div>
        </div>
    )
}
