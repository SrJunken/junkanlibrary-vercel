import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

const AboutPage = lazy(() => import('./pages/AboutPage'))
const BookDetailPage = lazy(() => import('./pages/BookDetailPage'))

function LoadingFallback() {
  return (
    <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
      Loading…
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>

        <Route element={<AppLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />

          <Route path="/search" element={
            <ProtectedRoute><SearchPage /></ProtectedRoute>
          } />
          <Route path="/search/:initialSearchTerm" element={
            <ProtectedRoute><SearchPage /></ProtectedRoute>
          } />
          <Route path="/books/:bookId" element={
            <ProtectedRoute><BookDetailPage /></ProtectedRoute>
          } />

          <Route path="*" element={
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              <h2>404 — Page not found</h2>
            </div>
          } />
        </Route>
      </Routes>
    </Suspense>
  )
}