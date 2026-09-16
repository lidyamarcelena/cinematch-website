"use client";

import { Search, CircleUserRound } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="pt-8 pb-16 select-none">
      <div className="flex items-center">

        {/* Left */}
        <div className="ml-6 mb-0">
          <h1
            className="
              relative
              top-2
              text-[32px]
              font-bold
              leading-[56px]
              tracking-[-1px]
              text-white
            "
          >
            {title}
          </h1>

          <p
            className="
              mt-2
              text-[16px]
              font-medium
              text-[#A3A3A3]
            "
          >
            {subtitle}
          </p>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right */}
        <div className="flex items-start pt-10 gap-10">
          <div
            className="
              flex
              h-[34px]
              w-[345px]
              items-center
              rounded-full
              bg-[#ECECEC]
              pr-10
              pl-10
              gap-5
            "
          >
            <div className="relative left-2">
              <Search size={16} className="text-[#6B6B6B]" />
            </div>

            <input
              type="text"
              placeholder="Search"
              className="
                flex-1
                ml-3
                bg-transparent
                text-[14px]
                text-black
                placeholder:text-[#777]
                outline-none
              "
            />
          </div>

          <button
            className="
              flex
              h-[40px]
              w-[40px]
              items-center
              justify-center
              rounded-full
              border
              border-[#444]
              transition-all
              hover:border-cyan-400
            "
          >
            <CircleUserRound size={28} className="text-white" />
          </button>
        </div>
      </div>
    </header>
  );
}