import React from "react";
import type { TaskT } from "../types/task";
import { MdOutlineAddLink } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import {
  colorClassMapTaskStatus,
  colorClassMapTaskStatusText,
} from "../constants/colorMap";

type DependencyRowProp = {
  depsData: Partial<TaskT>;
};

const DependencyRow: React.FC<DependencyRowProp> = ({ depsData }) => {

  return (
    <NavLink
      to={`/task/${depsData._id}`}
      className="bg-secondary-bg p-2 flex rounded-2xl text-main border-1 border-gray-text/20 hover:border-btn-primary/40"
    >
      <div className="p-2 w-3/8 flex items-center gap-2 font-semibold">
        <span>
          <MdOutlineAddLink />
        </span>
        <p>{depsData.title}</p>
      </div>

      <div className="w-2/8 flex items-center">
        <p
          className={`${
            colorClassMapTaskStatusText[depsData.status || "todo"]
          } ${
            colorClassMapTaskStatus[`${depsData.status || "todo"}_secondary`]
          } py-0.5 px-1.5 rounded-lg text-sm font-bold  `}
        >
          {depsData.status}
        </p>
      </div>

      <div className="w-2/8 flex flex-col items-start justify-center">
        <span className="text-xs text-gray-text">Due</span>
        <span className="text-sm">{depsData.deadLine}</span>
      </div>

      <p className="w-1/8 flex items-center justify-end hover:text-btn-primary p-2">
        <FaArrowRight />
      </p>
    </NavLink>
  );
};

export default DependencyRow;
