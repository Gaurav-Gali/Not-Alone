import React from "react";
import { UserProfile } from "@clerk/nextjs";

const Settings = () => {
    return (
        <div className="flex h-screen pt-5">
            <UserProfile />
        </div>
    );
};

export default Settings;
