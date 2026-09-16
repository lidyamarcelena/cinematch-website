"use client";

import { FormEvent, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Login failed");
        return;
      }

      if (data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            gender: data.user.gender,
            ttl: data.user.ttl,
          })
        );
      }

      alert("Login successful!");

      window.location.href = "/";
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[#121212] px-6 py-10 text-white">
      <div className="w-full max-w-[540px]">

        {/* LOGO */}
        <div className="relative top-[-55px] mb-[32px] flex justify-center">
          <img
            src="/logo.png"
            alt="CineMatch"
            className="h-[52px] w-auto object-contain"
          />
        </div>

        {/* TITLE */}
        <div className="mb-[45px] text-center">
          <h1 className="text-[32px] font-bold leading-tight text-white">
            Welcome back
          </h1>

          <p className="mt-[14px] text-[14px] text-[#A8A8A8]">
            Log in to your CineMatch account
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="px-[34px] py-[32px]"
        >

          {/* EMAIL */}
          <div className="mb-[19px]">
            <label
              htmlFor="email"
              className="relative bottom-[5px] mb-[8px] block text-[14px] font-medium text-white"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="
                h-[48px]
                w-full
                rounded-[10px]
                border
                border-[#3A3A3A]
                bg-[#292929]
                indent-[5px]
                text-[14px]
                text-white
                outline-none
                placeholder:text-[#777]
                transition
                focus:border-[#67E8F9]
              "
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-[19px]">
            <label
              htmlFor="password"
              className="relative top-[10px] mb-[8px] block text-[14px] font-medium text-white"
            >
              Password
            </label>

            <div className="relative top-[15px]">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="
                  h-[48px]
                  w-full
                  rounded-[10px]
                  border
                  border-[#3A3A3A]
                  bg-[#292929]
                  indent-[5px]
                  pr-[48px]
                  text-[14px]
                  text-white
                  outline-none
                  placeholder:text-[#777]
                  transition
                  focus:border-[#67E8F9]
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute
                  right-[14px]
                  top-1/2
                  flex
                  -translate-y-1/2
                  items-center
                  justify-center
                  text-[#888]
                  transition
                  hover:text-[#67E8F9]
                "
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>
            </div>
          </div>

          {/* FORGOT PASSWORD */}
          <div className="relative top-[25px] text-right">
            <a
              href="/forgot-password"
              className="text-[13px] font-medium text-[#67E8F9] transition hover:text-[#8AF0FC]"
            >
              Forgot password?
            </a>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="
              relative
              top-[50px]
              h-[38px]
              w-full
              rounded-[20px]
              bg-[#67E8F9]
              text-[14px]
              font-bold
              text-[#121212]
              transition
              duration-200
              hover:bg-[#8AF0FC]
              active:scale-[0.99]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          {/* REGISTER LINK */}
          <p className="relative top-[57px] mt-[22px] text-center text-[13px] text-[#A8A8A8]">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-semibold text-[#67E8F9] transition hover:text-[#8AF0FC]"
            >
              Create account
            </a>
          </p>
        </form>

        {/* FOOTER */}
        <p className="relative top-[60px] mt-[22px] text-center text-[11px] text-[#666]">
          © 2026 CineMatch. All rights reserved.
        </p>

      </div>
    </main>
  );
}