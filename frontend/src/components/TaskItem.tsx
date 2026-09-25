import { useState } from "react";
import type { Task } from "../api";

interface TaskItemProps {
  task: Task;
  onEdit: (id: number, title: string) => void;
  onDelete: (id: number) => void;
  onToggleCompleted: (id: number, completed: boolean) => void;
}

function TaskItem({ task, onEdit, onDelete, onToggleCompleted }: TaskItemProps) {
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
          className="w-full border-b border-line bg-transparent outline-none focus:border-ink-900"
        />
      </li>
    );
  }

  const isOverdue = !task.completed && task.due_date !== null && task.due_date < new Date().toISOString().slice(0, 10);

  return (
    <li className="group flex items-center gap-3">
      <button
        onClick={() => onToggleCompleted(task.id, !task.completed)}
        onKeyDown={(e) => e.key === "Enter" || e.key === " " ? (e.preventDefault(), onToggleCompleted(task.id, !task.completed)) : null}
        aria-label={`Mark ${task.title} as ${task.completed ? "incomplete" : "complete"}`}
        className="shrink-0 cursor-pointer select-none font-bold text-ink-900 transition-opacity hover:text-ink-500 focus:outline-none focus-visible:ring-1 focus-visible:ring-ink-300"
      >
        {task.completed ? "[x]" : "[ ]"}
      </button>
      <span
        onClick={() => setEditing(true)}
        className={`flex-1 cursor-text ${task.completed ? "text-ink-300 line-through" : "text-ink-900"}`}
      >
        {task.title}
      </span>
      {task.due_date && (
        <span className={`text-sm ${isOverdue ? "text-mark" : "text-ink-300"}`}>{task.due_date}</span>
      )}
      <button
        onClick={() => onDelete(task.id)}
        aria-label={`Delete ${task.title}`}
        className="opacity-0 transition-opacity hover:text-ink-900 group-hover:opacity-100 focus-visible:ring-1 focus-visible:ring-ink-300 focus:outline-none"
      >
        ×
      </button>
    </li>
  );
}

export default TaskItem;
