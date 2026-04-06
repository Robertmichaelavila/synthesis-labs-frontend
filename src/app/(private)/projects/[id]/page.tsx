'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useParams, useRouter } from 'next/navigation';
import { Project } from '@/types/project';
import {
  PlusCircle,
  UserPlus,
  Trash2,
  Calendar,
  CheckCircle2,
  AlertCircle,
  X,
  Users,
  ListTodo,
} from 'lucide-react';

export default function ProjectDetailPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [removingMember, setRemovingMember] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuth, setIsAuth] = useState(false);

  // Estados dos modais
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    assignedUserId: '',
  });
  const [submittingTask, setSubmittingTask] = useState(false);

  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    role: 'MEMBER',
  });
  const [submittingMember, setSubmittingMember] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

  // Redireciona se não autenticado
  useEffect(() => {
    if (!authLoading && !user) router.push('/login');
  }, [authLoading, user, router]);

  const fetchProjectDetails = async () => {
    if (!user || !projectId) return;
    try {
      setLoading(true);
      const res = await fetch(`/api/projects/${projectId}`, { credentials: 'include' });
      if (!res.ok) throw new Error('Erro ao carregar detalhes');
      const data: Project = await res.json();
      setProject(data);

      // Verifica se o usuário atual é AUTH do projeto
      const isUserAuth = data.members?.some(
        (m) => m.user.id === user.id && m.role === 'AUTH'
      );
      setIsAuth(!!isUserAuth);

      // Define um responsável padrão para nova tarefa
      if (data.members?.length > 0 && !newTask.assignedUserId) {
        const currentMember = data.members.find((m) => m.user.id === user.id);
        if (currentMember) {
          setNewTask((prev) => ({ ...prev, assignedUserId: currentMember.user.id }));
        } else if (data.members[0]) {
          setNewTask((prev) => ({ ...prev, assignedUserId: data.members[0].user.id }));
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectDetails();
  }, [user, projectId]);

  // Criar tarefa
  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmittingTask(true);
    try {
      const payload = {
        title: newTask.title,
        description: newTask.description,
        dueDate: newTask.dueDate ? new Date(newTask.dueDate).toISOString() : null,
        userId: newTask.assignedUserId,
      };
      const res = await fetch(`/api/projects/${projectId}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include',
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Erro ao criar tarefa');
      }
      await fetchProjectDetails();
      setIsTaskModalOpen(false);
      setNewTask({ title: '', description: '', dueDate: '', assignedUserId: '' });
      if (project?.members?.length) {
        const currentMember = project.members.find((m) => m.user.id === user.id);
        setNewTask((prev) => ({
          ...prev,
          assignedUserId: currentMember ? currentMember.user.id : project.members[0].user.id,
        }));
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmittingTask(false);
    }
  };

  // Função para remover membro
  const handleRemoveMember = async (memberUserId: string, memberName: string) => {
    if (!confirm(`Tem certeza que deseja remover ${memberName} deste projeto?`)) return;
    setRemovingMember(memberUserId);
    try {
      const res = await fetch(`/api/projects/${projectId}/members/${memberUserId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Erro ao remover membro');
      }
      await fetchProjectDetails(); // recarrega a lista de membros
    } catch (err: any) {
      alert(err.message);
    } finally {
      setRemovingMember(null);
    }
  };

  // Adicionar membro
  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingMember(true);
    try {
      const payload = {
        name: newMember.name,
        email: newMember.email,
        role: newMember.role,
      };
      const res = await fetch(`/api/projects/${projectId}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include',
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Erro ao adicionar membro');
      }
      await fetchProjectDetails();
      setIsMemberModalOpen(false);
      setNewMember({ name: '', email: '', role: 'MEMBER' });
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmittingMember(false);
    }
  };

  // Excluir projeto
  const handleDeleteProject = async () => {
    if (!confirm('⚠️ Tem certeza? Esta ação excluirá o projeto, todas as tarefas e membros. Essa operação é irreversível.')) {
      return;
    }
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Erro ao excluir projeto');
      }
      router.push('/projects');
    } catch (err: any) {
      alert(err.message);
      setIsDeleting(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse text-gray-500">Carregando projeto...</div>
      </div>
    );
  }
  if (!user) return null;
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
        Erro: {error}
      </div>
    );
  }
  if (!project) {
    return (
      <div className="text-center py-12 text-gray-500">Projeto não encontrado.</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Cabeçalho com ações (sem botão voltar) */}
      <div className="flex flex-wrap justify-end gap-3">
        <button
          onClick={() => setIsTaskModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-sm"
        >
          <PlusCircle size={18} />
          <span>Nova Tarefa</span>
        </button>
        <button
          onClick={() => setIsMemberModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm"
        >
          <UserPlus size={18} />
          <span>Adicionar Membro</span>
        </button>
        {isAuth && (
          <button
            onClick={handleDeleteProject}
            disabled={isDeleting}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-sm disabled:opacity-50"
          >
            <Trash2 size={18} />
            <span>{isDeleting ? 'Excluindo...' : 'Excluir Projeto'}</span>
          </button>
        )}
      </div>

      {/* Título e descrição do projeto */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
        <p className="text-gray-500 mt-1">
          Criado em {new Date(project.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Grid de conteúdo: Membros e Tarefas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Seção Membros */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center gap-2">
            <Users size={20} className="text-indigo-500" />
            <h2 className="text-xl font-semibold text-gray-800">Membros</h2>
          </div>
          <div className="p-6">
            {project.members?.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Nenhum membro associado. Adicione membros para colaborar.
              </p>
            ) : (
              <div className="space-y-4">
                {project.members?.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
                        {member.user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{member.user.name}</p>
                        <p className="text-xs text-gray-500">{member.user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          member.role === 'AUTH'
                            ? 'bg-amber-100 text-amber-700'
                            : member.role === 'ADMIN'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {member.role}
                      </span>
                      {isAuth && member.user.id !== user?.id && (
                        <button
                          onClick={() => handleRemoveMember(member.user.id, member.user.name)}
                          disabled={removingMember === member.user.id}
                          className="text-red-500 hover:text-red-700 transition disabled:opacity-50"
                          title="Remover membro"
                        >
                          {removingMember === member.user.id ? (
                            <span className="text-xs">...</span>
                          ) : (
                            <Trash2 size={16} />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Seção Tarefas */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center gap-2">
            <ListTodo size={20} className="text-green-500" />
            <h2 className="text-xl font-semibold text-gray-800">Tarefas</h2>
          </div>
          <div className="p-6">
            {project.tasks?.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Nenhuma tarefa criada. Clique em "Nova Tarefa" para começar.
              </p>
            ) : (
              <div className="space-y-4">
                {project.tasks?.map((task) => {
                  const assignedMember = project.members?.find(
                    (m) => m.user.id === task.userId
                  );
                  const isOverdue =
                    task.dueDate && new Date(task.dueDate) < new Date();
                  return (
                    <div
                      key={task.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                    >
                      <div className="flex flex-wrap justify-between items-start gap-2">
                        <h3 className="font-semibold text-gray-800">{task.title}</h3>
                        {isOverdue && (
                          <span className="inline-flex items-center gap-1 text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                            <AlertCircle size={12} />
                            Atrasada
                          </span>
                        )}
                      </div>
                      {task.description && (
                        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                      )}
                      <div className="flex flex-wrap gap-3 mt-3 text-xs text-gray-500">
                        {task.dueDate && (
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        )}
                        {assignedMember && (
                          <span className="flex items-center gap-1">
                            <CheckCircle2 size={12} />
                            Responsável: {assignedMember.user.name}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modais (mantidos iguais) */}
      {/* Modal de criação de tarefa */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Nova Tarefa</h2>
              <button onClick={() => setIsTaskModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleCreateTask}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Título *</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Descrição</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Data de Vencimento</label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Responsável</label>
                <select
                  value={newTask.assignedUserId}
                  onChange={(e) => setNewTask({ ...newTask, assignedUserId: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Selecione um membro</option>
                  {project.members?.map((member) => (
                    <option key={member.user.id} value={member.user.id}>
                      {member.user.name} ({member.role})
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsTaskModalOpen(false)}
                  className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={submittingTask || !newTask.assignedUserId}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {submittingTask ? 'Criando...' : 'Criar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de adicionar membro */}
      {isMemberModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Adicionar Membro</h2>
              <button onClick={() => setIsMemberModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddMember}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Nome *</label>
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Role *</label>
                <select
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="MEMBER">MEMBER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  ADMIN pode adicionar tarefas e gerenciar membros.
                </p>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsMemberModalOpen(false)}
                  className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={submittingMember}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {submittingMember ? 'Adicionando...' : 'Adicionar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}