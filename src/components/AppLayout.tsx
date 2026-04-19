import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/useRedux'
import { toggleTheme } from '../store/themeSlice'
import { logout } from '../store/authSlice'
import './AppLayout.scss'

export default function AppLayout() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const theme = useAppSelector(state => state.theme.mode)
  const { token, email } = useAppSelector(state => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }
  return (
    <div className={`app ${theme}`}>
      <div className="layout-container">
        <header className="site-header">
          <div className="header-brand">
            <h1>Junkan Library</h1>
          </div>
          <nav className="site-nav">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
            {token && (
              <NavLink to="/search" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Search</NavLink>
            )}
            <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>About</NavLink>
          </nav>
          <div className="header-actions">
            {token ? (
              <>
                <span className="user-email">{email}</span>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <button className="logout-btn" onClick={() => navigate('/login')}>Login</button>
            )}
            
            <button onClick={() => dispatch(toggleTheme())} className="theme-btn">
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </header>

        <main className="site-main">
          <Outlet />
        </main>

        <footer className="site-footer">
          <p>footer :P</p>
        </footer>
      </div>
    </div>
  )
}