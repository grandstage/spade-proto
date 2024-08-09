import React, { memo } from "react";
import { PulseLoader } from "react-spinners";
import { Avatar } from "@mui/material";


// essentially a factory that uses a switch statement to determine which component to render
const MessageLoader = () => {
    return (

        <div className="py-5 md:pl-5">
            <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                    <Avatar
                        alt="Spade AI Profile Pic"
                        src="./images/spade-ai-logo.png"
                        variant="square"
                    />
                    <span>
                        <PulseLoader color="#9CE0F5" />
                    </span>
                </div>
            </div>
        </div>

    );
};

export default memo(MessageLoader);
