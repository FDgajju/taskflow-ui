import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import H2 from "../components/H2";

import BackgroundImagePath from "/bg1.png";

import TaskFlowIcon from "/menu.png";

const ResetPassword: React.FC = () => {
  return (
    <div
      className="w-full flex items-center justify-center"
      style={{
        backgroundImage: `url("${BackgroundImagePath}")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className=" text-main w-1/4 flex flex-col items-center justify-center bg-white p-4 shadow-md shadow-main/20 rounded-md">
        <div className="flex items-center justify-center gap-5 w-full mt-4">
          <img src={TaskFlowIcon} alt="icon" className="w-10" />
          <H2 text="TaskFlow" className="text-[2.5rem] tracking-wider" />
        </div>

        <div className="flex flex-col w-full justify-center items-center p-5">
          <p className="text-main text-md font-semibold p-2">Can't login ?</p>

          {/* form */}
          <form action="#" className="w-full flex flex-col gap-2 mt-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-main text-sm font-medium">
                We'll send a recovery link to{" "}
                <span className="text-status-overdue">*</span>
              </label>
              <input
                type="email"
                id="email"
                className="text-main text-sm p-2 outline-none border-1 border-main/50 focus:border-btn-primary rounded-sm"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" className="" />
              <label
                htmlFor="remember"
                className="text-main text-sm font-medium"
              >
                Remember me
              </label>
            </div>

            <Button type="submit" className="rounded-sm">
              <span className="font-medium">Continue</span>
            </Button>
          </form>

          <div className="flex items-center justify-center gap-2 p-3 text-sm text-btn-primary mt-4">
            <p>
              <Link to="/signin">Return to login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
