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
                default_branch: repo.default_branch || "main"
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

export const githubService = {
    getAuthUrl: () => `${API_BASE_URL}/github/auth`,
};

export default api;
