import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Book } from '../types/book'
import './BookCard.scss'

interface BookCardProps {
  book: Book
}

export default memo(function BookCard({ book }: BookCardProps) {
  const navigate = useNavigate()
  const title = book.title || 'No Title'
  const author = book.author_name?.join(', ') ?? 'Unknown Author'
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null

  const workId = book.key?.split('/works/')[1]

  const handleClick = () => {
    if (workId) navigate(`/books/${workId}`)
  }

  return (
    <div
      className={`book-card ${workId ? 'clickable' : ''}`}
      onClick={handleClick}
      role={workId ? 'button' : undefined}
      tabIndex={workId ? 0 : undefined}
      onKeyDown={e => { if (e.key === 'Enter') handleClick() }}
    >
      {coverUrl ? (
        <img className="book-cover" src={coverUrl} alt={title} loading="lazy" />
      ) : (
        <div className="no-cover">no cover</div>
      )}
      <div className="book-info">
        <h3 className="book-title">{title}</h3>
        <p className="book-author">{author}</p>
      </div>
    </div>
  )
})