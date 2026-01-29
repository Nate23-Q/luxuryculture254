'use client'

import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useState } from 'react'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  avatar?: string
  addresses?: any[]
}

interface UseAuthReturn {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  error: Error | null
  refreshUser: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; error?: string }>
}

export function useAuth(): UseAuthReturn {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      setUser({
        id: session.user.id,
        email: session.user.email,
        firstName: session.user.firstName,
        lastName: session.user.lastName,
        phone: session.user.phone,
        avatar: session.user.avatar,
      })
    } else if (status === 'unauthenticated') {
      setUser(null)
    }
    setIsLoading(status === 'loading')
  }, [session, status])

  const refreshUser = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/auth/profile')
      const data = await res.json()
      
      if (data.success) {
        setUser(data.user)
      } else {
        setError(new Error(data.error))
      }
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const updateProfile = useCallback(async (data: Partial<User>) => {
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      
      const result = await res.json()
      
      if (result.success) {
        setUser(result.user)
        return { success: true }
      } else {
        return { success: false, error: result.error }
      }
    } catch (err) {
      return { success: false, error: 'Failed to update profile' }
    }
  }, [])

  return {
    user,
    isLoading,
    isAuthenticated: status === 'authenticated',
    error,
    refreshUser,
    updateProfile,
  }
}

// Hook for protected routes
export function useProtectedRoute() {
  const { status } = useSession()

  useEffect(() => {
    if (status === 'unauthenticated') {
      // Redirect to sign in if not authenticated
      window.location.href = '/auth/signin?callbackUrl=' + encodeURIComponent(window.location.pathname)
    }
  }, [status])

  return { isLoading: status === 'loading' }
}

