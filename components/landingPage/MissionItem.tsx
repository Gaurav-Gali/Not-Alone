import React from "react";

export default function MissionItem({
    title,
    description,
    icon,
}: {
    title: string;
    description: string;
    icon: string;
    className?: string;
}) {
    return (
        <div className="group relative flex items-start space-x-6 rounded-2xl border border-neutral-200/10 bg-neutral-50/5 p-6 ">
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-50/50 text-2xl shadow-inner">
                {icon}
            </div>
            <div className="space-y-2">
                <h3 className="text-lg font-medium tracking-tight text-neutral-900 transition-colors duration-300 ease-in-out group-hover:text-neutral-800">
                    {title}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-600">
                    {description}
                </p>
            </div>
        </div>
    );
}
