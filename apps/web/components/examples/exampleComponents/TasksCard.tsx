"use client";

import { useMemo, useState } from "react";
import { ExampleCard, ExampleDescription, ExampleProgress, ExampleTitle } from "@repo/ui/examples";
import { FormCheckbox } from "@repo/ui/form";

const TasksCard = () => {
  const [tasks, setTasks] = useState([
    { id: "t1", label: "Write release notes", done: true },
    { id: "t2", label: "Review pull request", done: false },
    { id: "t3", label: "Publish changelog", done: false },
  ]);

  const completed = tasks.filter((task) => task.done).length;
  const progress = useMemo(() => Math.round((completed / tasks.length) * 100), [completed, tasks.length]);

  return (
    <ExampleCard className="space-y-4">
      <div>
        <ExampleTitle>Task Checklist</ExampleTitle>
        <ExampleDescription>Track common release tasks and progress.</ExampleDescription>
      </div>

      <div className="space-y-2">
        {tasks.map((task) => (
          <FormCheckbox
            key={task.id}
            id={task.id}
            label={task.label}
            checked={task.done}
            onChange={(event) => {
              setTasks((current) =>
                current.map((entry) =>
                  entry.id === task.id ? { ...entry, done: event.target.checked } : entry,
                ),
              );
            }}
          />
        ))}
      </div>

      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">{completed} of {tasks.length} completed</p>
        <ExampleProgress value={progress} />
      </div>
    </ExampleCard>
  );
};

export default TasksCard;
