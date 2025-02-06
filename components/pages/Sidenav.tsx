"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    House,
    Newspaper,
    Bot,
    Download,
    Settings,
    ArrowLeft,
} from "lucide-react";
import { Button } from "../ui/button";
import { useClerk, useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";

type sideLinksType = {
    label: string;
    url: string;
    icon: React.ReactNode;
    selected: boolean;
};

const Sidenav = () => {
    const { user } = useUser();
    const { signOut } = useClerk();
    const pathname = usePathname();
    const { openUserProfile } = useClerk();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const router = useRouter();

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
            url: "",
            icon: <Settings className="w-5 text-gray-300" />,
            selected: false,
        },
    ]);

    useEffect(() => {
        const handleResize = () => {
            setIsCollapsed(window.innerWidth < 640);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    function updatePath() {
        const updatedLinks = sideLinks.map((link) => ({
            ...link,
            selected: link.url === pathname,
        }));
        setSideLinks(updatedLinks);
    }

    useEffect(() => {
        updatePath();
    }, [pathname]);

    const renderSideLinks = (index: number) => {
        const updatedLinks = sideLinks.map((link, i) => ({
            ...link,
            selected: i === index,
        }));

        if (updatedLinks[updatedLinks.length - 1].selected) {
            updatePath();
            openUserProfile();
            return;
        }

        setSideLinks(updatedLinks);
    };

    return (
        <aside
            className={`flex flex-col gap-5 h-screen p-2 pt-5 transition-all duration-300 ${
                isCollapsed ? "w-28" : "w-72"
            }`}
        >
            {/* Name Card */}
            <div
                className={`bg-white rounded-xl cursor-pointer hover:opacity-[90%] border border-neutral-50 p-3 ${
                    isCollapsed ? "p-1 justify-center" : "px-5 justify-start"
                } flex items-center  gap-3`}
                onClick={() => {
                    router.push("/profile/1");
                }}
            >
                <Image
                    className="w-10 h-10 aspect-square rounded-lg flex-shrink-0"
                    src={`${user?.imageUrl}`}
                    width={50}
                    height={50}
                    alt="Avatar"
                />
                {!isCollapsed && (
                    <span className="flex flex-col items-start overflow-hidden">
                        <h1 className="text-sm font-medium">
                            {user?.fullName}
                        </h1>
                        <p className="text-xs text-gray-500">
                            You're not alone
                        </p>
                    </span>
                )}
            </div>

            {/* Navigation */}
            <nav className="bg-white rounded-lg border border-neutral-50 flex flex-col gap-3 p-3">
                {sideLinks.map((link, index) => (
                    <Link
                        className={`flex items-center ${
                            isCollapsed ? "justify-center" : "justify-between"
                        } gap-3 py-2 ${
                            isCollapsed ? "px-2" : "px-5"
                        } rounded-lg hover:bg-gray-50 ${
                            link.selected
                                ? "bg-gray-50 border border-dashed border-gray-300"
                                : "border border-white"
                        }`}
                        key={index}
                        href={link.url}
                        onClick={() => renderSideLinks(index)}
                    >
                        <div className="flex items-center text-gray-600 justify-center gap-3">
                            <span>{link.icon}</span>
                            {!isCollapsed && <span>{link.label}</span>}
                        </div>
                    </Link>
                ))}
            </nav>

            {/* Footer */}
            <Button
                className={`w-full py-5 rounded-lg hover:opacity-[95%] border-neutral-50 bg-gradient-to-r from-blue-500 to-indigo-500 ${
                    isCollapsed ? "px-5" : "px-5"
                }`}
                onClick={() => {
                    router.replace("/");
                    signOut();
                }}
            >
                {isCollapsed ? <ArrowLeft className="w-5 h-5" /> : "Logout"}
            </Button>
        </aside>
    );
};

export default Sidenav;
