// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react'
import authApi from '../api/auth'
import { toast } from 'react-toastify'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // Initialize auth state
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const userData = await authApi.getCurrentUser()
                setUser(userData)
            } catch (error) {
                setUser(null)
            } finally {
                setLoading(false)
            }
        }
        initializeAuth()
    }, [])

    const login = async (credentials) => {
        try {
            const userData = await authApi.login(credentials)
            setUser(userData)
            toast.success('Login successful')
            return userData
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed')
            throw error
        }
    }

    const register = async (userData) => {
        try {
            const newUser = await authApi.register(userData)
            toast.success('Registration successful')
            return newUser
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed')
            throw error
        }
    }

    const logout = async () => {
        try {
            await authApi.logout()
            setUser(null)
            toast.success('Logged out successfully')
        } catch (error) {
            toast.error('Logout failed')
        }
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}