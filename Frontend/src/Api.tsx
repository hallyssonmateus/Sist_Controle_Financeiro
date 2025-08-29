import type { User } from "./types";

const API_BASE = "http://localhost:5283/api/Usuarios";

// pegar todos os usuários
export async function getUsers(): Promise<User[]> {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error("Erro ao buscar usuários");
  return res.json();
}

// criar usuário (não mandamos o id)
export async function createUser(user: Omit<User, "id">): Promise<User> {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Erro ao criar usuário");
  return res.json();
}

// atualizar usuário
export async function updateUser(id: number, user: Omit<User, "id">): Promise<User> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Erro ao atualizar usuário");
  return res.json();
}

// deletar usuário
export async function deleteUser(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao excluir usuário");
}