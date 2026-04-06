'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordMessage('');
    if (newPassword !== confirmPassword) {
      setPasswordError('As senhas não coincidem');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('A senha deve ter pelo menos 6 caracteres');
      return;
    }
    try {
      const res = await fetch('/api/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
        credentials: 'include',
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Erro ao alterar senha');
      }
      setPasswordMessage('Senha alterada com sucesso!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setPasswordError(err.message);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== 'DELETAR') {
      alert('Digite "DELETAR" para confirmar a exclusão.');
      return;
    }
    if (!confirm('⚠️ Tem certeza? Esta ação é irreversível. Todos os seus projetos onde você é dono serão excluídos permanentemente.')) {
      return;
    }
    setIsDeleting(true);
    try {
      const res = await fetch('/api/me', {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Erro ao deletar conta');
      }
      await logout(); // limpa estado local
      router.push('/login');
    } catch (err: any) {
      alert(err.message);
      setIsDeleting(false);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Configurações</h1>

      {/* Alterar Senha */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Alterar Senha</h2>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Senha Atual</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Nova Senha</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Confirmar Nova Senha</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
          {passwordMessage && <p className="text-green-500 text-sm">{passwordMessage}</p>}
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Atualizar Senha
          </button>
        </form>
      </div>

      {/* Deletar Conta */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-red-200">
        <h2 className="text-xl font-semibold text-red-700 mb-4">Deletar Conta</h2>
        <p className="text-gray-600 mb-4">
          Esta ação é irreversível. Todos os projetos onde você é <strong>dono (AUTH)</strong> serão excluídos permanentemente.
          Nos projetos onde você é apenas membro, você será removido.
        </p>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">
            Digite <strong className="text-red-600">DELETAR</strong> para confirmar:
          </label>
          <input
            type="text"
            value={deleteConfirm}
            onChange={(e) => setDeleteConfirm(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
            placeholder="DELETAR"
          />
        </div>
        <button
          onClick={handleDeleteAccount}
          disabled={isDeleting}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
        >
          {isDeleting ? 'Deletando...' : 'Deletar minha conta'}
        </button>
      </div>
    </div>
  );
}