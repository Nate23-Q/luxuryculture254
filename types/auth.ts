import { DefaultSession, DefaultUser } from 'next-auth'
import { JWT, DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      firstName: string
      lastName: string
      phone?: string
      avatar?: string
      role: 'user' | 'admin'
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    firstName: string
    lastName: string
    phone?: string
    avatar?: string
    role: 'user' | 'admin'
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string
    email: string
    firstName: string
    lastName: string
    phone?: string
    avatar?: string
    role: 'user' | 'admin'
  }
}

// Additional types for auth operations
export interface SignupInput {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
}

export interface LoginInput {
  email: string
  password: string
}

export interface AuthResponse {
  success: boolean
  message?: string
  user?: {
    id: string
    email: string
    firstName: string
    lastName: string
  }
  error?: string
}

export interface APIError {
  message: string
  statusCode: number
}

