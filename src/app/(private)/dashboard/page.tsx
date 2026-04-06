'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Project } from '@/types/project';
import { FolderKanban, Users, CheckSquare, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) router.push('/login');
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!user) return;
    const fetchProjects = async () => {
      try {
        setLoadingProjects(true);
        const res = await fetch('/api/projects', { credentials: 'include' });
        if (!res.ok) throw new Error('Erro ao carregar projetos');
        const data: Project[] = await res.json();
        setProjects(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchProjects();
  }, [user]);

  // Cálculo das estatísticas reais
  const totalProjects = projects.length;
  const uniqueMembers = new Set();
  projects.forEach(project => {
    project.members?.forEach(member => uniqueMembers.add(member.user.id));
  });
  const totalMembers = uniqueMembers.size;
  const totalTasks = projects.reduce((acc, project) => acc + (project.tasks?.length || 0), 0);

  const stats = [
    { label: 'Projetos', value: totalProjects, icon: FolderKanban, color: 'bg-blue-500' },
    { label: 'Membros', value: totalMembers, icon: Users, color: 'bg-green-500' },
    { label: 'Tarefas', value: totalTasks, icon: CheckSquare, color: 'bg-purple-500' },
  ];

  const recentProjects = projects.slice(0, 3);

  const handleCardClick = (projectId: string) => {
    router.push(`/projects/${projectId}`);
  };

  if (authLoading) {
    return <div className="flex justify-center items-center min-h-[60vh]">Verificando autenticação...</div>;
  }
  if (!user) return null;
  if (loadingProjects) {
    return <div className="flex justify-center items-center min-h-[60vh]">Carregando projetos...</div>;
  }
  if (error) {
    return <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">Erro: {error}</div>;
  }

  return (
    <div className="space-y-8">
      {/* Cabeçalho de boas-vindas */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
        <h1 className="text-3xl font-bold">Olá, {user.name} 👋</h1>
        <p className="text-indigo-100 mt-2">
          Bem-vindo ao seu painel de controle. Aqui você acompanha tudo o que importa.
        </p>
      </div>

      {/* Cards de estatísticas dinâmicas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between transition hover:shadow-lg"
          >
            <div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </div>
            <div className={`${stat.color} p-3 rounded-full text-white`}>
              <stat.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      {/* Seção de projetos recentes */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Projetos Recentes</h2>
          <button
            onClick={() => router.push('/projects')}
            className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 text-sm font-medium"
          >
            Ver todos <ArrowRight size={16} />
          </button>
        </div>

        {recentProjects.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
            Nenhum projeto encontrado. Comece criando um novo projeto.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleCardClick(project.id)}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer border border-gray-100 overflow-hidden group"
              >
                <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition">
                    {project.name}
                  </h3>
                  <div className="mt-4 flex justify-end">
                    <span className="text-indigo-500 text-sm flex items-center gap-1">
                      Ver detalhes <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}