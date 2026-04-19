import { render } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import type { ReactNode } from 'react'
import searchReducer from '../store/searchSlice'
import themeReducer from '../store/themeSlice'
import authReducer from '../store/authSlice'

export function renderWithProviders(
  ui: ReactNode,
  {
    preloadedState = {},
    route = '/',
  }: { preloadedState?: object; route?: string } = {}
) {
  const store = configureStore({
    reducer: {
      search: searchReducer,
      theme: themeReducer,
      auth: authReducer,
    },
    preloadedState,
  })

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        {ui}
      </MemoryRouter>
    </Provider>
  )
}