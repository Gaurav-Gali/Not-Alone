"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";

const LoadingComp = ({ children }: { children: React.ReactNode }) => {
    const { isLoaded, isSignedIn } = useUser();
    if (!isLoaded && !isSignedIn) {
        return (
            <div className="flex flex-auto flex-col justify-center items-center h-screen p-4 md:p-5">
                <div className="flex justify-center">
                    <div className="animate-spin inline-block size-7 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        );
    } else {
        return <div>{children}</div>;
    }
};

export default LoadingComp;
