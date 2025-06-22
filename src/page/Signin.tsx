import React from "react";
import Sign from "../components/Sign";

import BackgroundImagePath from "/bg1.png";

const Login: React.FC = () => {
  return (
    <div
      className="w-full flex items-center justify-center"
      style={{
        backgroundImage: `url("${BackgroundImagePath}")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Sign type="signin" heading="Login to continue"></Sign>
    </div>
  );
};

export default Login;
