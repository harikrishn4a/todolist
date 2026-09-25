import type { Task } from "../api";

interface TaskListProps {
  tasks: Task[];
}

function TaskList({ tasks }: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="text-neutral-400">No tasks yet.</p>;
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li key={task.id} className="text-neutral-900">
          {task.title}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
