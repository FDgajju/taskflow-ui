import type React from "react";
import { useState } from "react";

const TaskStatusNav: React.FC = () => {
	const taskStatus = {
		todo: "todo",
		inprogress: "inprogress",
		done: "done",
		all: "all",
		overdue: "overdue",
	};
	const [activeTab, setActiveTab] = useState<string>(taskStatus.todo);

	const listItemStyle = "cursor-pointer";
	const listItemTextStyle = "py-3 text-gray-text text-sm font-semibold";

	return (
		<nav className="text-main">
			<ul className="w-4/4 border-b-2 border-sidebar-selected py-3 flex justify-start gap-6">
				<li
					className="cursor-pointer"
					onKeyUp={() => {}}
					onClick={() => setActiveTab(taskStatus.todo)}
				>
					<span
						className={`py-3.5 text-gray-text text-sm font-semibold ${activeTab === taskStatus.todo ? "border-b-3 border-main text-main" : ""}`}
					>
						Todo
					</span>
				</li>
				<li
					className={listItemStyle}
					onKeyUp={() => {}}
					onClick={() => setActiveTab(taskStatus.inprogress)}
				>
					<span
						className={`${listItemTextStyle} ${activeTab === taskStatus.inprogress ? "border-b-3 border-main text-main" : ""}`}
					>
						Inprogress
					</span>
				</li>
				<li
					className={listItemStyle}
					onKeyUp={() => {}}
					onClick={() => setActiveTab(taskStatus.done)}
				>
					<span
						className={`${listItemTextStyle} ${activeTab === taskStatus.done ? "border-b-3 border-main text-main" : ""}`}
					>
						Done
					</span>
				</li>
				<li
					className={listItemStyle}
					onKeyUp={() => {}}
					onClick={() => setActiveTab(taskStatus.overdue)}
				>
					<span
						className={`${listItemTextStyle} ${activeTab === taskStatus.overdue ? "border-b-3 border-main text-main" : ""}`}
					>
						Overdue
					</span>
				</li>
				<li
					className={listItemStyle}
					onKeyUp={() => {}}
					onClick={() => setActiveTab(taskStatus.all)}
				>
					<span
						className={`${listItemTextStyle} ${activeTab === taskStatus.all ? "border-b-3 border-main text-main" : ""}`}
					>
						All
					</span>
				</li>
			</ul>
		</nav>
	);
};

export default TaskStatusNav;
