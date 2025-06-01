import type React from "react";
import PageHeader from "../components/PageHeader";
import TaskStatusNav from "../components/TaskStatusNav.tsx";
import { useMemo, useState } from "react";
import TaskTable from "../components/TaskTable.tsx";

const Tasks: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("all");

  const activeStatus = useMemo(() => activeTab, [activeTab]);

  return (
    <div>
      <PageHeader header="Todo Tasks" />

      <section aria-labelledby="task-flow-list" className="mt-4">
        <h2 id="metrics-heading" className="sr-only">
          Task list status
        </h2>

        <TaskStatusNav handleTabChange={(tab: string) => setActiveTab(tab)} />

        <div className="my-5">
          <TaskTable status={activeStatus} />
        </div>
      </section>
    </div>
  );
};

export default Tasks;
