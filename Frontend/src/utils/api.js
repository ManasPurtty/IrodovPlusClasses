// API Base URL Configuration
// In development / local testing, connects to http://localhost:3000
// In production or when VITE_BACKEND_URL is set, connects to remote backend

const getBackendUrl = () => {
  if (import.meta.env && import.meta.env.VITE_BACKEND_URL) {
    return import.meta.env.VITE_BACKEND_URL;
  }
  if (import.meta.env && import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:3000';
    }
  }
  return 'https://irodovbackend.onrender.com';
};

export const API_BASE_URL = getBackendUrl();
export default API_BASE_URL;
