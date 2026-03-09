export const API_BASE = "http://localhost:8000/api";

export async function apiFetch(endpoint, options = {}) {
    const defaultHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    const token = localStorage.getItem('ishine_token');
    if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    };

    const response = await fetch(`${API_BASE}${endpoint}`, config);

    if (response.status === 401) {
        localStorage.removeItem('ishine_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    }

    if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
    }

    return response.json();
}
