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

export const colorClassMapTaskStatusText: Record<string, string> = {
  primary: "text-primary-text",
  todo: "text-status-todo",
  inprogress: "text-status-progress",
  overdue: "text-status-overdue",
  done: "text-status-done",

  todo_secondary: "text-status-todo-secondary",
  inprogress_secondary: "text-status-progress-secondary",
  done_secondary: "text-status-done-secondary",
  overdue_secondary: "text-status-overdue-secondary",
};

export const getColorClass = (property?: string, cc: string = "primary-bg") => {
  return `${property}-${cc}`;
};

export const colorClassMapTaskPriority: Record<string, string> = {
  high: "bg-priority-high",
  high_secondary: "bg-priority-high-secondary",

  medium: "bg-priority-medium",
  medium_secondary: "bg-priority-medium-secondary",

  low: "bg-priority-low",
  low_secondary: "bg-priority-low-secondary",
};

export const colorClassMapTaskPriorityText: Record<string, string> = {
  high: "text-priority-high",
  high_secondary: "text-priority-high-secondary",

  medium: "text-priority-medium",
  medium_secondary: "text-priority-medium-secondary",

  low: "text-priority-low",
  low_secondary: "text-priority-low-secondary",
};
