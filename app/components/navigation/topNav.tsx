import React from "react";
import Image from "next/image";
import Branding from "../Globals/brandIcon";
import User from "../Globals/user";
import brand from "../Icons/Brand.png";

const TopNav = () => {
  return (
    <div className="bg-[#393b40] fixed top-0 left-0 w-full h-[82px] flex justify-between items-center">
      <div className="ml-[48px]">
        <Image src={brand} alt="Brand" width={120} height={20} />
      </div>
      <div className="mr-[36px]"></div>
    </div>
  );
};

export default TopNav;
