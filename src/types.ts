import { ReactNode } from "react";

export interface Task {
  id: number | string;
  title: string;
  created: Date;
  completed?: boolean;
  pinned?: boolean;
  starred?: boolean;
  deleted?: boolean;
}

export interface List {
  id: number | string;
  title: string;
}
export type GroupType = "all" | "starred" | "completed" | "deleted";

export interface Group {
  title: string;
  group: GroupType;
  icon: ReactNode;
}
