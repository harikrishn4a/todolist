import { useState } from "react";
import type { Task } from "../api";

interface TaskItemProps {
  task: Task;
  onEdit: (id: number, title: string) => void;
  onDelete: (id: number) => void;
}

function TaskItem({ task, onEdit, onDelete }: TaskItemProps) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  function commit() {
    setEditing(false);
    const trimmed = title.trim();
    if (!trimmed || trimmed === task.title) {
      setTitle(task.title);
      return;
    }
    onEdit(task.id, trimmed);
  }

  if (editing) {
    return (
      <li>
        <input
          type="text"
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => e.key === "Enter" && commit()}
          className="w-full border-b border-neutral-300 bg-transparent outline-none focus:border-neutral-900"
        />
      </li>
    );
  }

  return (
    <li className="group flex items-center justify-between text-neutral-900">
      <span onClick={() => setEditing(true)} className="cursor-text">
        {task.title}
      </span>
      <button
        onClick={() => onDelete(task.id)}
        aria-label={`Delete ${task.title}`}
        className="text-neutral-300 opacity-0 transition-opacity hover:text-neutral-900 group-hover:opacity-100"
      >
        ×
      </button>
    </li>
  );
}

export default TaskItem;
