import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Input } from './ui/input';
import { useDebouncedCallback } from 'use-debounce';

export default function Search() {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term) => {
        console.log(term);
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);


    return (
        <Input
            type="text"
            placeholder="Search"
            onChange={(e) => {
                handleSearch(e.target.value);
            }}
            defaultValue={searchParams.get('query')?.toString()}
        />
    )
}