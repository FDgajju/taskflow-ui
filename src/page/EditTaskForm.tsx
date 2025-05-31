import type React from "react";
// import { LuCalendarRange } from "react-icons/lu";
import { PRIORITIES } from "../constants/constants";
import { CiShoppingTag } from "react-icons/ci";
import { RiFlagLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineAddLink } from "react-icons/md";
import Button from "../components/Button";
import { useParams } from "react-router-dom";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import {
  dummyTasks,
  type DummyTask,
  type DummyTaskKeys,
} from "../mockData/tasks";
import HightedText from "../components/HightedText";
import { getFormattedDate } from "../utils/getFormatedDate";
import ButtonLink from "../components/ButtonLink";

const formFullDivStyle = "flex flex-col gap-2";
const formInputStyle =
  "w-full bg-input-bg p-4 rounded-2xl text-gray-600  focus:outline-none focus:ring-1 focus:ring-btn-primary";
const formLabelStyle = "text-lg font-semibold";

const EditTaskForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [currentTask, setCurrentTask] = useState<DummyTask>();
  const [updatedTask, setUpdatedTask] = useState<Partial<DummyTask>>({});

  useEffect(() => {
    const data = dummyTasks.find((task) => task._id === id);

    setCurrentTask(data);
  }, [id]);

  const handleOnchange = (fieldName: DummyTaskKeys) => {
    return (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      setUpdatedTask((task) => ({ ...task, [fieldName]: e.target.value }));
    };
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(updatedTask);
  };

  return (
    <section className="w-full flex justify-center items-center">
      <div className="w-3/4 p-4">
        <h2 className=" text-3xl font-bold text-main py-5">Edit Task</h2>

        <HightedText text={currentTask?._id as string} />

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
              onChange={handleOnchange("title")}
              defaultValue={updatedTask.title || currentTask?.title}
            />
          </div>

          {/* description */}
          <div className={formFullDivStyle}>
            <label className={formLabelStyle} htmlFor="t-description">
              Description
            </label>
            <textarea
              className={`${formInputStyle} h-45`}
              onChange={handleOnchange("description")}
              id="t-description"
              placeholder="Description"
              defaultValue={updatedTask.description || currentTask?.description}
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
                onChange={handleOnchange("deadLine")}
                id="t-due-date"
                required
                defaultValue={getFormattedDate(
                  updatedTask.deadLine || (currentTask?.deadLine as string)
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
                onChange={handleOnchange("priority")}
                defaultValue={updatedTask?.priority || currentTask?.priority}
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
                onChange={handleOnchange("tag")}
                type="text"
                id="t-tag"
                placeholder="Add tag"
                defaultValue={updatedTask.tag || currentTask?.tag}
              />
              <CiShoppingTag className="absolute top-[60%] right-4.5 text-xl" />
            </div>

            <div className="relative w-[47%] flex flex-col gap-2">
              <label className={formLabelStyle} htmlFor="t-assign">
                Assign To
              </label>
              <input
                onChange={handleOnchange("assignedTo")}
                className={formInputStyle}
                type="text"
                placeholder="Add team member"
                defaultValue={updatedTask.assignedTo || currentTask?.assignedTo}
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
            <Button type="submit" onClick={() => {}}>
              {/* <Link to="/tasks">Create Task</Link>
               */}
              Update Task
            </Button>
            <ButtonLink
              to="/tasks"
              type="button"
              onClick={() => {}}
              style="bg-btn-secondary text-btn-primary"
              text="Cancel"
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditTaskForm;
