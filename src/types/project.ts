// types/project.ts

// Usuário dentro de member
export interface MemberUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Membro do projeto (como retornado pela API)
export interface Member {
  id: string;
  userId: string;
  projectId: string;
  role: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

// Tarefa (ainda vazia no exemplo)
export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  projectId: string;
  userId: string;
  createdAt: string;
  status?: string;      // opcional
  assignedTo?: string;  // opcional
}

// Projeto completo (como retornado por /projects e /projects/:id)
export interface Project {
  id: string;
  name: string;
  createdAt: string;
  members: Member[];
  tasks: Task[];
}

// Versão resumida para o Dashboard
export interface ProjectSummary {
  id: string;
  name: string;
}