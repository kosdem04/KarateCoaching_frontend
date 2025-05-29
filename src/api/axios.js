import axios from 'axios';

const api = axios.create({
    // baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost/api/",
    headers: {
        'Content-Type': 'application/json',
    },
});

// Добавляем интерцептор, который всегда берёт актуальный токен
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
