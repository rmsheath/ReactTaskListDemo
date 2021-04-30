import { FC } from "react";
import { Group } from "./types";

import "./groupView.css";

interface GroupViewProps {
  group: Group;
  count: number;
  isSelected?: boolean;
}
export const GroupView: FC<GroupViewProps> = ({ group, count, isSelected }) => {
  return (
    <div
      className={["Group", isSelected ? "GroupSelected" : undefined].join(" ")}
    >
      <div className="GroupTitle">
        {group.icon}
        {group.title}
      </div>
      <small className="GroupCount">{count}</small>
    </div>
  );
};
