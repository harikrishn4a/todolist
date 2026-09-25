export const API_BASE_URL = "http://localhost:8000";

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
}

export async function listTasks(): Promise<Task[]> {
  const res = await fetch(`${API_BASE_URL}/tasks`);
  return res.json();
}

export async function addTask(title: string): Promise<Task> {
  const res = await fetch(`${API_BASE_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  return res.json();
}
