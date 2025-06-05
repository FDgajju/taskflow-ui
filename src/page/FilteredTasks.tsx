import React, { useState, type ChangeEvent, type FormEvent } from "react";
import PageHeader from "../components/PageHeader";
import FilterForm from "../components/FilterForm";
import type { TaskFilter } from "../types/task";
import { PRIORITIES_DD, STATUS_LIST } from "../constants/constants";
import { useSearchParams } from "react-router-dom";
import TaskTable from "../components/TaskTable";
import { optimizeQueryParams } from "../utils/optimizeQueryParams";

const FilteredTasks: React.FC = () => {
  const [filter, setFilter] = useState<TaskFilter>({ sort: -1 });
  // const [queryString, setQueryString] = useState<string>("");
  const [, setError] = useState<string>("");

  // const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilter((prev) => ({ ...prev, ...params }));
  }, [searchParams]);

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
      setError("Please add at least one filter to apply!");

    if (filter?.priority === PRIORITIES_DD[0]) delete filter.priority;
    if (filter?.status === STATUS_LIST[0]) delete filter.status;

    setSearchParams(optimizeQueryParams({ ...filter, sort: -1 }));
  };

  return (
    <div className="flex flex-col gap-3">
      <PageHeader removeFilter={true} header="Tasks based on the filter" />

      <div className="border-gray-text/20 border-2 rounded-3xl p-2">
        <FilterForm
          handleClearFilter={() => {
            setFilter({});
            setSearchParams({});
          }}
          handleOnChange={handleOnChange}
          handleSubmit={handleSubmit}
          filter={filter}
        />
      </div>

      <div>
        <TaskTable queryString={searchParams.toString()} />
      </div>
    </div>
  );
};

export default FilteredTasks;
