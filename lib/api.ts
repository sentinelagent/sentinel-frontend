import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Crucial for HttpOnly cookies
});

export interface GithubInstallation {
    id: string;
    installation_id: number;
    github_account_username: string;
    github_account_type: string;
}

export interface UserProfile {
    id: string;
    email: string;
    github_installations?: GithubInstallation[];
}

export const userService = {
    register: async (data: any) => {
        const response = await api.post('/users/register', data);
        return response.data;
    },
    login: async (data: any) => {
        const response = await api.post('/users/login', data);
        return response.data;
    },
    logout: async () => {
        const response = await api.post('/users/logout');
        return response.data;
    },
    whoami: async () => {
        const response = await api.get<UserProfile>('/users/whoami');
        return response.data;
    },
    setInstallationId: async (installationId: number) => {
        const response = await api.post('/users/set-user-id-for-installation', null, {
            params: { installation_id: installationId }
        });
        return response.data;
    },
};

export interface Repository {
    id: string;
    github_repo_id: number;
    github_repo_name: string;
    full_name: string;
    default_branch: string;
    private: boolean;
    last_indexed_at?: string;
}

export interface IndexingStep {
    id: string;
    label: string;
    status: 'pending' | 'in_progress' | 'completed' | 'failed';
}

export const repositoryService = {
    getAll: async () => {
        const response = await api.get<Repository[]>('/repository/all');
        return response.data;
    },
    getUserSelected: async () => {
        const response = await api.get<Repository[]>('/repository/user-selected');
        return response.data;
    },
};

export const indexingService = {
    startIndexing: async (installationId: number, repositories: any[]) => {
        const response = await api.post<any>('/indexing/index', {
            installation_id: installationId,
            repositories: repositories.map(repo => ({
                github_repo_name: repo.full_name,
                github_repo_id: repo.id, // This is the numerical ID from GitHub
                repo_id: repo.node_id || String(repo.id),
                repo_url: repo.html_url,
                default_branch: repo.default_branch || "main",
                template_ids: repo.template_ids || []
            })),
        });
        return response.data;
    },
    getEventSource: (workflowId: string, runId?: string) => {
        // We pass withCredentials: true so the access_token cookie is sent
        let url = `${API_BASE_URL}/workflows/${workflowId}/events`;
        if (runId) {
            url += `?run_id=${encodeURIComponent(runId)}`;
        }
        return new EventSource(url, { withCredentials: true });
    },
};

export interface ContextTemplate {
    id: string;
    user_id: string;
    name: string;
    description: string | null;
    template_content: {
        guidelines?: string[];
        coding_standards?: Record<string, any>;
        custom_rules?: Array<{ rule: string; severity: string }>;
        focus_areas?: string[];
        ignore_patterns?: string[];
        additional_context?: string;
    };
    visibility: 'private' | 'organization' | 'public';
    is_default: boolean;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface ContextTemplateList {
    templates: ContextTemplate[];
    total: number;
    page: number;
    page_size: number;
    has_more: boolean;
}

export interface ContextTemplateCreate {
    name: string;
    description?: string;
    template_content?: Record<string, any>;
    visibility?: 'private' | 'organization' | 'public';
}

export interface RepositoryTemplateAssignment {
    id: string;
    repository_id: string;
    template_id: string;
    priority: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    template?: ContextTemplate;
}

export const githubService = {
    getAuthUrl: () => `${API_BASE_URL}/github/auth`,
};

export const contextTemplateService = {
    getAll: async (page = 1, pageSize = 20) => {
        const response = await api.get<ContextTemplateList>('/templates', {
            params: { page, page_size: pageSize }
        });
        return response.data;
    },
    get: async (id: string) => {
        const response = await api.get<ContextTemplate>(`/templates/${id}`);
        return response.data;
    },
    create: async (data: ContextTemplateCreate) => {
        const response = await api.post<ContextTemplate>('/templates', data);
        return response.data;
    },
    update: async (id: string, data: Partial<ContextTemplateCreate> & { is_active?: boolean }) => {
        const response = await api.patch<ContextTemplate>(`/templates/${id}`, data);
        return response.data;
    },
    delete: async (id: string, hardDelete = false) => {
        await api.delete(`/templates/${id}`, {
            params: { hard_delete: hardDelete }
        });
    },
    getRepositoryAssignments: async (repositoryId: string) => {
        const response = await api.get<{ assignments: RepositoryTemplateAssignment[], total: number }>(
            `/repository/${repositoryId}/templates`
        );
        return response.data;
    },
    assignToRepository: async (repositoryId: string, templateId: string, priority = 0) => {
        const response = await api.post<RepositoryTemplateAssignment>(
            `/repository/${repositoryId}/templates`,
            { template_id: templateId, priority }
        );
        return response.data;
    },
    bulkAssign: async (repositoryId: string, templateIds: string[], replaceExisting = false) => {
        const response = await api.post<{ assigned_count: number }>(
            `/repository/${repositoryId}/templates/bulk`,
            { template_ids: templateIds, replace_existing: replaceExisting }
        );
        return response.data;
    },
    reorderAssignments: async (repositoryId: string, assignmentIds: string[]) => {
        const response = await api.post<RepositoryTemplateAssignment[]>(
            `/repository/${repositoryId}/templates/reorder`,
            { assignment_ids: assignmentIds }
        );
        return response.data;
    },
    getEffectiveTemplates: async (repositoryId: string) => {
        const response = await api.get<ContextTemplate[]>(`/repository/${repositoryId}/effective-templates`);
        return response.data;
    }
};

export default api;
