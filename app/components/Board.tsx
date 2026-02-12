import { Task } from "../generated/prisma/client";
import { Column } from "./Column";

const columns = [
  { status: "TODO", title: "A Fazer" },
  { status: "DOING", title: "Em Andamento" },
  { status: "DONE", title: "Concluído" },
];

interface BoardProps {
  tasks: Task[];
}

export function Board({ tasks }: BoardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {columns.map((column) => (
        <Column
          key={column.status}
          title={column.title}
          status={column.status}
          tasks={tasks.filter((task) => task.status === column.status)}
        />
      ))}
    </div>
  );
}
