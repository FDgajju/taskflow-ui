import React, { useEffect } from "react";
import type { TaskT } from "../types/task";
import HightedText from "./HightedText";
import {
  colorClassMapTaskStatus,
  colorClassMapTaskStatusText,
} from "../constants/colorMap";
import Loader from "./Loader";

const DebounceTasks: React.FC<{
  tasks: TaskT[];
  handleClick: (id: string) => void;
  handleClose: () => void;
  loading: boolean;
}> = ({ tasks, handleClick, loading, handleClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="absolute bottom-16 w-full z-10 max-h-80 flex flex-col gap-1">
      <button
        onClick={handleClose}
        type="button"
        className="py-0.5 px-1.5 bg-status-overdue-secondary font-bold text-status-overdue focus:ring-2 focus:right-status-overdue block w-fit cursor-pointer rounded-lg text-xs self-start"
      >
        Close
      </button>
      <div className="text-main border-1 border-btn-primary/50 drop-shadow-md drop-shadow-main/40 bg-secondary-bg rounded-xl p-3 flex flex-col gap-1  overflow-y-auto">
        {!loading && !tasks.length && (
          <div className="flex justify-center items-center">
            <span className="text-gray-text font-bold">No data found!</span>
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        )}
        {!loading &&
          tasks.map((task) => (
            <div
              onClick={() => handleClick(task._id)}
              key={task._id}
              className="text-main font-semibold py-2 px-2 hover:rounded-md hover:bg-sidebar-selected flex gap-2 items-center justify-between text-sm border-b-1 border-main/20 transition-all duration-200"
            >
              <div className="flex items-center w-full gap-3 ">
                <HightedText
                  text={task.ticket as string}
                  className="text-sm bg-main/20 py-0.5 "
                />
                <p className="w-1/2 text-start">{task.title}</p>
              </div>
              <HightedText
                text={task.status as string}
                className={`text-sm ${
                  colorClassMapTaskStatus[`${task.status}_secondary`]
                } ${colorClassMapTaskStatusText[task.status]} py-0.5 `}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default DebounceTasks;
