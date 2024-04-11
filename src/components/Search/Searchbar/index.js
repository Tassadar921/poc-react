import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

export default function Searchbar({ setQuery }) {
    const [searchString, setSearchString] = useState('');
    const debouncedSearchTerm = useDebounce(searchString, 500);
    useEffect(() => {
        if (debouncedSearchTerm) {
            setQuery(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm]);

    return (
        <input type="text"
               placeholder="Enter keyword"
               value={searchString}
               onChange={e => setSearchString(e.target.value)}
        />
    );
}