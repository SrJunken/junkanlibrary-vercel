import { memo } from 'react'
import BookCard from './BookCard'
import type { Book } from '../types/book'
import './BookList.scss'

export default memo(function BookList({ books }: { books: Book[] }) {
  return (
    <div className="book-list">
      {books.map((book, i) => (
        <BookCard key={book.key ?? i} book={book} />
      ))}
    </div>
  )
})