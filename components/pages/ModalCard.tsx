import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import Image from "next/image";

export default function ModalCard({
    children,
    image,
    author,
    title,
    description,
    date,
}: {
    children: React.ReactNode;
    image: string;
    author: { image: string; name: string };
    title: string;
    description: string;
    date: string;
}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div>{children}</div>
            </DialogTrigger>
            <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5">
                <DialogHeader className="contents space-y-0 text-left">
                    <DialogTitle className="border-b border-border px-6 py-4 text-base">
                        <div className="flex flex-row items-center space-x-4 z-10">
                            <Image
                                height="100"
                                width="100"
                                alt="Avatar"
                                src={`${author.image}`}
                                className="h-10 w-10 rounded-full border-2 border-gray-300 object-cover"
                            />
                            <div className="flex flex-col">
                                <p className="font-normal text-base relative z-10">
                                    {author.name}
                                </p>
                                <p className="text-sm font-medium text-gray-400">
                                    {date}
                                </p>
                            </div>
                        </div>
                    </DialogTitle>
                    <div className="overflow-y-auto">
                        <DialogDescription asChild>
                            <div className="px-6 py-4">
                                {/* Modal Content */}
                                <Image
                                    height="100"
                                    width="100"
                                    alt="Avatar"
                                    src={`${image}`}
                                    className="h-60 w-full rounded-lg border-2 border-gray-300 object-cover"
                                />
                                <div className="mt-2 ml-1">
                                    <h1 className="font-bold text-xl md:text-2xl text-gray-800 relative z-10">
                                        {title}
                                    </h1>
                                    <p className="font-normal text-sm text-gray-800 relative z-10">
                                        {description}
                                    </p>
                                </div>
                                {/* Likes and comments */}
                                <div></div>
                            </div>
                        </DialogDescription>
                        <DialogFooter className="px-6 pb-6 sm:justify-start">
                            hello
                        </DialogFooter>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
