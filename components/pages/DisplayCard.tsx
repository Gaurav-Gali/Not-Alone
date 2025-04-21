"use client";
import Image from "next/image";

export default function DisplayCard({
    image,
    author,
    title,
    description,
    date,
}: {
    image: string;
    author: { image: string; name: string };
    title: string;
    description: string;
    date: string;
}) {
    return (
        <div className="max-w-xs w-full group/card">
            <div className="cursor-pointer overflow-hidden relative card h-72 rounded-xl shadow-sm max-w-sm mx-auto flex flex-col justify-between p-4">
                {/* Background Image */}
                <Image
                    src={image}
                    alt="Background"
                    fill
                    className="object-cover z-0"
                    quality={100}
                    priority
                />

                {/* Smoother Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-[1]"></div>

                {/* Hover Overlay */}
                <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-neutral-50 opacity-10 z-[2]"></div>

                {/* Content */}
                <div className="flex flex-row items-center space-x-4 relative z-[3]">
                    <div className="relative h-10 w-10">
                        <Image
                            fill
                            alt="Avatar"
                            src={author.image}
                            className="rounded-full border-2 border-white object-cover"
                        />
                    </div>
                    <div className="flex flex-col">
                        <p className="font-medium text-base text-white">
                            {author.name}
                        </p>
                        <p className="text-sm text-gray-200">{date}</p>
                    </div>
                </div>

                <div className="text content relative z-[3]">
                    <h1 className="font-bold text-xl md:text-2xl text-white">
                        {title}
                    </h1>
                    <p className="font-normal text-sm text-gray-100 my-4">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}
