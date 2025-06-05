import React, { type ChangeEvent, type FormEvent } from "react";
import Button from "./Button";
import { TbSortAscending2 } from "react-icons/tb";
import { RiFlagLine } from "react-icons/ri";
import { BsInfoCircle } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { PRIORITIES_DD, STATUS_LIST } from "../constants/constants";
import type { TaskFilter } from "../types/task";
import { getFormattedDate } from "../utils/getFormatedDate";

const sortOptions = [
  { key: "Latest First", value: -1 },
  { key: "Oldest First", value: 1 },
];
const formInputStyle =
  "w-full bg-input-bg p-3 rounded-2xl text-xs focus:outline-none focus:ring-1 focus:ring-btn-primary transition-all ease duration-300";
const formLabelStyle = "text-sm font-semibold";

type FilterFormProp = {
  handleOnChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;

  handleClearFilter: () => void;

  filter?: TaskFilter;
};

const FilterForm: React.FC<FilterFormProp> = ({
  handleOnChange,
  handleSubmit,
  handleClearFilter,
  filter = {},
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      action="#"
      className="flex flex-col p-2 gap-4"
    >
      {/* inner container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* sort */}
        <div className="relative flex flex-col gap-2">
          <label className={formLabelStyle} htmlFor="t-status">
            Sort
          </label>
          <div className="relative">
            <select
              name="sort"
              value={filter?.sort ?? -1}
              className={`${formInputStyle} appearance-none`}
              onChange={handleOnChange}
              id="t-sort"
            >
              {sortOptions.map((option) => (
                <option value={option.value} key={option.key}>
                  {option.key}
                </option>
              ))}
            </select>
            <TbSortAscending2 className="absolute top-[50%] -translate-y-1/2 right-4.5 text-xl" />
          </div>
        </div>

        {/* form inputs */}
        <div className="relative flex flex-col gap-2">
          <label className={formLabelStyle} htmlFor="t-priority">
            Priority
          </label>
          <div className="relative">
            <select
              onChange={handleOnChange}
              name="priority"
              className={`${formInputStyle} appearance-none`}
              id="t-priority"
              value={filter?.priority || ""}
            >
              {PRIORITIES_DD.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
            <RiFlagLine className="absolute top-[50%] -translate-y-1/2 right-4.5 text-xl" />
          </div>
        </div>

        {/* status filter */}
        <div className="relative flex flex-col gap-2">
          <label className={formLabelStyle} htmlFor="t-status">
            Status
          </label>
          <div className="relative">
            <select
              onChange={handleOnChange}
              name="status"
              value={filter?.status || ""}
              className={`${formInputStyle} appearance-none`}
              id="t-status"
            >
              {STATUS_LIST.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <BsInfoCircle className="absolute top-[50%] -translate-y-1/2 right-4.5 text-xl" />
          </div>
        </div>

        <div className="relative flex flex-col gap-2">
          <label className={formLabelStyle} htmlFor="t-assign">
            Assign To
          </label>

          <div className="relative">
            <input
              onChange={handleOnChange}
              name="assignedTo"
              value={filter?.assignedTo || ""}
              // value={taskData.assignedTo || ""}
              className={formInputStyle}
              type="text"
              placeholder="search user"
            />
            <FaRegUser className="absolute top-[50%] -translate-y-1/2 right-4.5 text-xl" />
          </div>
        </div>
      </div>

      {/* dead line date range */}
      <div className="w-full flex flex-wrap gap-6 justify-between">
        <div className="w-full flex flex-col  gap-2">
          <label className={formLabelStyle} htmlFor="t-due-date">
            Due Date range
          </label>
          <div className="relative w-full flex flex-col md:flex-row justify-center items-center gap-2">
            <input
              onChange={handleOnChange}
              name="deadLine_from"
              value={getFormattedDate(filter?.deadLine_from || "")}
              className={`${formInputStyle} md:w-1/2`}
              type="date"
              id="t-due-date"
            />
            <span className="font-bold mx-0 md:mx-2">To</span>
            <input
              onChange={handleOnChange}
              name="deadLine_to"
              value={getFormattedDate(filter?.deadLine_to || "")}
              className={`${formInputStyle} md:w-1/2`}
              type="date"
              id="t-due-date"
            />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-wrap gap-6 justify-between">
        <div className="w-full flex flex-col gap-2">
          <label className={formLabelStyle} htmlFor="t-due-date">
            Created Date range
          </label>
          <div className="relative w-full flex flex-col md:flex-row  items-center gap-2">
            <input
              onChange={handleOnChange}
              name="created_from"
              value={getFormattedDate(filter?.created_from || "")}
              className={`${formInputStyle} md:w-1/2`}
              type="date"
              id="t-due-date"
            />
            <span className="font-bold mx-0 md:mx-2">To</span>
            <input
              onChange={handleOnChange}
              name="created_to"
              value={getFormattedDate(filter?.created_to || "")}
              className={`${formInputStyle} md:w-1/2`}
              type="date"
              id="t-due-date"
            />
          </div>
        </div>
      </div>

      {/* will add more filters here later */}

      {/* buttons */}
      <div className="flex gap-2 flex-row-reverse">
        <Button onClick={handleSubmit} className="" type="submit">
          Apply
        </Button>
        {!Object.keys(filter).length && (
          <Button
            className="bg-btn-secondary bg-sidebar-selected"
            type="button"
            disabled={true}
          >
            <span className="text-gray-text ">Clear</span>
          </Button>
        )}
        {Object.keys(filter).length !== 0 && (
          <Button
            onClick={handleClearFilter}
            className="bg-btn-secondary"
            type="button"
          >
            <span className="text-btn-primary ">Clear</span>
          </Button>
        )}
      </div>
    </form>
  );
};

export default FilterForm;
