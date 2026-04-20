import { createSlice } from '@reduxjs/toolkit'

interface ThemeState {
  mode: 'light' | 'dark'
}

const getInitialTheme = (): 'light' | 'dark' => {
  try {
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme
    }
  } catch (error) {
    console.error('Error reading theme from localStorage:', error)
  }
  
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  
  return 'light'
}

const initialState: ThemeState = {
  mode: getInitialTheme(),
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', state.mode)
    },
  },
})

export const { toggleTheme } = themeSlice.actions
export default themeSlice.reducer