export type TaskPriority = 'high' | 'medium' | 'low';

export type TaskStatus = 'done' | 'inprogress' | 'todo';

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
  attachments: string[];
  dependsOn: string[];
  dependenciesList: TaskT[];
  attachedDocuments?: DocumentT[];

  slug?: string;
  ticket?: string;

  createdAt: Date;
  updatedAt: Date;
};

export type TaskFilter = {
  _id?: string;
  priority?: TaskPriority;
  title?: string;
  search?: string;
  status?: TaskStatus;
  deadLine?: string;
  sort?: number;

  tag?: string;
  workspace?: string;

  createdBy?: string;
  updatedBy?: string;
  assignedTo?: string;
  assignedBy?: string;

  createdAt?: Date;
  updatedAt?: Date;

  slug?: string;
  ticket?: string;

  deadLine_from?: string;
  deadLine_to?: string;
  created_from?: string;
  created_to?: string;
};

export type DocumentT = {
  originalname?: string;
  show?: boolean;
  name?: string;
  path?: string;
  type?: string;
  url?: string;
  _id?: string;
  maskImageUrl?: string;

  createdAt?: string;
  updatedAt?: string;
};
