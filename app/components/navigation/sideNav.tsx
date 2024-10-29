import React from "react";
import Image from "next/image"; // Import the Next.js Image component
import tools from "../Icons/Frame 31892.png"; // Import your image

const SideNav = () => {
  return (
    <div className="bg-background fixed w-[111px] top-[80px] left-0 h-full flex flex-col">
      <div className="flex flex-col items-center flex-grow mt-[25px] ml-[10px]">
        <Image src={tools} alt="tools" width={50} />
      </div>

      <div className="absolute bottom-[10px] left-0 w-full flex justify-center">
        <div>Settings</div>
      </div>
    </div>
  );
};

export default SideNav;
