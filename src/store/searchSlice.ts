import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { Book, OpenLibraryResponse } from '../types/book'

export const fetchBooks = createAsyncThunk(
  'search/fetchBooks',
  async (query: string, { rejectWithValue }) => {
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=20`
    )
    if (!res.ok) return rejectWithValue(`HTTP error: ${res.status}`)
    const data: OpenLibraryResponse = await res.json()
    return data.docs
  }
)

interface SearchState {
  query: string
  books: Book[]
  isLoading: boolean
  error: string | null
}

const initialState: SearchState = {
  query: '',
  books: [],
  isLoading: false,
  error: null,
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload
    },
    clearResults(state) {
      state.books = []
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.isLoading = false
        state.books = action.payload
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { setQuery, clearResults } = searchSlice.actions
export default searchSlice.reducer