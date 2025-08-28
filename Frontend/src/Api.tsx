const API_BASE = "http://localhost:5283/api";

export interface User {
  id?: number;      // id pode ser opcional quando criar novo
  name: string;
  email: string;
  senha: string;
}

export async function getUsers(): Promise<User[]> {
  const res = await fetch(`${API_BASE}/Usuarios`);
  if (!res.ok) throw new Error("Erro ao carregar usuários");
  return res.json();
}

export async function createUser(data: User): Promise<User> {
  const res = await fetch(`${API_BASE}/Usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao criar usuário");
  return res.json();
}

export async function updateUser(id: number, data: User): Promise<boolean> {
  const res = await fetch(`${API_BASE}/Usuarios/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...data }), // envia id + dados
  });
  if (!res.ok) throw new Error("Erro ao atualizar usuário");
  return true; // API retorna 204
}

export async function deleteUser(id: number): Promise<boolean> {
  const res = await fetch(`${API_BASE}/Usuarios/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erro ao deletar usuário");
  return true;
}