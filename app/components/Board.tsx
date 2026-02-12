"use client";

import { useState, useRef } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { Task } from "../generated/prisma/client";
import { moveTask } from "../actions";
import { Column } from "./Column";
import { Card } from "./Card";

const columns = [
  { status: "TODO", title: "A Fazer" },
  { status: "DOING", title: "Em Andamento" },
  { status: "DONE", title: "Concluído" },
];

interface BoardProps {
  tasks: Task[];
}

function groupByStatus(tasks: Task[]) {
  return {
    TODO: tasks.filter((t) => t.status === "TODO"),
    DOING: tasks.filter((t) => t.status === "DOING"),
    DONE: tasks.filter((t) => t.status === "DONE"),
  };
}

export function Board({ tasks }: BoardProps) {
  const [items, setItems] = useState(() => groupByStatus(tasks));
  const previousItems = useRef(items);

  return (
    <DragDropProvider
      onDragStart={() => {
        previousItems.current = items;
      }}
      onDragOver={(event) => {
        const { source } = event.operation;

        if (source?.type === "column") return;

        setItems((items) => move(items, event));
      }}
      onDragEnd={async (event) => {
        if (event.canceled) {
          setItems(previousItems.current);
          return;
        }

        const { source } = event.operation;

        if (source?.type === "column") return;

        const taskId = String(source.id);

        const newStatus = Object.entries(items).find(([, tasks]) =>
          tasks.some((t) => t.id === taskId)
        )?.[0];

        const oldStatus = Object.entries(previousItems.current).find(
          ([, tasks]) => tasks.some((t) => t.id === taskId)
        )?.[0];

        if (newStatus && newStatus !== oldStatus) {
          await moveTask(taskId, newStatus);
        }
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {columns.map((column, index) => (
          <Column key={column.status} id={column.status} title={column.title} index={index}>
            {items[column.status as keyof typeof items].map((task, taskIndex) => (
              <Card
                key={task.id}
                task={task}
                index={taskIndex}
                column={column.status}
              />
            ))}
          </Column>
        ))}
      </div>
    </DragDropProvider>
  );
}
