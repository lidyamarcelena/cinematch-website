"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Film,
  Trophy,
  Users,
  Settings,
} from "lucide-react";

const menus = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Your Movies",
    href: "/your-movies",
    icon: Film,
  },
  {
    title: "Rankings",
    href: "/rankings",
    icon: Trophy,
    },
  {
    title: "Community",
    href: "/community",
    icon: Users,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-[180px] select-none flex-col justify-between border-r border-[#2B2B2B] bg-[#1B1B1B]">

      {/* Top */}
      <div>

        {/* Logo */}
        <div className="flex h-[100px] items-center pr-5 pl-8 pt-8">
          <Image
            src="/logo.png"
            alt="CineMatch"
            width={170}
            height={44}
            priority
          />
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-2 px-3">

          {menus.map((menu) => {
            const Icon = menu.icon;
            const active = pathname === menu.href;

            return (
              <Link
                key={menu.title}
                href={menu.href}
                className={`flex h-[48px] items-center gap-4 rounded-xl px-5 transition-all duration-200 ${
                  active
                    ? "bg-[#262626] text-white"
                    : "text-[#8E8E8E] hover:bg-[#242424] hover:text-white"
                }`}
              >
                <Icon
                  size={20}
                  strokeWidth={2}
                  className="relative left-2 shrink-0"
                />

                <span className="text-[15px] font-medium">
                  {menu.title}
                </span>
              </Link>
            );
          })}

        </nav>
      </div>

      {/* Bottom */}
      <div className="relative bottom-[20px] px-3 pb-6">

        <Link
          href="/settings"
          className="
            flex
            h-[48px]
            items-center
            gap-4
            rounded-xl
            px-5
            text-[#8E8E8E]
            transition-all
            duration-200
            hover:bg-[#242424]
            hover:text-white
          "
        >
          <Settings
            size={20}
            strokeWidth={2}
            className="relative left-2 shrink-0"
          />

          <span className="text-[15px] font-medium">
            Settings
          </span>
        </Link>

      </div>

    </aside>
  );
}