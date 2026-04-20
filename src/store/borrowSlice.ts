import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import type { BorrowState, BorrowedBook } from '../types/borrow'

const loadFromLocalStorage = (): BorrowedBook[] => {
  try {
    const stored = localStorage.getItem('borrowedBooks')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const saveToLocalStorage = (books: BorrowedBook[]) => {
  localStorage.setItem('borrowedBooks', JSON.stringify(books))
}

const initialState: BorrowState = {
  borrowedBooks: loadFromLocalStorage(),
  isLoading: false,
  error: null,
}

export const borrowBook = createAsyncThunk(
  'borrow/borrowBook',
  async ({ bookId, title, author, coverId }: { bookId: string; title: string; author: string; coverId?: number }) => {
    const borrowedBook: BorrowedBook = {
      id: `${bookId}-${Date.now()}`,
      bookId,
      title,
      author,
      coverId,
      borrowedDate: new Date().toISOString(),
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days
      returned: false,
    }
    return borrowedBook
  }
)

export const returnBook = createAsyncThunk(
  'borrow/returnBook',
  async (borrowId: string) => {
    return { borrowId, returnedDate: new Date().toISOString() }
  }
)

const borrowSlice = createSlice({
  name: 'borrow',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(borrowBook.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(borrowBook.fulfilled, (state, action: PayloadAction<BorrowedBook>) => {
        state.isLoading = false
        state.borrowedBooks.push(action.payload)
        saveToLocalStorage(state.borrowedBooks)
      })
      .addCase(borrowBook.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Failed to borrow book'
      })
      .addCase(returnBook.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(returnBook.fulfilled, (state, action: PayloadAction<{ borrowId: string; returnedDate: string }>) => {
        state.isLoading = false
        const book = state.borrowedBooks.find(b => b.id === action.payload.borrowId)
        if (book) {
          book.returned = true
          book.returnedDate = action.payload.returnedDate
        }
        saveToLocalStorage(state.borrowedBooks)
      })
      .addCase(returnBook.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Failed to return book'
      })
  },
})

export const { clearError } = borrowSlice.actions
export default borrowSlice.reducer