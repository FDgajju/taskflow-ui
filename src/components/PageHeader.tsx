import type React from "react";
import SearchIcon from "/search.svg"; // Assuming you have a search icon
import Button from "./Button";
import { Link } from "react-router-dom";

type PageHeaderProps = {
  header: string;
};

const PageHeader: React.FC<PageHeaderProps> = ({ header }) => {
  return (
    <div className="w-4/4 flex justify-start text-main">
      <div className="w-4/4 flex flex-col justify-start gap-8">
        <h2 className="text-3xl font-bold text-main">{header}</h2>

        <div className="flex flex-col gap-2 w-4/4">
          <p className="font-semibold text-main">Search Task</p>
          <div className="flex w-4/4 gap-2 items-center justify-between">
            <form
              action="#"
              className="flex flex-1 bg-secondary-bg p-2 rounded-lg  "
            >
              <input
                className="flex-1 active:outline-0 focus:outline-0"
                type="text"
                placeholder="Search by title tag or assignee"
              />
              <button type="submit">
                <img src={SearchIcon} alt="search" className="h-4" />
              </button>
            </form>

            <Button type="button" onClick={() => {}}>
              <Link to="/add-new-task">Add Task</Link>
            </Button>
            <Button
              type="button"
              text="Filter"
              style="bg-btn-secondary text-btn-secondary-text"
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
