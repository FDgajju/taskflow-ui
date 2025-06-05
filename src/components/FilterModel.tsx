import React, {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import H2 from "./H2";
import type { TaskFilter } from "../types/task";
import { useNavigate } from "react-router-dom";
import FilterForm from "./FilterForm";
import { PRIORITIES_DD, STATUS_LIST } from "../constants/constants";
import { optimizeQueryParams } from "../utils/optimizeQueryParams";
// import { TbSortAscending2 } from "react-icons/tb";

type FilterModelProp = {
  handleClose: () => void;
};

const FilterModel: React.FC<FilterModelProp> = ({ handleClose }) => {
  const [filter, setFilter] = useState<TaskFilter>({});
  const [error, setError] = useState<string>("");

  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  const navigate = useNavigate();
  useEffect(() => {
    cancelButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  // handle submit
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!Object.keys(filter).length)
      return setError("Please add at least one filter to apply!");

    if (filter?.priority === PRIORITIES_DD[0]) delete filter.priority;
    if (filter?.status === STATUS_LIST[0]) delete filter.status;

    navigate(
      `/tasks/filter/list?${optimizeQueryParams({ ...filter, sort: -1 })}`
    );

    setFilter({});
    setError("");
  };

  return (
    <div
      onClick={handleClose}
      className="text-main fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-black/30"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="text-main p-5 min-w-xl rounded-3xl bg-primary-bg border-2 border-main/40"
      >
        <div className="flex items-center justify-between">
          <H2 className="p-2" text="Apply Filter" />
          <button
            ref={cancelButtonRef}
            onClick={handleClose}
            className="py-0.5 px-1.5 bg-status-overdue-secondary font-bold text-status-overdue focus:ring-2 focus:right-status-overdue block w-fit cursor-pointer rounded-lg text-xs"
          >
            Close
          </button>
        </div>

        {error && (
          <div className="p-2 flex items-center">
            <span className="text-sm text-primary-bg bg-status-overdue py-0.5 px-2 rounded-md">
              {error}
            </span>
          </div>
        )}
        <FilterForm
          handleClearFilter={() => {setFilter({})}}
          handleOnChange={handleOnChange}
          handleSubmit={handleSubmit}
          filter={filter}
        />
      </div>
    </div>
  );
};

export default FilterModel;
