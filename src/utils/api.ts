import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchJobs = async () => {
    try {
        // Use /posts as a mock for jobs
        const response = await axios.get(`${API_BASE_URL}/posts`);
        return response.data;
    } catch (error) {
        console.error('Error fetching jobs:', error);
        throw error;
    }
};

export const fetchJobById = async (id: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/jobs/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching job with id ${id}:`, error);
        throw error;
    }
};

export const loginUser = async (credentials: { email: string; password: string }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, credentials);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const registerUser = async (userData: { name: string; email: string; password: string }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/register`, userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};