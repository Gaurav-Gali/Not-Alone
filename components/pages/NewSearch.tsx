"use client";

import React, { useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { LoaderCircle, Mic, Search, BadgePlus } from "lucide-react";


type SearchBarProps = {
  onSearch?: (topic: string) => void;
};

const NewSearch = ({ onSearch }: SearchBarProps) => {
  const id = useId();
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  const routesNoSearch = ["/settings", "/settings/security"];
  const shouldHideSearch = routesNoSearch.includes(pathname);

  useEffect(() => {
    if (inputValue) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    }
    setIsLoading(false);
  }, [inputValue]);

  const handleSearch = () => {
    if (onSearch && inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };

  if (shouldHideSearch) return null;

  return (
    <div className="flex gap-3 items-center pr-7">
      <div className="relative flex-1">
        <Input
          id={id}
          className="peer pe-9 ps-9 h-10 text-gray-600 rounded-full shadow-none border focus-visible:ring-1 focus-visible:ring-gray-300"
          placeholder="Search..."
          type="search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80">
          {isLoading ? (
            <LoaderCircle className="animate-spin" size={16} strokeWidth={2} />
          ) : (
            <Search size={16} strokeWidth={2} />
          )}
        </div>
        <button
          className="absolute inset-y-0 right-0 px-4 rounded-e-full text-sm font-medium bg-gray-200 hover:bg-gray-300 transition-colors"
          onClick={handleSearch}
        >
          Go
        </button>
      </div>

      
    </div>
  );
};

export default NewSearch;
