"use client";

import { useState } from "react";
import { useSortable } from "@dnd-kit/react/sortable";
import { Task } from "../generated/prisma/client";
import { deleteTask, updateTask } from "../actions";

interface CardProps {
  task: Task;
  index: number;
  column: string;
}

export function Card({ task, index, column }: CardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { ref, isDragging } = useSortable({
    id: task.id,
    index,
    type: "item",
    group: column,
  });

  if (isEditing) {
    return (
      <div ref={ref} className="bg-white rounded-lg p-4 shadow-sm">
        <form
          action={async (formData) => {
            await updateTask(formData);
            setIsEditing(false);
          }}
        >
          <input type="hidden" name="id" value={task.id} />
          <input type="hidden" name="status" value={task.status} />

          <input
            type="text"
            name="title"
            defaultValue={task.title}
            required
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm mb-2 focus:outline-none focus:border-blue-500"
          />

          <textarea
            name="description"
            defaultValue={task.description || ""}
            rows={2}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm mb-2 focus:outline-none focus:border-blue-500 resize-none"
          />

          <div className="flex gap-2">
            <button
              type="submit"
              className="text-blue-500 hover:text-blue-700 text-sm cursor-pointer"
            >
              Salvar
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="text-gray-500 hover:text-gray-700 text-sm cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    );
  }

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

      <div className="flex justify-end gap-3 mt-3">
        <button
          onClick={() => setIsEditing(true)}
          className="text-blue-500 hover:text-blue-700 text-sm cursor-pointer"
        >
          Editar
        </button>
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
