export const colorClassMapTaskStatus: Record<string, string> = {
  primary: "bg-primary-bg",
  todo: "bg-status-todo",
  inprogress: "bg-status-progress",
  overdue: "bg-status-overdue",
  done: "bg-status-done",

  todo_secondary: "bg-status-todo-secondary",
  inprogress_secondary: "bg-status-progress-secondary",
  done_secondary: "bg-status-done-secondary",
  overdue_secondary: "bg-status-overdue-secondary",
};

export const getColorClass = (property?: string, cc: string = "primary-bg") => {
  return `${property}-${cc}`;
};

export const colorClassMapTaskPriority: Record<string, string> = {
  high: "bg-priority-high",
  medium: "bg-priority-medium",
  low: "bg-priority-low",
};
