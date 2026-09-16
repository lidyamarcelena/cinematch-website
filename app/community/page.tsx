"use client";

import Sidebar from "@/components/layout/Sidebar";

export default function Community() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#121212] text-white">
      <Sidebar />

      <main className="flex min-w-0 flex-1 items-center justify-center">
        <h1 className="font-[Poppins] text-[56px] font-normal tracking-tight text-white">
          Coming Soon
        </h1>
      </main>
    </div>
  );
}