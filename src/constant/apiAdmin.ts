import axios from "axios";
export const apiAdmin = axios.create({ 
    baseURL: 'https://localhost:7062',
    timeout: 1000 * 60 * 30 * 3, // 90 minutes
  });
