import React from "react";
import Sign from "../components/Sign";

const BackgroundImagePath = "/bg1.png";

const Signup = () => {
  return (
    <div
      className="w-full flex items-center justify-center"
      style={{
        backgroundImage: `url("${BackgroundImagePath}")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Sign type="signup" heading="Sign up to continue"></Sign>
    </div>
  );
};

export default Signup;
