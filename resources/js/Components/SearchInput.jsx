import { XMarkIcon } from "@heroicons/react/20/solid";
import { useEffect, useRef, useState } from "react";

export default function SearchInput({ userSearch = "", onSearch = () => {}, onInput = () => {} }) {
    const [search, setSearch] = useState(userSearch);
    const inputRef = useRef(null)

    const handleSearch = e => {
        setSearch(e.target.value.trim())
    }

    const clearSearch = () => {
        setSearch("")
        onSearch("")
        inputRef.current.focus()
    }

    useEffect(() => {
        onInput(search)

        const debounce = setTimeout(() => {
            if(search) {
                onSearch(search)
            }
        }, 900)

        return () => clearTimeout(debounce)
    }, [search])

    return (
        <div className="relative">
            <input
                ref={inputRef}
                type="text"
                className="!h-9 !border-none focus:outline-none focus:ring-0 w-full pr-8 pl-3"
                placeholder="Search"
                value={search}
                onChange={handleSearch}
            />

            {
                search ? (
                    <button onClick={clearSearch} className="absolute right-1 hover:bg-gray-200/50 p-0.5 rounded-full top-[1.05rem] -translate-y-1/2">
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                ) : ("")
            }
        </div>
    );
}