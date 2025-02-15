"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Bot } from "lucide-react";

interface ChatMessage {
    user: string;
    ai: string;
}

const TypewriterText = ({
    text,
    speed = 15,
}: {
    text: string;
    speed?: number;
}) => {
    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timer = setTimeout(() => {
                // Add up to 3 characters at once for longer messages
                const charsToAdd = Math.min(3, text.length - currentIndex);
                setDisplayedText(
                    (prev) =>
                        prev +
                        text.slice(currentIndex, currentIndex + charsToAdd)
                );
                setCurrentIndex((prev) => prev + charsToAdd);
            }, speed); // Faster speed (15ms default)

            return () => clearTimeout(timer);
        }
    }, [currentIndex, text, speed]);

    useEffect(() => {
        setDisplayedText("");
        setCurrentIndex(0);
    }, [text]);

    return (
        <p className="text-gray-700 whitespace-pre-wrap min-h-[1.5em]">
            {displayedText}
            {currentIndex < text.length && (
                <span className="animate-pulse">▋</span>
            )}
        </p>
    );
};

const ChatBox = ({
    chats,
    typingSpeed = 15,
}: {
    chats: ChatMessage[];
    typingSpeed?: number;
}) => {
    const { user } = useUser();

    return (
        <div className="flex flex-col-reverse overflow-x-clip rounded-lg p-5">
            {chats.map((chat, index) => (
                <div key={index} className="mb-5 flex flex-col gap-5">
                    {/* User Message */}
                    <div className="flex gap-3">
                        <div className="relative h-10 w-10 flex-shrink-0">
                            <Image
                                fill
                                alt={`${user?.fullName}'s avatar`}
                                src={
                                    user?.imageUrl || "/api/placeholder/100/100"
                                }
                                className="rounded-lg border-2 border-gray-300 object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <h1 className="font-medium text-gray-900">
                                {user?.fullName}
                            </h1>
                            <p className="text-gray-700 whitespace-pre-wrap">
                                {chat.user}
                            </p>
                        </div>
                    </div>

                    {/* AI Response */}
                    <div className="flex gap-3">
                        <div className="flex-shrink-0">
                            <Bot
                                size={40}
                                className="p-2 rounded-lg border-2 bg-gray-50 text-blue-600 border-gray-300"
                            />
                        </div>
                        <div className="flex-1">
                            <h1 className="font-medium text-gray-900">
                                Assistant
                            </h1>
                            <TypewriterText
                                text={chat.ai}
                                speed={typingSpeed}
                            />
                        </div>
                    </div>

                    {index > 0 && <hr className="opacity-90 my-2" />}
                </div>
            ))}
        </div>
    );
};

export default ChatBox;
