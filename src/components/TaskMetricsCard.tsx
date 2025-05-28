import React from "react";

type TaskMetricsCardProps = {
  icon: React.ReactNode;
  highlightText: string;
  metrics: number;
  text: string;
  color?: string;
};

const colorClassMap: Record<string, string> = {
  "btn-primary": "bg-primary-bg",
  "status-todo": "bg-status-todo",
  "status-progress": "bg-status-progress",
  "status-completed": "bg-status-completed",
  "status-overdue": "bg-status-overdue",
};

const TaskMetricsCard: React.FC<TaskMetricsCardProps> = ({
  icon,
  highlightText,
  metrics,
  text,
  color = "btn-primary",
}) => {
  return (
    <article className="rounded-3xl p-5 flex flex-col justify-center items-start gap-4 text-main bg-secondary-bg">
      <div
        aria-hidden="true"
        className={`${colorClassMap[color]} p-1.5 rounded-full`}
      >
        <span role="img" aria-label="Icon">
          {icon}
        </span>
      </div>
      <div className="flex flex-col justify-start items-start gap-1">
        <p className="text-sm text-btn-primary font-semibold    ">
          {highlightText}
        </p>
        <p className="text-main text-xl font-bold">{`${metrics} Tasks`}</p>
        <p className="text-gray-text text-sm italic font-medium">{text}</p>
      </div>
    </article>
  );
};

export default React.memo(TaskMetricsCard);
