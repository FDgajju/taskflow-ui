import React from "react";
import H2 from "./H2";
import Button from "./Button";
import { Link } from "react-router-dom";

const TaskFlowIcon = "/public/menu.png";
const GoogleIcon = "/public/Google_new.svg";
const MsIcon = "/public/MS.svg";

const Sign: React.FC<{ heading: string; type: "signin" | "signup" }> = ({
  heading,
  type = "signin",
}) => {
  return (
    <div className=" text-main w-1/4 flex flex-col items-center justify-center bg-white p-4 shadow-md shadow-main/20 rounded-md">
      <div className="flex items-center justify-center gap-5 w-full mt-4">
        <img src={TaskFlowIcon} alt="icon" className="w-10" />
        <H2 text="TaskFlow" className="text-[2.5rem] tracking-wider" />
      </div>

      <div className="flex flex-col w-full justify-center items-center p-5">
        <p className="text-main text-md font-semibold p-2">{heading}</p>

        {/* form */}
        <form action="#" className="w-full flex flex-col gap-2 mt-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-main text-sm font-medium">
              Email <span className="text-status-overdue">*</span>
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
            <label htmlFor="remember" className="text-main text-sm font-medium">
              Remember me
            </label>
          </div>

          <Button type="submit" className="rounded-sm">
            <span className="font-medium">Continue</span>
          </Button>
        </form>

        {/* option */}
        <p className="text-main/60 text-sm font-medium mt-2 p-3">
          Or continue with:
        </p>

        {/* options */}
        <div className="flex flex-col gap-4 w-full items-center justify-center">
          <div className="cursor-pointer hover:bg-secondary-bg border-1 border-main/50 w-full p-2 text-sm rounded-sm font-bold text-center flex items-center justify-center gap-2">
            <img src={GoogleIcon} alt="Google icon" className="w-5" />
            <span>Google</span>
          </div>
          <div className="cursor-pointer hover:bg-secondary-bg border-1 border-main/50 w-full p-2 text-sm rounded-sm font-bold text-center flex items-center justify-center gap-2">
            <img src={MsIcon} alt="Ms icon" className="w-5" />
            <span>Microsoft</span>
          </div>
        </div>

        {type === "signin" && (
          <div className="flex items-center justify-center gap-2 p-3 text-sm text-btn-primary mt-4">
            <p>
              <Link to="/resetpassword">Can't Login?</Link>
            </p>
            <span className="text-main/60">•</span>
            <p>
              <Link to="/signup">Create an account</Link>
            </p>
          </div>
        )}

        {type === "signup" && (
          <div className="flex items-center justify-center gap-2 p-3 text-sm text-btn-primary mt-4">
            <p>
              <Link to="/signin">Already have an TaskFlow account? Login</Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sign;
