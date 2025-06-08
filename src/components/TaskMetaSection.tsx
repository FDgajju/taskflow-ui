import React from "react";
import { LuCalendar1 } from "react-icons/lu";
import { prettyDate } from "../utils/getFormatedDate";
import type { TaskT } from "../types/task";
import {
  colorClassMapTaskPriority,
  colorClassMapTaskPriorityText,
} from "../constants/colorMap";
import { FaExclamation } from "react-icons/fa";
import { CgTag } from "react-icons/cg";
import { HiMiniFaceSmile } from "react-icons/hi2";

const TaskMetaSection: React.FC<{ taskDetails: Partial<TaskT> }> = ({ taskDetails }) => {
  return (
    <article className="pt-2 grid grid-cols-1 lg:grid-cols-2 gap-3 ">
      {/* due date */}
      <div className="bg-secondary-bg p-3 rounded-3xl flex gap-5">
        <div className="p-4 flex justify-center items-center bg-btn-secondary rounded-2xl text-btn-primary">
          <LuCalendar1 className="text-3xl" />
        </div>
        <div className="flex flex-col justify-evenly">
          <p className="text-xl font-semibold">Due Date</p>
          <p className="text-sm text-gray-text font-medium italic">
            {prettyDate(taskDetails?.deadLine || "")}
          </p>
        </div>
      </div>

      {/* priority date */}
      <div className="bg-secondary-bg p-3 rounded-3xl flex gap-5">
        <div
          className={`${
            colorClassMapTaskPriority[
              `${taskDetails?.priority || "low"}_secondary`
            ]
          } ${
            colorClassMapTaskPriorityText[`${taskDetails?.priority || "low"}`]
          } p-4 flex justify-center items-center bg-btn-secondary rounded-2xl text-btn-primary`}
        >
          <FaExclamation className="text-3xl" />
        </div>
        <div className="flex flex-col justify-evenly">
          <p className="text-xl font-semibold">Priority</p>
          <p
            className={`${
              colorClassMapTaskPriorityText[taskDetails?.priority || "low"]
            } text-sm text-gray-text font-medium italic`}
          >
            {taskDetails?.priority}
          </p>
        </div>
      </div>

      {/* priority date */}
      <div className="bg-secondary-bg p-3 rounded-3xl flex gap-5">
        <div className="p-4 flex justify-center items-center bg-btn-secondary rounded-2xl text-btn-primary">
          <CgTag className="text-3xl" />
        </div>
        <div className="flex flex-col justify-evenly">
          <p className="text-xl font-semibold">Tag</p>
          <p className="text-sm text-gray-text font-medium italic">
            {taskDetails?.tag}
          </p>
        </div>
      </div>
      <div className="bg-secondary-bg p-3 rounded-3xl flex gap-5">
        {/* will replace with original profile picture */}
        <div className="p-4 flex justify-center items-center bg-btn-secondary rounded-2xl text-btn-primary">
          <HiMiniFaceSmile className="text-3xl" />
        </div>
        <div className="flex flex-col justify-evenly">
          <p className="text-xl font-semibold">Assignee</p>
          {taskDetails?.assignedTo && (
            <p className="text-sm text-gray-text font-medium italic">
              {taskDetails.assignedTo}
            </p>
          )}
          {!taskDetails?.assignedTo && (
            <p className="text-sm italic font-bold text-btn-primary">
              Assign Someone
            </p>
          )}
        </div>
      </div>
    </article>
  );
};

export default TaskMetaSection;
