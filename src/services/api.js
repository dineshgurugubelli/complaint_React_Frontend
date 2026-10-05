import axios from "axios";

// One Axios instance for the whole app.
// Set VITE_API_URL in a .env file to point to a deployed API (e.g. Render).
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://complaint-react-backend.onrender.com",
});

export default api;
