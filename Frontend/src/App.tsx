import { useEffect, useState } from "react";
import { createUser, deleteUser, getUsers, updateUser } from "./Api";
import type { User } from "./types";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";


function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [editing, setEditing] = useState<User | null>(null); // usuário que estamos editando
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function loadUsers() {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
    } catch (e) {
      console.error(e);
      setMsg("Erro ao carregar usuários");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function handleCreateOrUpdate(formData: Omit<User, "id">) {
    try {
      setMsg("");
      if (editing?.id !== undefined) {
  await updateUser(editing.id, formData);
  setMsg("Usuário atualizado!");
} else {
        await createUser(formData);
        setMsg("Usuário criado!");
}

      setEditing(null);
      await loadUsers();
    } catch (e) {
      console.error(e);
      setMsg("Falha ao salvar.");
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Tem certeza que deseja excluir?")) return;
    try {
      await deleteUser(id);
      setMsg("Usuário excluído.");
      await loadUsers();
    } catch (e) {
      console.error(e);
      setMsg("Falha ao excluir.");
    }
  }

  return (
        <div className="max-w-5xl mx-auto p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Controle Financeiro — Usuários</h1>
        {loading && <span className="text-sm text-gray-500">Carregando...</span>}
      </header>

      {msg && (
        <div className="bg-green-50 text-green-700 border border-green-200 px-4 py-2 rounded">
          {msg}
        </div>
      )}

      <div className="space-y-6">
        <UserForm
          initialData={editing}
          onSubmit={handleCreateOrUpdate}
          onCancel={() => setEditing(null)}
        />
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Lista de Usuários</h2>
            <button
              className="text-sm underline"
              onClick={loadUsers}
              disabled={loading}
            >
              Atualizar
            </button>
          </div>
          <UserTable users={users} onEdit={setEditing} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  )
}

export default App
