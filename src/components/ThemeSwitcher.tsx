import { type Theme } from '../types/theme'
import './ThemeSwitcher.scss'
interface ThemeSwitcherProps {
  theme: Theme
  setTheme: (theme: Theme) => void
}

function ThemeSwitcher({ theme, setTheme }: ThemeSwitcherProps) {
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <button onClick={toggleTheme} className="theme-btn">
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}

export default ThemeSwitcher