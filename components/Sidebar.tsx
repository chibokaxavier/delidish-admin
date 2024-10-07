import Link from "next/link";
import React from "react";
import { CiViewList } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { PiHandbagSimpleDuotone } from "react-icons/pi";

const Sidebar = () => {
  return (
    <div className=" w-[20%] border-r-2 border-gray-300 h-screen pl-[102px] flex flex-col pt-16 gap-10">
      <Link href={"/add"}>
        {" "}
        <div className="border-b-2 border-l-2 border-t-2 h-[50px] w-[200px] border-black/10 flex gap-4 justify-start pl-3 items-center cursor-pointer">
          {" "}
          <div className="h-7 w-7 rounded-full flex justify-center items-center border-2 border-black">
            <FaPlus className="text-sm" />
          </div>{" "}
          <p>Add items</p>
        </div>
      </Link>

      <Link href={"/list"}>
        {" "}
        <div className="border-b-2 border-l-2 border-t-2 h-[50px] w-[200px] border-black/10 flex gap-4 justify-start pl-3 items-center cursor-pointer">
          <CiViewList className="text-3xl" />
          <p>List items</p>
        </div>{" "}
      </Link>

      <Link href={"/orders"}>
        <div className="border-b-2 border-l-2 border-t-2 h-[50px] w-[200px] border-black/10 flex gap-4 justify-start pl-3 items-center cursor-pointer">
          <PiHandbagSimpleDuotone className="text-3xl" />
          <p>Orders</p>
        </div>{" "}
      </Link>
    </div>
  );
};

export default Sidebar;
