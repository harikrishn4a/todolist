import type { Task } from "../api";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onEdit: (id: number, title: string) => void;
}

function TaskList({ tasks, onEdit }: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="text-neutral-400">No tasks yet.</p>;
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onEdit={onEdit} />
      ))}
    </ul>
  );
}

export default TaskList;
