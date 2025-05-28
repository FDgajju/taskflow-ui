import type React from "react";
import PageHeader from "../components/PageHeader";
import TaskStatusNav from "../components/TaskStatusNav";
import TaskMetricsCard from "../components/TaskMetricsCard";
import { ImClock } from "react-icons/im";
import { RiProgress6Line } from "react-icons/ri";
import { MdTaskAlt } from "react-icons/md";
import { TbProgressAlert } from "react-icons/tb";
import { useMemo } from "react";
import ProductivityChart, {
  type ChartPoint,
} from "../components/ProductivityChart";
import H2 from "../components/H2";

const Dashboard: React.FC = () => {
  const chartData = useMemo<ChartPoint[]>(
    () => [
      {
        day: "Mon",
        totalTasks: 4,
        completed: 2,
        inprogress: 1,
        overdue: 1,
        todo: 0,
      },
      {
        day: "Tue",
        totalTasks: 7,
        completed: 3,
        inprogress: 2,
        overdue: 1,
        todo: 1,
      },
      {
        day: "Wed",
        totalTasks: 3,
        completed: 1,
        inprogress: 1,
        overdue: 0,
        todo: 1,
      },
      {
        day: "Thu",
        totalTasks: 8,
        completed: 4,
        inprogress: 2,
        overdue: 1,
        todo: 1,
      },
      {
        day: "Fri",
        totalTasks: 5,
        completed: 2,
        inprogress: 1,
        overdue: 0,
        todo: 2,
      },
      {
        day: "Sat",
        totalTasks: 2,
        completed: 1,
        inprogress: 0,
        overdue: 0,
        todo: 1,
      },
      {
        day: "Sun",
        totalTasks: 6,
        completed: 3,
        inprogress: 2,
        overdue: 1,
        todo: 0,
      },
    ],
    []
  );

  const metricsData = useMemo(
    () => [
      {
        key: "todo",
        label: "To do",
        value: 10,
        description: "Tasks not yet started",
        icon: <ImClock className="text-primary-bg text-xl" />,
        colorClass: "status-todo",
      },
      {
        key: "inprogress",
        label: "In Progress",
        value: 5,
        description: "Tasks being worked on",
        icon: <RiProgress6Line className="text-primary-bg text-xl" />,
        colorClass: "status-progress",
      },
      {
        key: "completed",
        label: "Completed",
        value: 8,
        description: "Finished tasks",
        icon: <MdTaskAlt className="text-primary-bg text-xl" />,
        colorClass: "status-completed",
      },
      {
        key: "overdue",
        label: "Overdue",
        value: 3,
        description: "Past due tasks",
        icon: <TbProgressAlert className="text-primary-bg text-xl" />,
        colorClass: "status-overdue",
      },
    ],
    []
  );

  return (
    <div>
      <PageHeader header="Task Overview" />

      <section aria-labelledby="metrics-heading" className="mt-4">
        <h2 id="metrics-heading" className="sr-only">
          Task status
        </h2>

        <TaskStatusNav />
        <div className="grid gap-4 mt-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {metricsData.map((m) => (
            <TaskMetricsCard
              key={m.description.split(" ").join("-")}
              icon={m.icon}
              highlightText={m.label}
              metrics={m.value}
              text={m.description}
              color={m.colorClass}
            />
          ))}
        </div>
      </section>

      <section className="mt-8 bg-secondary-bg rounded-3xl p-6 shadow">
        <div className="flex flex-col gap-8">
          <H2 text="Productivity Trends" />

          <ProductivityChart data={chartData} />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
