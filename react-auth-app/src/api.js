import axios from 'axios';

const api = axios.create({
 baseURL: import.meta.env.VITE_BACKEND_URL || 'https://react-day-19.onrender.com',
});

export default api;
