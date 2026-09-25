import { useEffect, useState } from "react";
import { addTask, listTasks, updateTask, type Task } from "./api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    listTasks().then(setTasks);
  }, []);

  async function handleAdd(title: string) {
    const task = await addTask(title);
    setTasks((prev) => [...prev, task]);
  }

  async function handleEdit(id: number, title: string) {
    const updated = await updateTask(id, title);
    setTasks((prev) => prev.map((task) => (task.id === id ? updated : task)));
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-16 font-mono text-neutral-900">
      <h1 className="mb-8 text-2xl font-semibold">Todolist</h1>
      <TaskForm onAdd={handleAdd} />
      <TaskList tasks={tasks} onEdit={handleEdit} />
    </main>
  );
}

export default App;
