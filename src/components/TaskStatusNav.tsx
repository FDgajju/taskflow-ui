import type React from "react";
import { useEffect, useRef, useState } from "react";

const taskStatus = [
  { key: "all", label: "All" },
  { key: "todo", label: "Todo" },
  { key: "inprogress", label: "Inprogress" },
  { key: "done", label: "Done" },
  { key: "overdue", label: "Overdue" },
];

const TaskStatusNav: React.FC<{ handleTabChange: (tab: string) => void }> = ({
  handleTabChange,
}) => {
  const [activeTab, setActiveTab] = useState<string>(taskStatus[0].key);
  const [underline, setUnderline] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const idx = taskStatus.findIndex((t) => t.key === activeTab);
    if (tabRefs.current[idx]) {
      setUnderline({
        left: tabRefs.current[idx].offsetLeft || 0,
        width: tabRefs.current[idx].clientWidth || 0,
      });
    }
  }, [activeTab]);

  const listItemStyle = "cursor-pointer";
  const listItemTextStyle = "py-3.5 text-gray-text text-sm font-semibold ";

  return (
    <nav className="text-main">
      <ul
        role="tablist"
        className="relative w-4/4 border-b-2 border-sidebar-selected py-3 flex justify-start gap-6"
      >
        {taskStatus.map((task, idx) => (
          <li
            key={task.key}
            className={listItemStyle}
            ref={(el) => {
              tabRefs.current[idx] = el;
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setActiveTab(task.key);
                handleTabChange(task.key);
              }
            }}
            onClick={() => {
              setActiveTab(task.key);
              handleTabChange(task.key);
            }}
          >
            <span
              className={`${listItemTextStyle} ${
                activeTab === task.key ? " text-main" : ""
              }`}
            >
              {task.label}
            </span>
          </li>
        ))}
        <div
          className="absolute bottom-0 h-1 bg-main rounded-xl transition-all duration-300"
          style={{ left: underline.left, width: underline.width }}
        />
      </ul>
    </nav>
  );
};

export default TaskStatusNav;
