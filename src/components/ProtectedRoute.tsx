import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/useRedux'
import type { ReactNode } from 'react'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const token = useAppSelector(state => state.auth.token)
  return token ? <>{children}</> : <Navigate to="/login" replace />
}