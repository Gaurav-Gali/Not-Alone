import React from "react";
import DisplayCard from "@/components/pages/DisplayCard";
import ModalCard from "@/components/pages/ModalCard";

const feedData = [
    {
        image: "https://ui-avatars.com/api/?name=Gaurav+Gali&background=random",
        author: {
            image: "/landingPage/GauravGali.jpg",
            name: "Gaurav Gali",
        },
        title: "Exploring AI Innovations",
        description:
            "An in-depth look at how AI is shaping the future of technology.",
        date: "5 February 2025",
    },
    {
        image: "https://ui-avatars.com/api/?name=Gaurav+Gali&background=random",
        author: {
            image: "/landingPage/GauravGali.jpg",
            name: "Gaurav Gali",
        },
        title: "Next.js for Scalable Web Apps",
        description:
            "Understanding how Next.js can help build scalable and high-performance web applications.",
        date: "6 February 2025",
    },
    {
        image: "https://ui-avatars.com/api/?name=Gaurav+Gali&background=random",
        author: {
            image: "/landingPage/GauravGali.jpg",
            name: "Gaurav Gali",
        },
        title: "The Rise of Generative AI",
        description:
            "Exploring the impact of generative AI on content creation and automation.",
        date: "7 February 2025",
    },
    {
        image: "https://ui-avatars.com/api/?name=Gaurav+Gali&background=random",
        author: {
            image: "/landingPage/GauravGali.jpg",
            name: "Gaurav Gali",
        },
        title: "Mastering Full-Stack Development",
        description:
            "A guide to becoming a proficient full-stack developer in 2025.",
        date: "8 February 2025",
    },
    {
        image: "https://ui-avatars.com/api/?name=Gaurav+Gali&background=random",
        author: {
            image: "/landingPage/GauravGali.jpg",
            name: "Gaurav Gali",
        },
        title: "The Future of Web3",
        description:
            "How blockchain and decentralized technologies are shaping the web of the future.",
        date: "9 February 2025",
    },
];

const Feed = () => {
    return (
        <div className="flex items-center justify-center mb-5 mr-5">
            {/* Content Display */}
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 w-fit">
                {feedData.map((feed, index) => (
                    <li key={index} className="w-full">
                        <ModalCard {...feed}>
                            <DisplayCard {...feed} />
                        </ModalCard>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Feed;
