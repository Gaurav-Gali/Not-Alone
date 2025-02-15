"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { LoaderCircle, Mic, Search, BadgePlus } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import CreateModal from "./CreateModal";

const SearchBar = () => {
    const id = useId();
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const pathname = usePathname();

    const routesNoSearch = ["/settings", "/settings/security"];
    routesNoSearch.includes(pathname); // Check if current path should hide search

    useEffect(() => {
        if (inputValue) {
            setIsLoading(true);
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 500);
            return () => clearTimeout(timer);
        }
        setIsLoading(false);
    }, [inputValue]);

    return (
        <div className={"flex gap-3 items-center pr-7"}>
            <div className="relative flex-1">
                <Input
                    id={id}
                    className="peer pe-9 ps-9 h-10 text-gray-600 rounded-full shadow-none border focus-visible:ring-1 focus-visible:ring-gray-300"
                    placeholder="Search..."
                    type="search"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                    {isLoading ? (
                        <LoaderCircle
                            className="animate-spin"
                            size={16}
                            strokeWidth={2}
                            role="status"
                            aria-label="Loading..."
                        />
                    ) : (
                        <Search size={16} strokeWidth={2} aria-hidden="true" />
                    )}
                </div>
                <button
                    className="absolute inset-y-0 mr-1 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label="Press to speak"
                    type="submit"
                >
                    <Mic size={16} strokeWidth={2} aria-hidden="true" />
                </button>
            </div>
            <CreateModal>
                <Button className="w-full flex gap-1 items-center py-3 rounded-full hover:opacity-[95%] border-neutral-50 bg-gradient-to-r from-blue-500 to-indigo-500">
                    <BadgePlus className="w-4" /> Create
                </Button>
            </CreateModal>
        </div>
    );
};

export default SearchBar;
