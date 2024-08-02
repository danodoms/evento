'use client';

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
} from "@/components/ui/pagination";

export default function PaginationComponent({ totalItems, itemsPerPage }: { totalItems: number | null, itemsPerPage: number }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    if (totalItems === null) {
        return null;
    }

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const currentPage = Number(searchParams.get('page')) || 1;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    const renderPaginationItems = () => {
        const paginationItems = [];
        const maxButtons = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
        let endPage = startPage + maxButtons - 1;

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - maxButtons + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            paginationItems.push(
                <PaginationItem key={i}>
                    <Link href={createPageURL(i)}>
                        <PaginationLink isActive={i === currentPage}>{i}</PaginationLink>
                    </Link>
                </PaginationItem>
            );
        }

        if (startPage > 1) {
            paginationItems.unshift(
                <PaginationItem key="startEllipsis">
                    <PaginationEllipsis />
                </PaginationItem>
            );
        }

        if (endPage < totalPages) {
            paginationItems.push(
                <PaginationItem key="endEllipsis">
                    <PaginationEllipsis />
                </PaginationItem>
            );
        }

        return paginationItems;
    };

    return (
        <Pagination className="w-full">
            <PaginationContent className="justify-center">
                {currentPage > 1 && (
                    <PaginationItem className="mr-auto">
                        <Link href={createPageURL(currentPage - 1)}>
                            <PaginationPrevious />
                        </Link>
                    </PaginationItem>
                )}

                {renderPaginationItems()}

                {currentPage < totalPages && (
                    <PaginationItem className="ml-auto">
                        <Link href={createPageURL(currentPage + 1)}>
                            <PaginationNext />
                        </Link>
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
}
