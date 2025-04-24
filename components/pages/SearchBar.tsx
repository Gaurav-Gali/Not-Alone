"use client";

import React from "react";
import { BadgePlus } from "lucide-react";
import { Button } from "../ui/button";
import CreateModal from "./CreateModal";

const SearchBar = () => {

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
