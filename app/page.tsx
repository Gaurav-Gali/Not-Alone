"use client";

import { Button } from "@/components/ui/button";
import type React from "react";
import Image from "next/image";
import MissionItem from "@/components/landingPage/MissionItem";
import DeveloperCard from "@/components/landingPage/DeveloperCard";

import { SignInButton, SignUpButton } from "@clerk/nextjs";

export default function Landing() {
    const isDBMS = true;
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
                <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white overflow-hidden">
                    <div className="container mx-auto px-4 text-center relative z-10">
                        <h1 className="text-2xl font-extrabold mb-6 leading-tight">
                            Not Alone
                        </h1>
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                            Share. Connect. <br />
                            Overcome Together.
                        </h1>
                        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                            A safe space for cyber crime victims to share
                            experiences, find support, and empower each other.
                        </p>
                        <div className="space-x-4">
                            <Button
                                size="lg"
                                className="bg-white text-blue-600 hover:bg-blue-50"
                                asChild
                            >
                                <SignInButton>Login</SignInButton>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="bg-transparent border-white text-white hover:bg-white/10 hover:text-white"
                                asChild
                            >
                                <SignUpButton>Sign Up</SignUpButton>
                            </Button>
                        </div>
                    </div>
                </section>

                <section id="mission" className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-12 text-center">
                            Our Mission
                        </h2>
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="flex items-center justify-center">
                                <Image
                                    src="/landingPage/mission.png"
                                    alt="Our Mission Illustration"
                                    className="w-[90%] h-auto"
                                    width={1200}
                                    height={1200}
                                />
                            </div>
                            <div className="space-y-8">
                                <MissionItem
                                    title="Support"
                                    description="Provide a platform for victims to share their stories and find emotional support."
                                    icon="🤝"
                                />
                                <MissionItem
                                    title="Educate"
                                    description="Offer resources and information to help prevent future cyber crimes."
                                    icon="📚"
                                />
                                <MissionItem
                                    title="Empower"
                                    description="Equip individuals with tools and knowledge to overcome their experiences."
                                    icon="💪"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {!isDBMS && (
                    <section className="py-20 bg-gray-50">
                        <div className="container mx-auto px-4">
                            <h2 className="text-3xl font-bold mb-12 text-center">
                                Developed By
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <DeveloperCard
                                    name="Gaurav Gali"
                                    role="Web Developer"
                                    image="/landingPage/GauravGali.jpg"
                                    socialLinks={{
                                        linkedin:
                                            "https://www.linkedin.com/in/gaurav-gali?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
                                        instagram:
                                            "https://www.instagram.com/__gg05__?igsh=eDllY2Nod3FlZXM1&utm_source=qr",
                                        github: "https://github.com/Gaurav-Gali",
                                    }}
                                />
                                <DeveloperCard
                                    name="Krishnaa Gopi"
                                    role="Web Developer"
                                    image="/landingPage/Krishnaa.jpg"
                                    socialLinks={{
                                        linkedin:
                                            "https://www.linkedin.com/in/krishnaa-gopi-aa340428b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
                                        instagram:
                                            "https://www.instagram.com/kshnaaaaaaaaa/",
                                        github: "https://github.com/Krishnaa-Gopi1",
                                    }}
                                />
                                <DeveloperCard
                                    name="Vishal ES"
                                    role="Web Developer"
                                    image="/landingPage/Vishal.jpg"
                                    socialLinks={{
                                        linkedin:
                                            "https://www.linkedin.com/in/vishal-e-s-129934287?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
                                        instagram:
                                            "https://www.instagram.com/vishal_e_s?igsh=MXB1M213eHFlM2pyag==",
                                        github: "https://github.com/Vishal3s",
                                    }}
                                />
                            </div>
                        </div>
                    </section>
                )}
            </main>

            <footer id="footer" className="bg-gray-900 text-white py-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">
                                Not Alone
                            </h3>
                            <p className="text-sm opacity-75">
                                Empowering cyber crime victims to reclaim their
                                digital lives.
                            </p>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-800 text-center">
                        <p className="text-sm opacity-75">
                            &copy; 2025 Not Alone. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
