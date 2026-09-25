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
    <form onSubmit={handleSubmit} className="mb-8 flex items-end gap-3 border-b border-neutral-300 focus-within:border-neutral-900">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a task and press Enter"
        className="w-full bg-transparent py-2 text-base outline-none placeholder:text-neutral-400"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        aria-label="Due date"
        className="shrink-0 bg-transparent py-2 text-sm text-neutral-400 outline-none"
      />
    </form>
  );
}

export default TaskForm;
