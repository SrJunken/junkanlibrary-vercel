export interface BorrowedBook {
  id: string
  bookId: string
  title: string
  author: string
  coverId?: number
  borrowedDate: string
  dueDate: string
  returned: boolean
  returnedDate?: string
}

export interface BorrowState {
  borrowedBooks: BorrowedBook[]
  isLoading: boolean
  error: string | null
}