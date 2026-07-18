import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://car-recommendation-app-backend.onrender.com/api",
  timeout: 30000,
});

export default api;
