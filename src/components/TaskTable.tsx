import React, { useCallback, useEffect, useState } from "react";
import {
  colorClassMapTaskPriority,
  colorClassMapTaskStatus,
} from "../constants/colorMap";
import HightedText from "./HightedText";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { apiEndpoint } from "../constants/env";
import { getFormattedDate } from "../utils/getFormatedDate";
import axios, { AxiosError } from "axios";
import type { TaskT } from "../types/task";
import toast from "react-hot-toast";
import TaskDeleteConfirmation from "./TaskDeleteConfirmation";
// import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// const LoadingHandAnimation = "/animation_file/loading_hand.lottie";

export type TaskTableProps = {
  status: string | null;
};

const TaskTable: React.FC<TaskTableProps> = ({ status = "all" }) => {
  const [data, setData] = useState<TaskT[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [taskDeleteId, setTaskDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);

  // fetching data
  const fetchData = useCallback(async () => {
    try {
      const resp = await axios.get(`${apiEndpoint}/task?status=${status}`);
      if (String(resp.status).startsWith("2")) setData(resp.data.data);
      else if (String(resp.status).startsWith("4"))
        toast.error(resp.data.error);
      else toast.error("Something unexpected happen, please contact admin!");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.error || error.message);
      } else {
        toast.error("An unknown error occurred, please contact admin!");
      }
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    const controller = new AbortController();

    setData([]);
    setLoading(true);
    fetchData();

    return () => controller.abort();
  }, [status, fetchData]);

  // delete confirm
  const handleDeleteConfirm = () => {
    setDeleting(true);
    //
    (async () => {
      try {
        const resp = await axios.delete(`${apiEndpoint}/task/${taskDeleteId}`);

        if (String(resp.status).startsWith("2")) {
          setData((prev) => prev.filter((t) => t._id !== taskDeleteId));
          toast.success(`Task deleted: ${taskDeleteId}`);
        } else if (String(resp.status).startsWith("4"))
          toast.error(resp.data.error);
        else toast.error("Something unexpected happen, please contact admin!");
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.error || error.message);
        } else {
          toast.error("An unknown error occurred, please contact admin!");
        }
      } finally {
        setTimeout(() => {
          setTaskDeleteId(null);
          setDeleteConfirmation(false);
          setDeleting(false);
        }, 500);
      }
    })();
  };

  // delete cancel
  const handleDeleteCancel = () => {
    toast.success("Task delete cancelled ❌");
    setTaskDeleteId(null);
    setDeleteConfirmation(false);
  };

  return (
    <article className="text-main flex flex-col justify-center items-center">
      {/* only when data is not loaded */}
      {loading && (
        <div aria-live="polite" className="w-full mt-10 p-10">
          {/* <DotLottieReact loop autoplay src={LoadingHandAnimation} /> */}
          <table className="w-full text-sm table-fixed rtl:text-right border-collapse overflow-x-auto animate-pulse">
            <tbody>
              {Array.from({ length: 5 }).map((_, idx) => (
                <tr key={idx}>
                  {[...Array(6)].map((_, cellIdx) => (
                    <td
                      key={cellIdx}
                      className="h-8 bg-gray-200 rounded animate-pulse my-2"
                    ></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {deleteConfirmation && (
        <TaskDeleteConfirmation
          deleting={deleting}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
          id={taskDeleteId as string}
          title="Delete Task"
        />
      )}

      {data.length !== 0 && (
        <table
          aria-live="polite"
          aria-label="Task List Table"
          className="w-full text-sm  table-fixed  rtl:text-right border-collapse overflow-x-auto"
        >
          <tbody className=" px-4 py-4">
            {data.map((task) => (
              <tr
                key={task._id}
                tabIndex={0}
                className="hover:bg-sidebar-selected  border-b-2 border-sidebar-selected"
              >
                <td className="font-semibold text-left py-4">
                  <Link to={`/task/${task._id}`}>{task.title}</Link>
                </td>
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
                <td className="text-left px-4 py-4">{task.tag || "-"}</td>
                <td className="text-left px-4 py-4">
                  {
                    <HightedText
                      text={task.status || "#"}
                      style={colorClassMapTaskStatus[task.status || "todo"]}
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
                      onClick={() => {
                        setDeleteConfirmation(true);
                        setTaskDeleteId(task._id);
                      }}
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
      )}

      {data.length === 0 && !loading && (
        <h3
          aria-live="polite"
          className="text-main text-center text-lg font-medium p-10 mt-20"
        >
          Data is empty for status{" "}
          <span className="font-bold underline">{status}</span>
        </h3>
      )}
    </article>
  );
};

export default React.memo(TaskTable);
