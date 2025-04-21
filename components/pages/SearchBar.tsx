"use client";

import React, { useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { LoaderCircle, Mic, Search, BadgePlus } from "lucide-react";
import { Button } from "../ui/button";
import CreateModal from "./CreateModal";

type SearchBarProps = {
  onSearch?: (topic: string) => void;
};

const SearchBar = ({ onSearch }: SearchBarProps) => {
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
    setIsLoading(false);``
  }, [inputValue]);

  const handleSearch = () => {
    if (onSearch && inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };

  if (shouldHideSearch) return null;

  return (
    <div className="flex gap-3 items-center pr-7 justify-end">
      <CreateModal>
        <Button className="w-full flex gap-1 items-center py-3 rounded-full hover:opacity-[95%] border-neutral-50 bg-gradient-to-r from-blue-500 to-indigo-500">
          <BadgePlus className="w-4" /> Create
        </Button>
      </CreateModal>
    </div>
  );
};

export default SearchBar;
