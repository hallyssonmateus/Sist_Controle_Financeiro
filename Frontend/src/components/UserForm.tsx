import { useEffect, useState } from "react";
import type { User } from "../types";

interface UserFormProps {
  initialData?: User | null; // pode vir nulo ou vazio
  onSubmit: (data: Omit<User, "id">) => void; // não precisamos do id na criação
  onCancel: () => void;
}

export default function UserForm({ initialData, onSubmit, onCancel }: UserFormProps) {
  const [form, setForm] = useState({ name: "", email: "", Senha: "" });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name ?? "",
        email: initialData.email ?? "",
        Senha: "", // não trazemos senha antiga por segurança
      });
    }
  }, [initialData]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.Senha) {
      alert("Preencha nome, email e senha");
      return;
    }
    onSubmit(form);
    setForm({ name: "", email: "", Senha: "" });
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow space-y-3">
      <h2 className="text-lg font-semibold">
        {initialData ? "Editar Usuário" : "Novo Usuário"}
      </h2>

      <div>
        <label className="block text-sm mb-1 text-gray-700">Nome</label>
        <input
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Ex.: João Silva"
        />
      </div>

      <div>
        <label className="block text-sm mb-1 text-gray-700">Email</label>
        <input
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="joao@email.com"
        />
      </div>

      <div>
        <label className="block text-sm mb-1 text-gray-700">Senha</label>
        <input
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          name="Senha"
          value={form.Senha}
          onChange={handleChange}
          placeholder="••••••"
        />
      </div>

      <div className="flex gap-2">
        <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
          {initialData ? "Salvar" : "Criar"}
        </button>
        {initialData && (
          <button
            type="button"
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            onClick={onCancel}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
