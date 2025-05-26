import type React from "react";

const listItemStyle = "";

const TaskStatusNav: React.FC = () => {
	return (
		<nav className="p-4 bg-amber-50 mt-6">
			<ul className="flex space-x-4">
				<li className="">Todo</li>
				<li className={listItemStyle}>Inprogress</li>
				<li className={listItemStyle}>Done</li>
				<li className={listItemStyle}>Overdue</li>
				<li className={listItemStyle}>All</li>
			</ul>
		</nav>
	);
};

export default TaskStatusNav;
