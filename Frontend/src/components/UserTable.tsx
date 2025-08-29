import type { User } from "../types";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export default function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden min-h-48">
      <table className="min-w-full">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="py-3 px-4 text-gray-600">ID</th>
            <th className="py-3 px-4 text-gray-600">Nome</th>
            <th className="py-3 px-4 text-gray-600">Email</th>
            <th className="py-3 px-4 text-right text-gray-600">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 && (
            <tr>
              <td colSpan={4} className="py-6 px-4 text-center text-gray-500 bg-gray-50">
                Nenhum usuário ainda.
              </td>
            </tr>
          )}
          {users.map((u: User) => (
            <tr key={u.id} className="border-t border-gray-200">
              <td className="py-3 px-4 text-gray-800">{u.id}</td>
              <td className="py-3 px-4 text-gray-800">{u.name}</td>
              <td className="py-3 px-4 text-gray-800">{u.email}</td>
              <td className="py-3 px-4">
                <div className="flex gap-2 justify-end">
                  <button
                    className="px-3 py-1 rounded bg-amber-500 text-white hover:bg-amber-600"
                    onClick={() => onEdit(u)}
                  >
                    Editar
                  </button>
                  <button
                    className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                    onClick={() => onDelete(u.id)}
                  >
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
