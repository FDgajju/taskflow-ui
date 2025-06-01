export type TaskPriority = "high" | "medium" | "low";

export type TaskStatus = "done" | "inprogress" | "todo";

export type TaskT = {
  _id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  deadLine: string;

  tag: string;
  workspace: string;

  createdBy: string;
  updatedBy: string;
  assignedTo: string;
  assignedBy: string;
  comments: string;
  attachments: string;

  createdAt: Date;
  updatedAt: Date;
};
