"use client";

import { useSortable } from "@dnd-kit/react/sortable";
import { Task } from "../generated/prisma/client";
import { deleteTask } from "../actions";

interface CardProps {
  task: Task;
  index: number;
  column: string;
}

export function Card({ task, index, column }: CardProps) {
  const { ref, isDragging } = useSortable({
    id: task.id,
    index,
    type: "item",
    group: column,
  });

  return (
    <div
      ref={ref}
      className={`bg-white rounded-lg p-4 shadow-sm cursor-grab active:cursor-grabbing ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <h3 className="font-medium text-gray-900">{task.title}</h3>
      {task.description && (
        <p className="text-gray-500 text-sm mt-1">{task.description}</p>
      )}

      <div className="flex justify-end mt-3">
        <form action={deleteTask}>
          <input type="hidden" name="id" value={task.id} />
          <button
            type="submit"
            className="text-red-500 hover:text-red-700 text-sm cursor-pointer"
          >
            Excluir
          </button>
        </form>
      </div>
    </div>
  );
}
