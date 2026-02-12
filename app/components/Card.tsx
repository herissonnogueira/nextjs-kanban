"use client";

import { Task } from "../generated/prisma/client";
import { deleteTask, updateTask } from "../actions";

interface CardProps {
  task: Task;
}

const statusOptions = [
  { value: "TODO", label: "A Fazer" },
  { value: "DOING", label: "Em Andamento" },
  { value: "DONE", label: "Concluído" },
];

export function Card({ task }: CardProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h3 className="font-medium text-gray-900">{task.title}</h3>
      {task.description && (
        <p className="text-gray-500 text-sm mt-1">{task.description}</p>
      )}

      <div className="flex items-center justify-between mt-3">
        <form action={updateTask}>
          <input type="hidden" name="id" value={task.id} />
          <input type="hidden" name="title" value={task.title} />
          <input
            type="hidden"
            name="description"
            value={task.description || ""}
          />
          <select
            name="status"
            defaultValue={task.status}
            onChange={(e) => e.target.form?.requestSubmit()}
            className="text-sm bg-gray-100 rounded px-2 py-1 cursor-pointer"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </form>

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
