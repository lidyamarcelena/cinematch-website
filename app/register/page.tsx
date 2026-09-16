"use client";

import { FormEvent, useState } from "react";
import { Eye, EyeOff, CalendarDays, ChevronDown } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [ttl, setTtl] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          gender,
          ttl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      alert("Account created successfully!");

      window.location.href = "/login";
    } catch (error) {
      console.error("Register error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[#121212] px-6 py-10 text-white">
      <div className="w-full max-w-[540px]">

        {/* LOGO */}
        <div className="relative bottom-[60px] mb-[32px] flex justify-center">
          <img
            src="/logo.png"
            alt="CineMatch"
            className="h-[52px] w-auto object-contain"
          />
        </div>

        {/* TITLE */}
        <div className="mb-[45px] text-center">
          <h1 className="relative bottom-[60px] text-[32px] font-bold leading-tight text-white">
            Create your account
          </h1>

          <p className="relative bottom-[60px] mt-[14px] text-[14px] text-[#A8A8A8]">
            Join CineMatch and keep track of your movies
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="px-[34px] py-[32px]"
        >

          {/* NAME */}
          <div className="relative bottom-[10px] mb-[19px]">
            <label
              htmlFor="name"
              className="relative bottom-[5px] mb-[8px] block text-[14px] font-medium text-white"
            >
              Name
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
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

          {/* EMAIL */}
          <div className="relative top-[5px] mb-[19px]">
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
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>
            </div>
          </div>

          {/* GENDER */}
          <div className="mb-[19px]">
            <label
              htmlFor="gender"
              className="relative top-[20px] mb-[8px] block text-[14px] font-medium text-white"
            >
              Gender
            </label>

            <div className="relative top-[25px]">
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
                className="
                  h-[48px]
                  w-full
                  appearance-none
                  rounded-[10px]
                  border
                  border-[#3A3A3A]
                  bg-[#292929]
                  indent-[5px]
                  pr-[45px]
                  text-[14px]
                  text-white
                  outline-none
                  transition
                  focus:border-[#67E8F9]
                "
              >
                <option
                  value=""
                  disabled
                  className="bg-[#292929]"
                >
                  Select your gender
                </option>

                <option
                  value="Male"
                  className="bg-[#292929]"
                >
                  Male
                </option>

                <option
                  value="Female"
                  className="bg-[#292929]"
                >
                  Female
                </option>

                <option
                  value="Other"
                  className="bg-[#292929]"
                >
                  Other
                </option>

                <option
                  value="Prefer not to say"
                  className="bg-[#292929]"
                >
                  Prefer not to say
                </option>
              </select>

              <ChevronDown
                size={19}
                className="
                  pointer-events-none
                  absolute
                  right-[15px]
                  top-1/2
                  -translate-y-1/2
                  text-[#888]
                "
              />
            </div>
          </div>

          {/* DATE OF BIRTH */}
          <div className="mb-[27px]">
            <label
              htmlFor="ttl"
              className="relative top-[30px] mb-[8px] block text-[14px] font-medium text-white"
            >
              Date of Birth
            </label>

            <div className="relative top-[35px]">
              <input
                id="ttl"
                type="date"
                value={ttl}
                onChange={(e) => setTtl(e.target.value)}
                required
                className="
                  h-[48px]
                  w-full
                  appearance-none
                  rounded-[10px]
                  border
                  border-[#3A3A3A]
                  bg-[#292929]
                  px-[15px]
                  pr-[48px]
                  text-[14px]
                  text-white
                  outline-none
                  transition
                  focus:border-[#67E8F9]
                  [&::-webkit-calendar-picker-indicator]:opacity-0
                  [&::-webkit-datetime-edit]:relative
                  [&::-webkit-datetime-edit]:left-[5px]
                "
              />

              <button
                type="button"
                onClick={() => {
                  const input = document.getElementById(
                    "ttl"
                  ) as HTMLInputElement;

                  input?.showPicker?.();
                }}
                className="
                  absolute
                  right-[15px]
                  top-1/2
                  flex
                  -translate-y-1/2
                  items-center
                  justify-center
                  text-[#888]
                  transition
                  hover:text-[#67E8F9]
                "
                aria-label="Select date of birth"
              >
                <CalendarDays size={19} />
              </button>
            </div>
          </div>

          {/* CREATE ACCOUNT */}
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
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          {/* LOGIN */}
          <p className="relative top-[57px] mt-[22px] text-center text-[13px] text-[#A8A8A8]">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold text-[#67E8F9] transition hover:text-[#8AF0FC]"
            >
              Log in
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