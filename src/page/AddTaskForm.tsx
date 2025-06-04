import type React from "react";
// import { LuCalendarRange } from "react-icons/lu";
import { PRIORITIES } from "../constants/constants";
import { CiShoppingTag } from "react-icons/ci";
import { RiFlagLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineAddLink } from "react-icons/md";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState, type ChangeEvent, type FormEvent } from "react";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { apiEndpoint } from "../constants/env";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import type { TaskT } from "../types/task";

const ButtonSubmitLoading = "/animation_file/button-loading.lottie";

const formFullDivStyle = "flex flex-col gap-2";
const formInputStyle =
  "w-full bg-input-bg p-4 rounded-2xl  focus:outline-none focus:ring-1 focus:ring-btn-primary transition-all ease duration-300";
const formLabelStyle = "text-lg font-semibold";

const AddTaskForm: React.FC = () => {
  const [taskData, setTaskData] = useState<Partial<TaskT>>({
    priority: "low",
    status: "todo",
    workspace: "1234",
  });
  const [error, setError] = useState<Record<string, string | undefined>>({});
  const [loading, setLoading] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const navigate = useNavigate();

  const handleOnchange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setError((prev) => {
      prev[name as string] = undefined;
      return { ...prev };
    });
    setTaskData((task) => ({ ...task, [name]: value }));
  };

  // handle submit
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // setError({});
    setLoading(true);
    const newError: Record<string, string> = {};
    if (!taskData.title) newError.title = "Title is required!";

    if (!taskData.deadLine) newError.deadLine = "please specify the deadline!";
    console.log(newError);

    if (Object.keys(newError).length) {
      setError(newError);
      setLoading(false)
      return toast.error("Please fill all the required fields!");
    } else {
      (async () => {
        try {
          console.log(taskData);
          const resp = await axios.post(`${apiEndpoint}/task`, taskData);

          if (String(resp.status).startsWith("2"))
            toast.success("task created!");
          else if (String(resp.status).startsWith("4"))
            toast.error(resp.data.error);
          else
            toast.error("Something unexpected happen, please contact admin!");
        } catch (error) {
          console.log(error);
          if (error instanceof AxiosError)
            toast.error(error.response?.data.error);
          else toast.error("Unknown error occurs, please contact admin!");
        } finally {
          setFadeOut(true);
          setTimeout(() => {
            setLoading(false);
            setError({});
            setTaskData({});
            navigate("/tasks");
          }, 500);
        }
      })();
    }
  };

  return (
    <section className="w-full flex justify-center items-center">
      <div
        className={`w-3/4 p-4 transition-opacity duration-500 ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
      >
        <h2 className=" text-3xl font-bold text-main py-5">Create New Task </h2>

        <form
          onSubmit={handleSubmit}
          action="#"
          className="flex flex-col gap-6 mt-4"
          noValidate
        >
          {/* title */}
          <div className=" w-full flex flex-col gap-2">
            <label className="text-lg font-semibold" htmlFor="t-title">
              Title <span className="text-priority-high">*</span>
            </label>
            <div className="relative w-full">
              <input
                onChange={handleOnchange}
                name="title"
                className={`w-full bg-input-bg p-4 rounded-2xl focus:outline-none focus:ring-1 focus:ring-btn-primary ${
                  error.title
                    ? "ring-1 ring-priority-high focus:ring-1 focus:ring-priority-high"
                    : ""
                }`}
                id="t-title"
                type="text"
                placeholder="Enter task title"
                value={taskData.title || ""}
                required
              />
              {error.title && (
                <div className="absolute -top-9.5 right-2 z-10 bg-priority-high text-white px-3 py-1 rounded shadow-md text-xs font-semibold fade-in">
                  {error.title}
                  {/* Arrow bana sakta hai pseudo-element ya svg se */}
                  {/* <div className="absolute left-3 top-full w-2 h-2 bg-priority-high rotate-45"></div> */}
                </div>
              )}
            </div>
          </div>

          {/* description */}
          <div className={formFullDivStyle}>
            <label className={formLabelStyle} htmlFor="t-description">
              Description
            </label>
            <textarea
              onChange={handleOnchange}
              name="description"
              className={`${formInputStyle} h-45`}
              value={taskData.description || ""}
              placeholder="Description"
              id="t-description"
            />
          </div>

          <div className="w-full flex flex-wrap gap-6 justify-between">
            <div className="w-[47%] flex flex-col gap-2">
              <label className={formLabelStyle} htmlFor="t-due-date">
                Due Date <span className="text-priority-high">*</span>
              </label>
              <div className="relative w-full">
                <input
                  onChange={handleOnchange}
                  name="deadLine"
                  value={taskData.deadLine || ""}
                  className={`${formInputStyle} w-full ${
                    error.deadLine
                      ? "ring-1 ring-priority-high focus:ring-1 focus:ring-priority-high"
                      : ""
                  }`}
                  type="date"
                  id="t-due-date"
                  required
                />
                {error.deadLine && (
                  <div className="absolute -top-9.5 right-2 z-10 bg-priority-high text-white px-2 py-1 rounded shadow-md text-xs font-semibold fade-in">
                    {error.deadLine}
                    {/* Arrow bana sakta hai pseudo-element ya svg se */}
                    {/* <div className="absolute left-3 top-full w-2 h-2 bg-priority-high rotate-45"></div> */}
                  </div>
                )}
              </div>
              {/* <LuCalendarRange /> */}
            </div>

            <div className="relative w-[47%] flex flex-col gap-2">
              <label className={formLabelStyle} htmlFor="t-due-date">
                Priority
              </label>
              <div className="relative">
                <select
                  onChange={handleOnchange}
                  name="priority"
                  value={taskData.priority || ""}
                  className={`${formInputStyle} appearance-none`}
                  id="t-priority"
                  required
                >
                  {PRIORITIES.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
                <RiFlagLine className="absolute top-[50%] -translate-y-1/2 right-4.5 text-xl" />
              </div>
            </div>

            <div className="w-[47%] flex flex-col gap-2 relative">
              <label className={formLabelStyle} htmlFor="t-tag">
                Tag
              </label>
              <div className="relative">
                <input
                  onChange={handleOnchange}
                  name="tag"
                  value={taskData.tag || ""}
                  className={formInputStyle}
                  type="text"
                  id="t-tag"
                  placeholder="Add tag"
                />
                <CiShoppingTag className="absolute top-[50%] -translate-y-1/2 right-4.5 text-xl" />
              </div>
            </div>

            <div className="relative w-[47%] flex flex-col gap-2">
              <label className={formLabelStyle} htmlFor="t-assign">
                Assign To
              </label>

              <div className="relative">
                <input
                  onChange={handleOnchange}
                  name="assignedTo"
                  value={taskData.assignedTo || ""}
                  className={formInputStyle}
                  type="text"
                  placeholder="Add team member"
                />
                <FaRegUser className="absolute top-[50%] -translate-y-1/2 right-4.5 text-xl" />
              </div>
            </div>
          </div>

          <div className={`${formFullDivStyle} relative`}>
            <label className={formLabelStyle} htmlFor="t-depends">
              Depends On
            </label>
            <div className="relative">
              <input
                // onChange={handleOnchange("dependsOn")}
                // value={dependsOn}
                name="dependsOn"
                className={formInputStyle}
                type="text"
                id="t-depends"
                placeholder="Add Dependency"
              />
              <MdOutlineAddLink className="absolute top-[50%] -translate-0 right-4.5 text-xl" />
            </div>
          </div>

          <div className="flex justify-star gap-5">
            {!loading && (
              <Button style="w-30" type="submit" onClick={() => {}}>
                {/* <Link to="/tasks">Create Task</Link>
                 */}
                Create Task
              </Button>
            )}
            {loading && (
              <div className="h-10 w-30 bg-btn-secondary rounded-lg flex items-center justify-center">
                <DotLottieReact
                  className="w-20"
                  src={ButtonSubmitLoading}
                  loop
                  autoplay
                />
              </div>
            )}
            <Button
              type="button"
              onClick={() => {}}
              style="bg-btn-secondary text-btn-primary "
            >
              <Link className="text-btn-primary" to="/tasks">
                Cancel
              </Link>
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddTaskForm;
