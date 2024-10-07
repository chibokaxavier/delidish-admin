"use client";
import Link from "next/link";
import React from "react";
import Nav from "@/components/Nav";
// import { Button } from "@nextui-org/react";

import MobileNav from "./MobileNav";
import { GiFoodTruck } from "react-icons/gi";
import { CiSearch } from "react-icons/ci";
import { FaShoppingBasket } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";

const Header = () => {
  return (
    <header className="py-8  lg:mx-20 sm:mx-10 mx-5">
      <div className=" flex justify-between items-center">
        <Link href={"/"}>
          <h1 className="md:text-4xl text-2xl font-semibold text-rose-600">
            <span className="flex gap-2 items-center justify-center">
              {" "}
              <GiFoodTruck className="md:text-5xl text-4xl mb-4" />{" "}
              <span className="">DeliDish</span>
              <span className="text-accent">.</span>
            </span>
          </h1>
        </Link>
        <div className="flex items-center">
          <div className="flex md:gap-7 gap-3 relative justify-center items-center">
            <RxAvatar className=" cursor-pointer md:text-4xl text-2xl mr-3" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
