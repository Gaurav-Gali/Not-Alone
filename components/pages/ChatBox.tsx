"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Bot } from "lucide-react";

type chatType = {
    user: string;
    ai: string;
};

const ChatBox = ({ chats }: { chats: chatType[] }) => {
    const { user } = useUser();
    return (
        <div className="flex flex-col-reverse rounded-lg p-5">
            {chats.map((chat, index) => (
                <div key={index} className="mb-5 flex flex-col gap-5">
                    <div className="flex  gap-3">
                        <Image
                            height="100"
                            width="100"
                            alt="Avatar"
                            src={`${user?.imageUrl}`}
                            className="h-10 w-10 mt-1 rounded-lg border-2 border-gray-300 object-cover"
                        />
                        <span className="flex-1">
                            <h1>{user?.fullName}</h1>
                            <p className="flex-1">{chat.user}</p>
                        </span>
                    </div>
                    <div>
                        <div className="flex items-start gap-3">
                            <Bot
                                size={18}
                                className="h-10 w-10 p-[7px] mt-1 rounded-lg border-2 bg-gray-50 text-center text-blue-600 border-gray-300 object-cover"
                            />
                            <span className="flex-1">
                                <h1>Assistant</h1>
                                <p className="flex-1">{chat.ai}</p>
                            </span>
                        </div>
                    </div>
                    {index > 0 && (
                        <hr className="opacity-[90%]" />
                    )}
                </div>
            ))}
        </div>
    );
};

export default ChatBox;
