import type React from "react";
import PageHeader from "../components/PageHeader";
import TaskStatusNav from "../components/TaskStatusNav";

const Dashboard: React.FC = () => {
	return (
		<div>
			<PageHeader header="Task Overview" />

			<div>
				<TaskStatusNav />
			</div>
		</div>
	);
};

export default Dashboard;
