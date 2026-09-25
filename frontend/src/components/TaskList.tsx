import type { Task } from "../api";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onEdit: (id: number, title: string) => void;
  onDelete: (id: number) => void;
  onToggleCompleted: (id: number, completed: boolean) => void;
}

function TaskList({ tasks, onEdit, onDelete, onToggleCompleted }: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="text-ink-300">Nothing here yet — add a line above.</p>;
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleCompleted={onToggleCompleted}
        />
      ))}
    </ul>
  );
}

export default TaskList;
