import Sidenav from "@/components/pages/Sidenav";
import LoadingComp from "@/components/LoadingComp";
import type { Metadata } from "next";
import SearchBar from "@/components/pages/SearchBar";
import ModalCard from "@/components/pages/ModalCard";

export const metadata: Metadata = {
    title: "Not Alone",
    description:
        "A safe space for cyber crime victims to share experiences, find support, and empower each other.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <LoadingComp>
            <div className="flex bg-gray-50">
                <Sidenav />
                <div className="flex flex-1 flex-col gap-5 justify-center h-screen w-full pt-5">
                    <SearchBar />
                    <main className="flex-1 overflow-scroll">{children}</main>
                </div>
            </div>
        </LoadingComp>
    );
}
