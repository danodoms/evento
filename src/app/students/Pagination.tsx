'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"


export default function PaginationComponent({ totalPages }: { totalPages: number }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    return (

        <div className='flex gap-2'>
            {/* <div>
                <div className='border p-4 rounded-md'>
                    5 items
                </div>
            </div> */}

            <Pagination className='flex w-full'>
                <PaginationContent className='flex w-full justify-center'>

                    {currentPage > 1 && (
                        <PaginationItem className='mr-auto'>
                            <Link href={createPageURL(currentPage - 1)}>
                                <PaginationPrevious />
                            </Link>
                        </PaginationItem>
                    )}


                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationLink href="#" isActive>
                            2
                        </PaginationLink>
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationLink href="#">4</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">5</PaginationLink>
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>

                    <PaginationItem className='ml-auto'>
                        <Link href={createPageURL(currentPage + 1)}>
                            <PaginationNext />
                        </Link>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>


    )
}