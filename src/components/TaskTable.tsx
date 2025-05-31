import React from "react";
import { dummyTasks } from "../mockData/tasks";
import {
  colorClassMapTaskPriority,
  colorClassMapTaskStatus,
} from "../constants/colorMap";
import HightedText from "./HightedText";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";

export type TaskTableProps = {
  status: string | null;
};

const TaskTable: React.FC<TaskTableProps> = ({ status = "all" }) => {
  const getFormattedDate = (dt: string) => {
    const date = new Date(dt);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const yyyy = date.getFullYear();

    return `${dd}-${mm}-${yyyy}`;
  };

  const data = dummyTasks.filter(
    (task) => !status || status === "all" || task.status === status
  );

  return (
    <article className="text-main flex justify-center items-center ">
      {data.length ? (
        <table
          aria-label="Task List Table"
          className="w-full text-sm  table-fixed  rtl:text-right border-collapse overflow-x-auto"
        >
          <tbody className=" px-4 py-4">
            {data.map((task) => (
              <tr
                key={task._id}
                tabIndex={0}
                className="border-b-2 border-sidebar-selected"
              >
                <td className="font-semibold text-left py-4">{task.title}</td>
                <td className=" text-left px-4 py-4">
                  {
                    <HightedText
                      text={task.priority}
                      style={colorClassMapTaskPriority[task.priority]}
                    />
                  }
                </td>
                <td className="text-left px-4 py-4">
                  {getFormattedDate(task.deadLine)}
                </td>
                <td className="text-left px-4 py-4">{task.tag}</td>
                <td className="text-left px-4 py-4">
                  {
                    <HightedText
                      text={task.status}
                      style={colorClassMapTaskStatus[`status-${task.status}`]}
                    />
                  }
                </td>

                <td className="w-16 flex gap-4 justify-end  px-4 py-4">
                  <div className="flex justify-end items-center gap-2">
                    <button
                      aria-label="Edit Task"
                      type="button"
                      className="text-main text-xl p-1 rounded hover:bg-sidebar-selected focus:outline-none focus:ring-2 focus:ring-btn-primary transition"
                    >
                      <Link to={`/edit-task/${task._id}`}>
                        <MdOutlineModeEdit />
                      </Link>
                    </button>
                    <button
                      aria-label="Delete Task"
                      type="button"
                      className="text-status-overdue text-xl p-1 rounded hover:bg-status-overdue hover:text-primary-bg focus:outline-none focus:ring-2 focus:ring-status-overdue transition"
                    >
                      {<MdDeleteOutline />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h3 className="text-main text-center text-lg font-medium">
          Data is empty for status{" "}
          <span className="font-bold underline">{status}</span>
        </h3>
      )}
    </article>
  );
};

export default React.memo(TaskTable);
