import { useState } from "react";

interface TaskFormProps {
  onAdd: (title: string) => void;
}

function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a task and press Enter"
        className="w-full border-b border-neutral-300 bg-transparent py-2 text-base outline-none placeholder:text-neutral-400 focus:border-neutral-900"
      />
    </form>
  );
}

export default TaskForm;
