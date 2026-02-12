import { getTasks } from "./actions";
import { Board } from "./components/Board";
import { CreateTaskForm } from "./components/CreateTaskForm";

export default async function Home() {
  const tasks = await getTasks();

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Kanban Board</h1>
      <CreateTaskForm />
      <Board tasks={tasks} />
    </main>
  );
}
