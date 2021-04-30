import { FC } from "react";
import {
  Bin,
  Circle,
  CircleCheckedFilled,
  Cross,
  Pin,
  Star,
  StarFilled
} from "./icons";
import "./taskView.css";
import { Task } from "./types";

interface TaskViewProps {
  task: Task;
  onChange: (modifiedTask: Task) => void;
}

export const TaskView: FC<TaskViewProps> = ({ task, onChange }) => {
  const { id, title, created, completed, pinned, starred, deleted } = task;

  return (
    <div className="taskView">
      <div
        className="taskViewTitle"
        onClick={() => onChange({ ...task, completed: !completed })}
      >
        {completed ? (
          <>
            <CircleCheckedFilled className="FILL--success" />
          </>
        ) : (
          <>
            <Circle className="FILL--gray-500" />
          </>
        )}
        {completed || deleted ? (
          <del className={deleted ? "Type--muted" : undefined}>{title}</del>
        ) : (
          title
        )}
      </div>
      <div className="taskViewIcons">
        <small className="Type--muted">{created.toLocaleDateString()}</small>
        {!deleted && (
          <>
            <div onClick={() => onChange({ ...task, pinned: !pinned })}>
              {pinned ? (
                <Cross className="FILL--info" />
              ) : (
                <Pin className="FILL--info" />
              )}
            </div>
            <div onClick={() => onChange({ ...task, starred: !starred })}>
              {starred ? (
                <StarFilled className="FILL--attention" />
              ) : (
                <Star className="FILL--attention" />
              )}
            </div>
            <div onClick={() => onChange({ ...task, deleted: !deleted })}>
              <Bin className="FILL--danger" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
