"use client";

import { useState, FormEvent, ChangeEvent, useEffect, useRef } from "react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import ChatBox from "./ChatBox";
import ReactMarkdown from "react-markdown";

interface ChatType {
    user: string;
    ai: string;
}

export default function AssistantComp() {
    const [chats, setChats] = useState<ChatType[]>([]);
    const [input, setInput] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const loadingRef = useRef<HTMLDivElement>(null);

    const placeholders: string[] = [
        "What is phishing, and how can you protect yourself?",
        "What are the common signs of a ransomware attack?",
        "How do hackers perform social engineering attacks?",
        "What are the legal consequences of hacking?",
        "How can you secure your personal data from cybercriminals?",
    ];

    useEffect(() => {
        // Scroll to loading indicator when it appears
        if (loading && loadingRef.current) {
            loadingRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [loading]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        // Add user message immediately
        setChats((prev) => [...prev, { user: input, ai: "" }]);
        setLoading(true);

        const prompt = `${input} Ensure the prompt is concise and relevant to Indian cybersecurity scenarios. If queries fall outside the domain of cybersecurity, cyber crimes, or victims' experiences, respond with 'This is beyond my knowledge.' Additionally, provide the necessary helpline numbers for police or cyber crime support when required.`;

        try {
            const res = await fetch("/api/gemini", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
            });

            if (!res.ok) throw new Error("Failed to fetch response");

            const data = await res.json();
            const aiResponse =
                data?.candidates?.[0]?.content?.parts?.[0]?.text ||
                "No response";

            // Update the last chat with AI response
            setChats((prev) => {
                const newChats = [...prev];
                if (newChats.length > 0) {
                    // Update the last message's AI response
                    newChats[newChats.length - 1].ai = aiResponse;
                }
                return newChats;
            });
        } catch (error) {
            console.error("Error fetching AI response:", error);
            // Update the last chat with error message
            setChats((prev) => {
                const newChats = [...prev];
                if (newChats.length > 0) {
                    newChats[newChats.length - 1].ai =
                        "⚠️ Something went wrong. Please try again.";
                }
                return newChats;
            });
        } finally {
            setInput("");
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-center h-screen items-center px-4 py-5">
            <div className="w-full flex flex-col items-center justify-center border-b border-gray-200 pb-5 m-5">
                <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
                    Ask Assistant
                </h2>
                <PlaceholdersAndVanishInput
                    placeholders={placeholders}
                    onChange={handleChange}
                    onSubmit={onSubmit}
                />
            </div>

            <div className="w-full flex-1 overflow-y-auto">
                {chats.length > 0 ? (
                    <div className="space-y-4 w-full">
                        {chats.map((chat, index) => (
                            <div key={index} className="space-y-2">
                                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                                    <p className="font-medium">You:</p>
                                    <p>{chat.user}</p>
                                </div>
                                {chat.ai ? (
                                    <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                                        <p className="font-medium">
                                            Assistant:
                                        </p>
                                        <div className="prose dark:prose-invert max-w-none">
                                            <ReactMarkdown>
                                                {chat.ai}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                ) : index === chats.length - 1 && loading ? (
                                    <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                                        <p className="font-medium">
                                            Assistant:
                                        </p>
                                        <div className="flex items-center gap-2 pt-2">
                                            <div className="animate-bounce h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400"></div>
                                            <div
                                                className="animate-bounce h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400"
                                                style={{
                                                    animationDelay: "0.2s",
                                                }}
                                            ></div>
                                            <div
                                                className="animate-bounce h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400"
                                                style={{
                                                    animationDelay: "0.4s",
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="w-full flex-1 flex justify-center items-center">
                        <p className="text-gray-500">
                            No messages yet. Ask Assistant
                        </p>
                    </div>
                )}

                {/* Loading indicator reference point */}
                <div ref={loadingRef} className="h-1"></div>
            </div>
        </div>
    );
}
