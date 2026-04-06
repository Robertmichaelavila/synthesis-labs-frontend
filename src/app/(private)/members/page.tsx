'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Project } from '@/types/project';
import { Users, Mail, Briefcase, Search } from 'lucide-react';

interface MemberWithProjects {
  id: string;
  name: string;
  email: string;
  projects: { projectId: string; projectName: string; role: string }[];
}

export default function MembersPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [members, setMembers] = useState<MemberWithProjects[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!authLoading && !user) router.push('/login');
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!user) return;
    const fetchProjectsAndBuildMembers = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/projects', { credentials: 'include' });
        if (!res.ok) throw new Error('Erro ao carregar projetos');
        const projects: Project[] = await res.json();

        // Mapeia usuários únicos com seus projetos e papéis
        const membersMap = new Map<string, MemberWithProjects>();

        projects.forEach((project) => {
          project.members?.forEach((member) => {
            const userId = member.user.id;
            if (!membersMap.has(userId)) {
              membersMap.set(userId, {
                id: userId,
                name: member.user.name,
                email: member.user.email,
                projects: [],
              });
            }
            membersMap.get(userId)!.projects.push({
              projectId: project.id,
              projectName: project.name,
              role: member.role,
            });
          });
        });

        setMembers(Array.from(membersMap.values()));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjectsAndBuildMembers();
  }, [user]);

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (authLoading) {
    return <div className="flex justify-center items-center min-h-[60vh]">Verificando autenticação...</div>;
  }
  if (!user) return null;
  if (loading) {
    return <div className="flex justify-center items-center min-h-[60vh]">Carregando membros...</div>;
  }
  if (error) {
    return <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">Erro: {error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <Users size={28} className="text-indigo-500" />
          Membros
        </h1>
        <p className="text-gray-500 mt-1">
          Todos os colaboradores dos seus projetos.
        </p>
      </div>

      {/* Barra de pesquisa */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Buscar por nome ou e-mail..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
        />
      </div>

      {/* Lista de membros */}
      {filteredMembers.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-12 text-center">
          <Users size={48} className="mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500 text-lg">
            {searchTerm ? 'Nenhum membro encontrado com esse termo.' : 'Nenhum membro encontrado nos seus projetos.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition"
            >
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-lg">
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">{member.name}</h2>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                        <Mail size={14} /> {member.email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Projetos ({member.projects.length})
                  </p>
                  <div className="space-y-2">
                    {member.projects.map((proj) => (
                      <div
                        key={proj.projectId}
                        className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded"
                      >
                        <span className="font-medium text-gray-700 flex items-center gap-1">
                          <Briefcase size={14} />
                          {proj.projectName}
                        </span>
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            proj.role === 'AUTH'
                              ? 'bg-amber-100 text-amber-700'
                              : proj.role === 'ADMIN'
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          {proj.role}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}