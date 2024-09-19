import React from 'react'
import StudentCardSkeleton from './skeleton/StudentCardSkeleton';
import { Skeleton } from './ui/skeleton';

interface LoadingSkeletonProps {
    headerText: string;
}


const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ headerText }) => {

    const size = 9;
    const skeletons = new Array(size).fill(undefined);

    return (
        <div className="flex flex-col gap-3">
            <div className="flex justify-between gap-2 items-center">
                <h1 className="text-2xl font-bold tracking-tight mr-auto">{headerText}</h1>


                <div className='gap-2 flex '>
                    <Skeleton className="size-8 rounded-full" />
                    <Skeleton className="w-16 h-8 rounded-full" />
                </div>
            </div>

            <Skeleton className="w-full h-8 rounded-full" />


            <div className="flex flex-col gap-3 md:grid md:grid-cols-2 lg:grid-cols-3 overflow-y-auto rounded-md w-full">
                {skeletons.map((index, skeleton) => (
                    <StudentCardSkeleton key={index} />
                ))}
            </div>
        </div>
    );
};

export default LoadingSkeleton;