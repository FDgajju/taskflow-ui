import React, { useState } from "react";
import AuthContainer from "../components/AuthContainer";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { getPasswordStrength } from "../utils/passwordStrength";
import Button from "../components/Button";

import { CheckmarkIcon } from "react-hot-toast";

const strengthColors: Record<string, string> = {
  weak: "bg-status-overdue",
  medium: "bg-status-inprogress",
  good: "bg-status-todo",
  strong: "bg-status-done",
};

const FinishSettingAccount = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { level, percentage } = getPasswordStrength(password);

  const heading = (
    <div className="text-center">
      <p className="flex justify-center items-center gap-2">
        <span>Email Address is verified</span>
        <span className="text-status-done">
          <CheckmarkIcon />
        </span>
      </p>
      <p className="text-xs text-center font-medium text-main/90">
        Finish setting up your account
      </p>
    </div>
  );

  return (
    <AuthContainer heading={heading}>
      <div className="flex flex-col items-start mt-5">
        <p className="text-sm text-center font-medium text-main/90">
          Email address
        </p>

        <p className="font-bold">youser@gmail.com</p>
      </div>

      <form action="#" className="w-full mt-5 flex flex-col gap-3">
        {/* fullname input */}
        <div className="flex flex-col items-start">
          <label
            htmlFor="full-name"
            className="text-sm text-center font-medium text-main/90"
          >
            Full name
          </label>
          <input
            type="text"
            id="full-name"
            placeholder="Enter your full name"
            className="text-main w-full text-sm p-2 outline-none border-1 border-main/50 focus:border-btn-primary rounded-sm"
          />
        </div>

        {/* username input */}
        <div className="flex flex-col items-start">
          <label
            htmlFor="username"
            className="text-sm text-center font-medium text-main/90"
          >
            username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter username"
            className="text-main w-full text-sm p-2 outline-none border-1 border-main/50 focus:border-btn-primary rounded-sm"
          />
        </div>
        {/*  */}
        {/* password input */}
        <div>
          <label
            htmlFor="password"
            className="text-sm text-center font-medium text-main/90"
          >
            Password
          </label>

          <div className=" flex flex-col gap-1">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full text-main text-sm p-2 pr-10 outline-none border-1 border-main/50 focus:border-btn-primary rounded-sm"
                placeholder="Create password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer absolute inset-y-0 right-0 flex items-center justify-center h-full px-3"
                tabIndex={-1}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="w-full bg-gray-text/50 h-1 rounded-full overflow-hidden transition-all">
              <div
                style={{ width: `${percentage}%` }}
                className={`h-1 transition-all duration-200 ${
                  strengthColors[level as string]
                }`}
              />
            </div>
            <p className="text-xs text-main/70">
              Use at least 8 characters, including uppercase, lowercase,
              numbers, and symbols for a strong password.
            </p>
          </div>
        </div>

        <Button type="submit">Sign Up</Button>
      </form>
    </AuthContainer>
  );
};

export default FinishSettingAccount;
