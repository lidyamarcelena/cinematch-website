"use client";

import { useEffect, useState } from "react";
import { LogOut, Trash2 } from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";

type User = {
  id: number;
  name: string;
  email: string;
  gender: string;
  ttl: string;
};

export default function Settings() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = () => {
      const savedUser = localStorage.getItem("user");

      if (!savedUser) {
        return;
      }

      try {
        const parsedUser = JSON.parse(savedUser);

        setUser({
          id: parsedUser.id,
          name: parsedUser.name || "",
          email: parsedUser.email || "",
          gender: parsedUser.gender || "",
          ttl: parsedUser.ttl || "",
        });
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };

    loadUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return dateString;
    }

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#121212] text-white">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="px-[45px] pb-[50px] pt-[45px]">

          {/* TITLE */}
          <h1 className="relative top-[20px] left-[20px] font-[Poppins] text-[35px] font-semibold leading-none">
            Settings
          </h1>

          {/* CONTENT */}
          <div className="relative top-[20px] left-[20px] mt-[45px] max-w-[1300px]">

            {/* ACCOUNT */}
            <section>
              <h2 className="relative top-[15px] left-[5px] font-[Poppins] text-[14px] font-medium">
                Account
              </h2>

              <div className="relative top-[25px] mt-[18px] overflow-hidden rounded-[12px] border border-[#2B2B2B] bg-[#1B1B1B]">

                {/* EMAIL */}
                <div className="relative left-[5px] flex min-h-[72px] items-center justify-between border-b border-[#2B2B2B] px-[25px]">
                  <div>
                    <p className="font-[Poppins] text-[14px] font-medium text-white">
                      Email
                    </p>

                    <p className="mt-[4px] font-[Poppins] text-[12px] text-[#8E8E8E]">
                      {user?.email || "-"}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="relative right-[25px] rounded-full bg-[#2B2B2B] px-[16px] py-[7px] font-[Poppins] text-[11px] font-medium text-white transition-all duration-200 hover:bg-[#3A3A3A]"
                  >
                    Change
                  </button>
                </div>

                {/* PASSWORD */}
                <div className="relative left-[5px] flex min-h-[72px] items-center justify-between px-[25px]">
                  <div>
                    <p className="font-[Poppins] text-[14px] font-medium text-white">
                      Password
                    </p>

                    <p className="mt-[4px] font-[Poppins] text-[12px] tracking-[3px] text-[#8E8E8E]">
                      ••••••••••
                    </p>
                  </div>

                  <button
                    type="button"
                    className="relative right-[25px] rounded-full bg-[#2B2B2B] px-[16px] py-[7px] font-[Poppins] text-[11px] font-medium text-white transition-all duration-200 hover:bg-[#3A3A3A]"
                  >
                    Change
                  </button>
                </div>
              </div>
            </section>

            {/* PERSONAL INFORMATION */}
            <section className="mt-[40px]">
              <h2 className="relative top-[35px] left-[5px] font-[Poppins] text-[14px] font-medium">
                Personal Information
              </h2>

              <div className="relative top-[45px] mt-[18px] overflow-hidden rounded-[12px] border border-[#2B2B2B] bg-[#1B1B1B]">

                {/* NAME */}
                <div className="relative left-[5px] flex min-h-[72px] items-center justify-between border-b border-[#2B2B2B] px-[25px]">
                  <div>
                    <p className="font-[Poppins] text-[14px] font-medium text-white">
                      Name
                    </p>

                    <p className="mt-[4px] font-[Poppins] text-[12px] text-[#8E8E8E]">
                      {user?.name || "-"}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="relative right-[35px] rounded-full bg-[#2B2B2B] px-[16px] py-[7px] font-[Poppins] text-[11px] font-medium text-white transition-all duration-200 hover:bg-[#3A3A3A]"
                  >
                    Edit
                  </button>
                </div>

                {/* DATE OF BIRTH */}
                <div className="relative left-[5px] flex min-h-[72px] items-center justify-between border-b border-[#2B2B2B] px-[25px]">
                  <div>
                    <p className="font-[Poppins] text-[14px] font-medium text-white">
                      Date of Birth
                    </p>

                    <p className="mt-[4px] font-[Poppins] text-[12px] text-[#8E8E8E]">
                      {formatDate(user?.ttl || "")}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="relative right-[35px] rounded-full bg-[#2B2B2B] px-[16px] py-[7px] font-[Poppins] text-[11px] font-medium text-white transition-all duration-200 hover:bg-[#3A3A3A]"
                  >
                    Edit
                  </button>
                </div>

                {/* GENDER */}
                <div className="relative left-[5px] flex min-h-[72px] items-center justify-between px-[25px]">
                  <div>
                    <p className="font-[Poppins] text-[14px] font-medium text-white">
                      Gender
                    </p>

                    <p className="mt-[4px] font-[Poppins] text-[12px] text-[#8E8E8E]">
                      {user?.gender || "-"}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="relative right-[35px] rounded-full bg-[#2B2B2B] px-[16px] py-[7px] font-[Poppins] text-[11px] font-medium text-white transition-all duration-200 hover:bg-[#3A3A3A]"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </section>

            {/* ACCOUNT ACTIONS */}
            <section className="mt-[40px]">
              <h2 className="relative top-[50px] left-[5px] font-[Poppins] text-[14px] font-medium">
                Account Actions
              </h2>

              <div className="relative top-[55px] left-[5px] mt-[18px] overflow-hidden rounded-[12px] border border-[#2B2B2B] bg-[#1B1B1B]">

                {/* LOG OUT */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="group flex min-h-[65px] w-full items-center gap-[15px] border-b border-[#2B2B2B] px-[25px] text-left transition-all duration-200 hover:bg-[#242424]"
                >
                  <LogOut
                    size={18}
                    strokeWidth={2}
                    className="text-[#8E8E8E] transition-colors duration-200 group-hover:text-white"
                  />

                  <div>
                    <p className="font-[Poppins] text-[14px] font-medium text-white">
                      Log Out
                    </p>

                    <p className="mt-[2px] font-[Poppins] text-[11px] text-[#8E8E8E]">
                      Sign out of your CineMatch account
                    </p>
                  </div>
                </button>

                {/* DELETE ACCOUNT */}
                <button
                  type="button"
                  className="group flex min-h-[65px] w-full items-center gap-[15px] px-[25px] text-left transition-all duration-200 hover:bg-[#242424]"
                >
                  <Trash2
                    size={18}
                    strokeWidth={2}
                    className="text-[#8E8E8E] transition-colors duration-200 group-hover:text-[#FF5C5C]"
                  />

                  <div>
                    <p className="font-[Poppins] text-[14px] font-medium text-[#FF5C5C]">
                      Delete Account
                    </p>

                    <p className="mt-[2px] font-[Poppins] text-[11px] text-[#8E8E8E]">
                      Permanently delete your CineMatch account
                    </p>
                  </div>
                </button>

              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}