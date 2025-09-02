// Centralized Axios client
import axios from 'axios';

// Read base URL from environment with a sensible fallback
// For CRA, env vars must start with REACT_APP_
const baseURL = process.env.REACT_APP_API_BASE_URL || 'https://itp-movie-backend.vercel.app';

const apiClient = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
