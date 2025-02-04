"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { House, Newspaper, Bot, Download, Settings } from "lucide-react";
import { Button } from "../ui/button";
import { SignOutButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

type sideLinksType = {
    label: string;
    url: string;
    icon: React.ReactNode;
    selected: boolean;
};

const Sidenav = () => {
    const { user } = useUser();
    const pathname = usePathname();

    const [sideLinks, setSideLinks] = useState<sideLinksType[]>([
        {
            label: "Feed",
            url: "/feed",
            icon: <House className="w-5 text-gray-300" />,
            selected: true,
        },
        {
            label: "News",
            url: "/news",
            icon: <Newspaper className="w-5 text-gray-300" />,
            selected: false,
        },
        {
            label: "Assistant",
            url: "/assistant",
            icon: <Bot className="w-5 text-gray-300" />,
            selected: false,
        },
        {
            label: "Saved",
            url: "/saved",
            icon: <Download className="w-5 text-gray-300" />,
            selected: false,
        },
        {
            label: "Settings",
            url: "/settings",
            icon: <Settings className="w-5 text-gray-300" />,
            selected: false,
        },
    ]);

    useEffect(() => {
        function updatePath() {
            for (let i = 0; i < sideLinks.length; i++) {
                if (sideLinks[i].url === pathname) {
                    sideLinks[i].selected = true;
                } else {
                    sideLinks[i].selected = false;
                }
            }
            setSideLinks([...sideLinks]);
        }
        updatePath();
    }, []);

    const renderSideLinks = (index: number) => {
        for (let i = 0; i < sideLinks.length; i++) {
            if (i === index) {
                sideLinks[i].selected = true;
            } else {
                sideLinks[i].selected = false;
            }
        }
        setSideLinks([...sideLinks]);
    };
    return (
        <aside className="flex flex-col gap-5 w-72 h-screen p-7 pt-5">
            {/* Name Card */}
            <div className="bg-white rounded-xl border border-neutral-50 p-3 px-5 flex items-center justify-start gap-3">
                <Image
                    className="w-10 h-10 aspect-square rounded-lg"
                    src={`${user?.imageUrl}`}
                    width={50}
                    height={50}
                    alt="Avatar"
                />
                <span className="flex flex-col items-start overflow-hidden">
                    <h1 className="text-sm font-medium">{user?.fullName}</h1>
                    <p className="text-xs text-gray-500">You're not alone</p>
                </span>
            </div>
            {/* Navigation  */}
            <nav className="bg-white rounded-lg border border-neutral-50 flex flex-col gap-3 p-3">
                {sideLinks.map((link, index) => (
                    <Link
                        className={`flex items-center justify-between gap-3 py-2 px-5 rounded-lg hover:bg-gray-50 ${
                            link.selected
                                ? "bg-gray-50 border border-dashed border-gray-300"
                                : "border border-white"
                        }`}
                        key={index}
                        href={link.url}
                        onClick={() => renderSideLinks(index)}
                    >
                        <div
                            className={
                                "flex items-center text-gray-600 justify-center gap-3"
                            }
                        >
                            <span>{link.icon}</span>
                            <span>{link.label}</span>
                        </div>
                    </Link>
                ))}
            </nav>
            {/* Footer */}
            <SignOutButton>
                <Button className="w-full py-5 rounded-lg hover:opacity-[95%] border-neutral-50 bg-gradient-to-r from-blue-500 to-indigo-500">
                    Logout
                </Button>
            </SignOutButton>
        </aside>
    );
};

export default Sidenav;
