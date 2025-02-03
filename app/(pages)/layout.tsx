import Sidenav from "@/components/pages/Sidenav";
import LoadingComp from "@/components/LoadingComp";
import type { Metadata } from "next";

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
                <main className="flex-1 h-screen">{children}</main>
            </div>
        </LoadingComp>
    );
}
