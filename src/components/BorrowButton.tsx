import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/useRedux'
import { borrowBook, returnBook } from '../store/borrowSlice'
import './BorrowButton.scss'

interface BorrowButtonProps {
  bookId: string
  title: string
  author: string
  coverId?: number
}

export default function BorrowButton({ bookId, title, author, coverId }: BorrowButtonProps) {
  const dispatch = useAppDispatch()
  const { borrowedBooks, isLoading } = useAppSelector(state => state.borrow)
  const [isBorrowed, setIsBorrowed] = useState(false)
  const [borrowId, setBorrowId] = useState<string | null>(null)

  useEffect(() => {
    const activeBorrow = borrowedBooks.find(
      b => b.bookId === bookId && !b.returned
    )
    if (activeBorrow) {
      setIsBorrowed(true)
      setBorrowId(activeBorrow.id)
    } else {
      setIsBorrowed(false)
      setBorrowId(null)
    }
  }, [borrowedBooks, bookId])

  const handleBorrow = async () => {
    if (isBorrowed) return
    await dispatch(borrowBook({ bookId, title, author, coverId }))
  }

  const handleReturn = async () => {
    if (!borrowId) return
    await dispatch(returnBook(borrowId))
  }

  if (isBorrowed) {
    return (
      <button
        className="borrow-button borrowed return-button"
        onClick={handleReturn}
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : 'Return Book'}
      </button>
    )
  }

  return (
    <button
      className="borrow-button"
      onClick={handleBorrow}
      disabled={isLoading}
    >
      {isLoading ? 'Processing...' : 'Borrow Book'}
    </button>
  )
}