import { useEffect, useState } from "react";
import {
  addTask,
  deleteTask,
  listTasks,
  toggleTaskCompleted,
  updateTask,
  type Filter,
  type Sort,
  type Task,
} from "./api";
import FilterBar from "./components/FilterBar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("created_at");

  useEffect(() => {
    listTasks(filter, sort).then(setTasks);
  }, [filter, sort]);

  function refresh() {
    listTasks(filter, sort).then(setTasks);
  }

  async function handleAdd(title: string, dueDate?: string) {
    await addTask(title, dueDate);
    refresh();
  }

  async function handleEdit(id: number, title: string) {
    await updateTask(id, title);
    refresh();
  }

  async function handleDelete(id: number) {
    await deleteTask(id);
    refresh();
  }

  async function handleToggleCompleted(id: number, completed: boolean) {
    await toggleTaskCompleted(id, completed);
    refresh();
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-16 font-mono text-neutral-900">
      <h1 className="mb-8 text-2xl font-semibold">Todolist</h1>
      <TaskForm onAdd={handleAdd} />
      <FilterBar filter={filter} onFilterChange={setFilter} sort={sort} onSortChange={setSort} />
      <TaskList
        tasks={tasks}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleCompleted={handleToggleCompleted}
      />
    </main>
  );
}

export default App;
