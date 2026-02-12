import { Task } from "../generated/prisma/client";
import { Card } from "./Card";

interface ColumnProps {
  title: string;
  status: string;
  tasks: Task[];
}

export function Column({ title, status, tasks }: ColumnProps) {
  return (
    <div className="bg-gray-200 rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4 text-center">{title}</h2>
      <div className="space-y-3">
        {tasks.map((task) => (
          <Card key={task.id} task={task} />
        ))}
        {tasks.length === 0 && (
          <p className="text-gray-500 text-sm text-center">Nenhuma tarefa</p>
        )}
      </div>
    </div>
  );
}
