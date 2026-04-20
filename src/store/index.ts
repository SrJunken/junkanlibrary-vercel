import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './searchSlice'
import themeReducer from './themeSlice'
import authReducer from './authSlice'
import borrowReducer from './borrowSlice'

export const store = configureStore({
  reducer: {
    search: searchReducer,
    theme: themeReducer,
    auth: authReducer,
    borrow: borrowReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch