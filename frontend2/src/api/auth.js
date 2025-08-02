// src/api/auth.js
import axios from 'axios'

const API_URL = 'http://localhost:8080/api/auth'

const register = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData, {
        withCredentials: true
    })
    return response.data
}

// src/api/auth.js
const login = async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
        validateStatus: (status) => {
            return status < 500; // Reject only if status is >= 500
        }
    });
    return response.data;
};

const logout = async () => {
    const response = await axios.post(`${API_URL}/logout`, {}, {
        withCredentials: true
    })
    return response.data
}

const getCurrentUser = async () => {
    try {
        const response = await axios.get(`${API_URL}/current-user`, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        if (error.response?.status === 401) {
            return null // Not authenticated
        }
        throw error
    }
}

export default {
    register,
    login,
    logout,
    getCurrentUser
}