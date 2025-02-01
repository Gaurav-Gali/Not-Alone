import React from "react";
import { GrLinkedin, GrInstagram, GrGithub } from "react-icons/gr";
import Image from "next/image";

export default function DeveloperCard({
    name,
    role,
    image,
    socialLinks,
}: {
    name: string;
    role: string;
    image: string;
    socialLinks: {
        linkedin?: string;
        instagram?: string;
        github?: string;
    };
}) {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
            <Image
                height={100}
                width={100}
                src={image || "/placeholder.svg"}
                alt={name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-2 ring-gray-100 dark:ring-gray-800"
            />

            <div className="text-center space-y-1">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {role}
                </p>
            </div>

            <div className="flex justify-center items-center gap-3 mt-4">
                {socialLinks.linkedin && (
                    <a
                        href={socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-[#0077b5] transition-colors"
                    >
                        <GrLinkedin size={18} />
                    </a>
                )}
                {socialLinks.instagram && (
                    <a
                        href={socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-[#e4405f] transition-colors"
                    >
                        <GrInstagram size={18} />
                    </a>
                )}
                {socialLinks.github && (
                    <a
                        href={socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        <GrGithub size={18} />
                    </a>
                )}
            </div>
        </div>
    );
}
