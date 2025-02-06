"use client";

import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";
import { useState } from "react";
import ChatBox from "./ChatBox";

type chatType = {
    user: string;
    ai: string;
};

export default function AssistantComp() {
    const [chats, setChats] = useState<chatType[]>([]);
    const [input, setInput] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const placeholders = [
        "What is phishing, and how can you protect yourself?",
        "What are the common signs of a ransomware attack?",
        "How do hackers perform social engineering attacks?",
        "What are the legal consequences of hacking?",
        "How can you secure your personal data from cybercriminals?",
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();
        console.log("Inside console");

        const specifiedInput =
            input +
            "Make the prompt concise and and relevant to indian scenarios. If any questions are asked which are outside the domain of cybersecurity and cyber crimes and victims experiences please respond with 'this is beyond my knowledge'. also provide the required contact number and helpline numbers of police or cyber crime support if required.";

        const res = await fetch("/api/gemini", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: specifiedInput }),
        });

        const data = await res.json();
        const newData =
            data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

        setChats((prev) => [
            ...prev,
            { user: input, ai: removeMarkdown(newData) },
        ]);
        setInput("");
        setLoading(false);
    };

    function removeMarkdown(text: string) {
        return text
            .replace(/^#{1,6}\s*/gm, "")
            .replace(/(\*\*|__)(.*?)\1/g, "$2")
            .replace(/(\*|_)(.*?)\1/g, "$2")
            .replace(/`([^`]+)`/g, "$1")
            .replace(/```[\s\S]*?```/g, "")
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
            .replace(/!\[.*?\]\(.*?\)/g, "")
            .replace(/^>\s*/gm, "")
            .replace(/^[-*+]\s+/gm, "")
            .replace(/^\d+\.\s+/gm, "")
            .replace(/\s{2,}/g, " ")
            .trim();
    }
    return (
        <div className="flex flex-col justify-center h-screen items-center px-4 py-5">
            <div className="w-full flex flex-col items-center justify-center border-0 border-b-[0.5px] border-b-gray-200 pb-5 m-5">
                <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
                    Ask Assistant
                </h2>
                <PlaceholdersAndVanishInput
                    placeholders={placeholders}
                    onChange={handleChange}
                    onSubmit={onSubmit}
                />
            </div>
            {/* Thinking */}
            {loading && (
                <div className="flex flex-auto justify-center gap-3 items-center p-4 md:p-5">
                    <div className="flex justify-center">
                        <div className="animate-spin inline-block size-5 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            )}
            {chats.length > 0 ? (
                <div className="w-full flex-1 overflow-y-auto">
                    <ChatBox chats={chats} />
                </div>
            ) : (
                <div className="w-full flex flex-1 justify-center overflow-y-auto">
                    {!loading && "No messages yet. Ask Assistant"}
                </div>
            )}
        </div>
    );
}
