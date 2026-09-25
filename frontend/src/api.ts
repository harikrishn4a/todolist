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

export async function updateTask(id: number, title: string): Promise<Task> {
  const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  return res.json();
}

export async function deleteTask(id: number): Promise<void> {
  await fetch(`${API_BASE_URL}/tasks/${id}`, { method: "DELETE" });
}

export async function toggleTaskCompleted(id: number, completed: boolean): Promise<Task> {
  const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });
  return res.json();
}
