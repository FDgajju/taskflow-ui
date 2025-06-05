import React, { useCallback, useEffect, useMemo, useState } from "react";
import { LuCalendar1, LuClipboardList } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { FaExclamation } from "react-icons/fa";
import { CgTag } from "react-icons/cg";
import { HiMiniFaceSmile } from "react-icons/hi2";

import Button from "../components/Button";
import HeadingCard from "../components/HeadingCard";
import type { TaskT } from "../types/task";
import { apiEndpoint } from "../constants/env";
import ButtonLink from "../components/ButtonLink";
import { prettyDate } from "../utils/getFormatedDate";
import TaskDeleteConfirmation from "../components/TaskDeleteConfirmation";
import H2 from "../components/H2";
import DisplayImage from "../components/DisplayImage";
import DependencyRow from "../components/DependencyRow";
import {
  colorClassMapTaskPriority,
  colorClassMapTaskPriorityText,
} from "../constants/colorMap";

const DUMMY_DEPS: Partial<TaskT>[] = [
  {
    _id: "68407e35d0934cf42ef8eec7",
    title: "This is Dummy Deps",
    priority: "low",
    status: "todo",
    deadLine: "2025-07-10",

    tag: "string",
    workspace: "string",
  },
  {
    _id: "68407e35d0934cf42ef8eec3",
    title: "This is Dummy Deps 2",
    priority: "high",
    status: "inprogress",
    deadLine: "2025-06-10",

    tag: "string",
    workspace: "string",
  },
];

const TaskDetails: React.FC = () => {
  const [data, setData] = useState<Partial<TaskT>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [taskDeleteId, setTaskDeleteId] = useState<string>("");
  const [showImage, setShowImage] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const { id } = useParams();
  const navigate = useNavigate();

  const taskDetails = useMemo<Partial<TaskT> | null>(() => data, [data]);

  const fetchData = useCallback(async () => {
    try {
      const resp = await axios(`${apiEndpoint}/task/${id}`);
      if (String(resp.status).startsWith("2")) setData(resp.data.data);
      else if (String(resp.status).startsWith("4")) {
        toast.error(resp.data.error);
        navigate("/tasks");
      } else {
        toast.error("Something unexpected happen, please contact admin!");
        navigate("/tasks");
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.error || error.message);
      } else {
        toast.error("An unknown error occurred, please contact admin!");
      }

      navigate("/tasks");
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    const controller = new AbortController();
    fetchData();
    return () => controller.abort();
  }, [id, fetchData]);

  // handle delete confirm
  const handleDeleteConfirm = async () => {
    setDeleting(true);
    try {
      const resp = await axios.delete(`${apiEndpoint}/task/${id}`);
      if (String(resp.status).startsWith("2")) {
        toast.success(`Task deleted: ${taskDetails?.title}`);
        setTimeout(() => {
          navigate("/tasks");
        }, 500);
      } else if (String(resp.status).startsWith("4"))
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
      setTimeout(() => {
        setDeleting(false);
        setTaskDeleteId("");
        setDeleteConfirmation(false);
      }, 500);
    }
  };

  return (
    <section className="w-full flex flex-col justify-center items-center">
      {loading && <span>Loading...</span>}
      {!loading && (
        <div className="w-3/4 p-4 flex flex-col">
          {/* heading */}
          <div className="flex justify-between align-middle items-center">
            <h2 className=" text-3xl font-bold text-main py-5">Overview</h2>
            <Button
              type="button"
              onClick={() => {
                navigate("/tasks");
              }}
              style="bg-btn-secondary"
            >
              <span className="text-btn-primary">Go Back</span>
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            {deleteConfirmation && (
              <TaskDeleteConfirmation
                deleting={deleting}
                id={taskDeleteId}
                onCancel={() => {
                  toast.success("Task delete cancelled ❌");
                  setDeleteConfirmation(false);
                  setTaskDeleteId("");
                }}
                onConfirm={handleDeleteConfirm}
              />
            )}

            {/* heading card */}
            <HeadingCard
              className="flex gap-4"
              highlightText={taskDetails?.status || "todo"}
              heading={taskDetails?.title || "Task Title"}
              text={taskDetails?.description || "Task Description"}
              icon={<LuClipboardList className="text-primary-bg text-2xl" />}
              color={taskDetails?.status || "todo"}
              highlightBg={`status-${taskDetails?.status}-secondary`}
            >
              <ButtonLink
                to={`/edit-task/${taskDetails?._id}`}
                type="button"
                className="text-primary-bg"
                text="Edit Task"
              />

              <Button
                type="button"
                onClick={() => {
                  setDeleteConfirmation(true);
                  setTaskDeleteId(taskDetails?._id || "");
                }}
                className="bg-status-overdue-secondary text-status-overdue focus:ring-2 focus:ring-status-overdue"
              >
                <span>Delete Task</span>
              </Button>
            </HeadingCard>

            {/* time stamps */}
            <div className="bg-secondary-bg flex flex-wrap gap-3 p-2 text-xs rounded-3xl">
              <p className=" border-gray-text py-0.5 px-1.5 rounded-lg text-gray-text font-semibold">
                Created:{" "}
                <span>{prettyDate(String(taskDetails?.createdAt))}</span>
              </p>
              {taskDetails?.updatedAt !== taskDetails?.createdAt && (
                <p className=" border-gray-text py-0.5 px-1.5 rounded-md text-gray-text font-semibold">
                  Updated:{" "}
                  <span>{prettyDate(String(taskDetails?.updatedAt))}</span>
                </p>
              )}
            </div>

            {/* main grid */}
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
                    colorClassMapTaskPriorityText[
                      `${taskDetails?.priority || "low"}`
                    ]
                  } p-4 flex justify-center items-center bg-btn-secondary rounded-2xl text-btn-primary`}
                >
                  <FaExclamation className="text-3xl" />
                </div>
                <div className="flex flex-col justify-evenly">
                  <p className="text-xl font-semibold">Priority</p>
                  <p
                    className={`${
                      colorClassMapTaskPriorityText[
                        taskDetails?.priority || "low"
                      ]
                    } text-sm text-gray-text font-medium italic font-semibold`}
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

            {/* attachments */}
            <div className="py-2">
              <H2 text="Attachments" />

              <div className="flex flex-nowrap gap-2 justify-start w-full items-center p-4 overflow-x-auto bg-secondary-bg rounded-3xl">
                {showImage && (
                  <DisplayImage
                    handleClose={() => {
                      setShowImage(false);
                      setImageUrl("");
                    }}
                    url={imageUrl}
                  />
                )}
                {taskDetails?.attachments &&
                  taskDetails?.attachments.length &&
                  taskDetails.attachments.map((url) => (
                    <div key={url}>
                      <img
                        src={url}
                        key={url}
                        className="h-[300px] min-w-[200px] object-cover rounded-2xl cursor-pointer hover:border-2 hover:border-btn-primary/50 transition-all duration-100 p-0.5"
                        alt="Attachment Image"
                        onClick={() => {
                          setShowImage(true);
                          setImageUrl(url);
                        }}
                      />
                    </div>
                  ))}

                {(!taskDetails?.attachments ||
                  (taskDetails.attachments &&
                    !taskDetails.attachments.length)) && (
                  <p className="text-sm text-gray-text">
                    There's no attachments{" "}
                    <span className="font-bold text-btn-primary">
                      Browse to upload
                    </span>
                  </p>
                )}
              </div>
            </div>

            {/* dependencies */}
            <div className="py-2">
              <H2 text="Dependencies" />
              <div className="flex flex-col gap-1 py-2">
                {DUMMY_DEPS &&
                  DUMMY_DEPS.map((dep) => (
                    <DependencyRow key={dep._id} depsData={dep} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TaskDetails;
