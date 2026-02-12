"use client";

import { useRef } from "react";
import { createTask } from "../actions";

export function CreateTaskForm() {
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    await createTask(formData);
    formRef.current?.reset();
  }

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="bg-white rounded-lg p-4 shadow-sm max-w-md mx-auto mb-8"
    >
      <h2 className="text-lg font-semibold mb-3">Nova Tarefa</h2>

      <div className="space-y-3">
        <input
          type="text"
          name="title"
          placeholder="Título da tarefa"
          required
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
        />

        <textarea
          name="description"
          placeholder="Descrição (opcional)"
          rows={2}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 resize-none"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded py-2 text-sm font-medium hover:bg-blue-600 cursor-pointer"
        >
          Criar Tarefa
        </button>
      </div>
    </form>
  );
}
