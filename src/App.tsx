import { Fragment, useState } from "react";
import { Bin, CircleChecked, Inbox, Star } from "./icons";
import "./styles.css";
import { TaskView } from "./TaskView";
import { Group, GroupType, List, Task } from "./types";
import { GroupView } from "./GroupView";

const groups: Group[] = [
  {
    title: "All tasks",
    group: "all",
    icon: <Inbox />
  },
  {
    title: "Starred",
    group: "starred",
    icon: <Star />
  },
  {
    title: "Completed",
    group: "completed",
    icon: <CircleChecked />
  },
  {
    title: "Deleted",
    group: "deleted",
    icon: <Bin />
  }
];

interface GroupCounters {
  count: number;
  tasks: Task[];
}

interface GroupCountersMap {
  all?: GroupCounters;
  starred?: GroupCounters;
  completed?: GroupCounters;
  deleted?: GroupCounters;
}

export default function App() {
  const [taskName, setTaskName] = useState("");
  const [search, setSearch] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<GroupType>("all");
  const [lists, setLists] = useState<List[]>([
    {
      id: 1,
      title: "List one"
    }
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "First task",
      created: new Date()
    },
    {
      id: 2,
      title: "Second task",
      created: new Date(),
      completed: true
    },
    {
      id: 3,
      title: "Third task",
      created: new Date(),
      pinned: true
    },
    {
      id: 4,
      title: "4 task",
      created: new Date(),
      starred: true
    },
    {
      id: 5,
      title: "Fifth task",
      created: new Date(),
      deleted: true
    },
    {
      id: 6,
      title: "6 task",
      created: new Date(),
      deleted: true,
      completed: true
    }
  ]);

  const applyTaskChange = (task: Task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
  };

  const renderTasks = (tasks: Task[]) =>
    tasks.map((t) => (
      <Fragment key={t.id}>
        <TaskView task={t} onChange={applyTaskChange} />
      </Fragment>
    ));

  const groupedMap: GroupCountersMap = groups.reduce((map, group) => {
    const groupFilteredTasks = tasks.filter((t) => {
      switch (group.group) {
        case "all":
          return !t.deleted;
        case "starred":
          return t.starred;
        case "completed":
          return t.completed;
        case "deleted":
          return t.deleted;
      }
    });

    return {
      ...map,
      [group.group]: {
        count: groupFilteredTasks.length,
        tasks: groupFilteredTasks
      }
    };
  }, {});

  const filteredTasks = groupedMap[selectedGroup]!.tasks.filter((t) =>
    search ? t.title.toLowerCase().indexOf(search.toLowerCase()) > -1 : true
  );

  const pinnedTasks = filteredTasks.filter((t) => t.pinned);
  const restTasks = filteredTasks.filter((t) => !t.pinned);

  return (
    <>
      <div className="Sidebar">
        <div className="block">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="SearchInput"
            placeholder="Search tasks"
          />
          {groups.map((group) => (
            <>
              <div onClick={() => setSelectedGroup(group.group)}>
                <GroupView
                  group={group}
                  isSelected={group.group === selectedGroup}
                  count={groupedMap[group.group]!.count}
                />
              </div>
            </>
          ))}
        </div>
        <hr />
        <div className="block">
          <h5 className="smallTitle">My Lists</h5>
          <ul>
            <li>List one</li>
            <li>List two</li>
            <li>List three</li>
          </ul>
        </div>
      </div>
      <div className="MainWrapper">
        <section className="TaskListView">
          <header className="heading">
            <h1 className="Type--title">All tasks</h1>
            <h6 className="Type--smallTitle Type--muted">
              Viewing {filteredTasks.length} tasks
            </h6>
          </header>
          <div className="TaskListViewList">
            {!!pinnedTasks.length && (
              <>
                Pinned tasks
                {renderTasks(pinnedTasks)}
              </>
            )}
            <br />
            {renderTasks(restTasks)}
          </div>
        </section>
        <input
          type="text"
          placeholder="Task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter" && taskName) {
              setTasks((tasks) => [
                ...tasks,
                { id: tasks.length, title: taskName, created: new Date() }
              ]);
              setTaskName("");
            }
          }}
        />
      </div>
    </>
  );
}
