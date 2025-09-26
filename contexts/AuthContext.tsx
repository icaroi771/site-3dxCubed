'use client'

import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import Cookies from 'js-cookie'

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  address?: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  role: 'user' | 'admin'
  createdAt: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'LOAD_USER'; payload: User | null }
  | { type: 'UPDATE_USER'; payload: Partial<User> }

const AuthContext = createContext<{
  state: AuthState
  dispatch: React.Dispatch<AuthAction>
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: RegisterData) => Promise<boolean>
  logout: () => void
  updateProfile: (userData: Partial<User>) => Promise<boolean>
} | null>(null)

interface RegisterData {
  name: string
  email: string
  password: string
  phone?: string
}

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isLoading: true
      }
    
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false
      }
    
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false
      }
    
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false
      }
    
    case 'LOAD_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false
      }
    
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null
      }
    
    default:
      return state
  }
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Load user from token on mount
  useEffect(() => {
    const token = Cookies.get('auth-token')
    if (token) {
      // Verify token and load user
      fetchUserFromToken(token)
    } else {
      dispatch({ type: 'LOAD_USER', payload: null })
    }
  }, [])

  const fetchUserFromToken = async (token: string) => {
    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const user = await response.json()
        dispatch({ type: 'LOGIN_SUCCESS', payload: user })
      } else {
        Cookies.remove('auth-token')
        dispatch({ type: 'LOAD_USER', payload: null })
      }
    } catch (error) {
      console.error('Error fetching user:', error)
      Cookies.remove('auth-token')
      dispatch({ type: 'LOAD_USER', payload: null })
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: 'LOGIN_START' })
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        Cookies.set('auth-token', data.token, { expires: 30 })
        dispatch({ type: 'LOGIN_SUCCESS', payload: data.user })
        toast.success('Login realizado com sucesso!')
        return true
      } else {
        dispatch({ type: 'LOGIN_FAILURE' })
        toast.error(data.message || 'Erro ao fazer login')
        return false
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' })
      toast.error('Erro de conexão. Tente novamente.')
      return false
    }
  }

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
      
      const data = await response.json()
      
      if (response.ok) {
        toast.success('Conta criada com sucesso! Faça login para continuar.')
        return true
      } else {
        toast.error(data.message || 'Erro ao criar conta')
        return false
      }
    } catch (error) {
      toast.error('Erro de conexão. Tente novamente.')
      return false
    }
  }

  const logout = () => {
    Cookies.remove('auth-token')
    dispatch({ type: 'LOGOUT' })
    toast.success('Logout realizado com sucesso!')
  }

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    try {
      const token = Cookies.get('auth-token')
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      })
      
      const data = await response.json()
      
      if (response.ok) {
        dispatch({ type: 'UPDATE_USER', payload: data.user })
        toast.success('Perfil atualizado com sucesso!')
        return true
      } else {
        toast.error(data.message || 'Erro ao atualizar perfil')
        return false
      }
    } catch (error) {
      toast.error('Erro de conexão. Tente novamente.')
      return false
    }
  }

  return (
    <AuthContext.Provider value={{
      state,
      dispatch,
      login,
      register,
      logout,
      updateProfile
    }}>
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

