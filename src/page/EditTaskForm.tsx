import type React from "react";
// import { LuCalendarRange } from "react-icons/lu";
import { PRIORITIES } from "../constants/constants";
import { CiShoppingTag } from "react-icons/ci";
import { RiFlagLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineAddLink } from "react-icons/md";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import HightedText from "../components/HightedText";
import { getFormattedDate } from "../utils/getFormatedDate";
import ButtonLink from "../components/ButtonLink";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { apiEndpoint } from "../constants/env";
import type { TaskT } from "../types/task";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const ButtonSubmitLoading = "/animation_file/button-loading.lottie";
const LoadingHand = "/animation_file/loading_hand.lottie";

const formFullDivStyle = "flex flex-col gap-2";
const formInputStyle =
  "w-full bg-input-bg p-4 rounded-2xl text-gray-600  focus:outline-none focus:ring-1 focus:ring-btn-primary";
const formLabelStyle = "text-lg font-semibold";

const EditTaskForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [currentTask, setCurrentTask] = useState<TaskT | null>(null);
  const [updatedTask, setUpdatedTask] = useState<Partial<TaskT>>({});
  const [fadeOut, setFadeOut] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingSubmit, setLoadingSUbmit] = useState(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const resp = await axios.get(`${apiEndpoint}/task/${id}`);

        if (String(resp.status).startsWith("2")) {
          setCurrentTask(resp.data.data);
          setTimeout(() => setLoadingData(false), 500);
        } else if (String(resp.status).startsWith("4"))
          return toast.error(resp.data.error);
        else toast.error("Something unexpected happen, please contact admin!");
      } catch (error) {
        if (error instanceof AxiosError)
          toast.error(
            error.response?.data.message ||
              "Error while fetching current task data"
          );
        else toast.error("Unexpected Error");
      }
    })();

    return () => controller.abort();
  }, [id]);

  // on change handles
  const handleOnchange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setError("");
    const { name, value } = e.target;

    setUpdatedTask((task) => ({ ...task, [name]: value }));
  };

  // on submit handle
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingSUbmit(true);

    if (!Object.keys(updatedTask).length) {
      setError("No fields are updated!");
      setLoadingSUbmit(false);
      return;
    }

    (async () => {
      try {
        const resp = await axios.patch(
          `${apiEndpoint}/task/${id}`,
          updatedTask
        );

        if (String(resp.status).startsWith("2")) toast.success("Task updated");
        else if (String(resp.status).startsWith("4"))
          toast.error(resp.data.error);
        else toast.error("Something unexpected happen, please contact admin!");
      } catch (error) {
        console.log(error);
        if (error instanceof AxiosError)
          toast.error(
            error.response?.data.message || "Error while updating task data"
          );
        else toast.error("Unexpected Error");
      } finally {
        setFadeOut(true);
        setTimeout(() => {
          setLoadingSUbmit(false);
          setError("");
          setCurrentTask(null);
          setUpdatedTask({});
          navigate("/tasks");
        }, 500);
      }
    })();
  };

  return (
    <section className="w-full flex flex-col justify-center items-center">
      <div
        className={`w-3/4 p-4 transition-opacity duration-500 ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
      >
        {error && (
          <div className="p-1 rounded-lg text-center text-xs text-primary-bg bg-priority-high w-full mb-2">
            {error}
          </div>
        )}
        <h2 className=" text-3xl font-bold text-main py-5">Edit Task</h2>
        <HightedText text={currentTask?._id as string} />
        {loadingData && (
          <div className="w-full h-96 bg-gray-200 mt-30 rounded-4xl  flex justify-center items-center animate-pulse">
            <DotLottieReact className="z-10" autoplay loop src={LoadingHand} />
          </div>
        )}
        {!loadingData && (
          <form
            action="#"
            className="flex flex-col gap-6 mt-4"
            onSubmit={handleSubmit}
          >
            {/* title */}
            <div className=" w-full flex flex-col gap-2">
              <label className="text-lg font-semibold" htmlFor="t-title">
                Title
              </label>
              <input
                className="bg-input-bg p-4 text-gray-600 rounded-2xl focus:outline-none focus:ring-1 focus:ring-btn-primary"
                id="t-title"
                type="text"
                placeholder="Enter task title"
                required
                onChange={handleOnchange}
                name="title"
                defaultValue={updatedTask.title || currentTask?.title || ""}
              />
            </div>

            {/* description */}
            <div className={formFullDivStyle}>
              <label className={formLabelStyle} htmlFor="t-description">
                Description
              </label>
              <textarea
                className={`${formInputStyle} h-45`}
                onChange={handleOnchange}
                name="description"
                id="t-description"
                placeholder="Description"
                defaultValue={
                  updatedTask.description || currentTask?.description || ""
                }
              />
            </div>

            <div className="w-full flex flex-wrap gap-6 justify-between">
              <div className="w-[47%] flex flex-col gap-2">
                <label className={formLabelStyle} htmlFor="t-due-date">
                  Due Date
                </label>
                <input
                  className={formInputStyle}
                  type="date"
                  onChange={handleOnchange}
                  name="deadLine"
                  id="t-due-date"
                  required
                  value={getFormattedDate(
                    updatedTask.deadLine || currentTask?.deadLine || ""
                  )}
                />

                {/* <LuCalendarRange /> */}
              </div>

              <div className="relative w-[47%] flex flex-col gap-2">
                <label className={formLabelStyle} htmlFor="t-due-date">
                  Priority
                </label>
                <select
                  className={`${formInputStyle} appearance-none`}
                  name="priority"
                  id="t-priority"
                  required
                  onChange={handleOnchange}
                  defaultValue={
                    updatedTask?.priority || currentTask?.priority || ""
                  }
                >
                  {PRIORITIES.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
                <RiFlagLine className="absolute top-[60%] right-4.5 text-xl" />
              </div>

              <div className="w-[47%] flex flex-col gap-2 relative">
                <label className={formLabelStyle} htmlFor="t-tag">
                  Tag
                </label>
                <input
                  className={formInputStyle}
                  onChange={handleOnchange}
                  name="tag"
                  type="text"
                  id="t-tag"
                  placeholder="Add tag"
                  defaultValue={updatedTask.tag || currentTask?.tag || ""}
                />
                <CiShoppingTag className="absolute top-[60%] right-4.5 text-xl" />
              </div>

              <div className="relative w-[47%] flex flex-col gap-2">
                <label className={formLabelStyle} htmlFor="t-assign">
                  Assign To
                </label>
                <input
                  onChange={handleOnchange}
                  name="assignedTo"
                  className={formInputStyle}
                  type="text"
                  placeholder="Add team member"
                  defaultValue={
                    updatedTask.assignedTo || currentTask?.assignedTo || ""
                  }
                />
                <FaRegUser className="absolute top-[60%] right-4.5 text-xl" />
              </div>
            </div>

            <div className={`${formFullDivStyle} relative`}>
              <label className={formLabelStyle} htmlFor="t-depends">
                Depends On
              </label>
              <input
                //   onChange={handleOnchange("")}
                className={formInputStyle}
                type="text"
                id="t-depends"
                placeholder="Add Dependency"
                // defaultValue={updatedTask.assignedTo || currentTask?.tags}
              />
              <MdOutlineAddLink className="absolute top-[60%] right-4.5 text-xl" />
            </div>

            <div className="flex justify-star gap-5">
              {!loadingSubmit && (
                <Button type="submit" onClick={() => {}}>
                  Update Task
                </Button>
              )}
              {loadingSubmit && (
                <div className="h-10 w-30 bg-btn-secondary rounded-lg flex items-center justify-center">
                  <DotLottieReact
                    className="w-20"
                    src={ButtonSubmitLoading}
                    loop
                    autoplay
                  />
                </div>
              )}

              <ButtonLink
                to="/tasks"
                type="button"
                // onClick={() => {}}
                style="bg-btn-secondary text-btn-primary"
                text="Cancel"
              />
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default EditTaskForm;
