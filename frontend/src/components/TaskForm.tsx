import { useState } from "react";

interface TaskFormProps {
  onAdd: (title: string, dueDate?: string) => void;
}

function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onAdd(trimmed, dueDate || undefined);
    setTitle("");
    setDueDate("");
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 flex flex-col gap-3 border-b border-line focus-within:border-ink-900 sm:flex-row sm:items-end">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a task and press Enter"
        className="w-full bg-transparent py-2 text-base outline-none placeholder:text-ink-300 focus-visible:ring-1 focus-visible:ring-ink-300"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        aria-label="Due date"
        className="w-full bg-transparent py-2 text-sm text-ink-500 outline-none focus-visible:ring-1 focus-visible:ring-ink-300 sm:w-auto sm:shrink-0"
      />
    </form>
  );
}

export default TaskForm;
