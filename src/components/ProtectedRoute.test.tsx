import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../test/testUtils'
import ProtectedRoute from '../components/ProtectedRoute'

describe('ProtectedRoute', () => {
  it('renders children when theres token', () => {
    renderWithProviders(
      <ProtectedRoute>
        <p>Protected content</p>
      </ProtectedRoute>,
      {
        preloadedState: {
          auth: { token: 'fake-token', email: 'test@test.com', role: 'user', isLoading: false, error: null },
        },
      }
    )
    expect(screen.getByText('Protected content')).toBeInTheDocument()
  })

  it('redirects to /login when theres no token', () => {
    renderWithProviders(
      <ProtectedRoute>
        <p>Protected content</p>
      </ProtectedRoute>,
      {
        preloadedState: {
          auth: { token: null, email: null, role: null, isLoading: false, error: null },
        },
      }
    )
    expect(screen.queryByText('Protected content')).not.toBeInTheDocument()
  })
})