import React from "react";
import DisplayCard from "@/components/pages/DisplayCard";
import ModalCard from "@/components/pages/ModalCard";
import { feedData } from "@/constants";

const Feed = () => {
    return (
        <div className="flex items-center justify-center mb-5 mr-5">
            {/* Content Display */}
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10 w-full p-5">
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
