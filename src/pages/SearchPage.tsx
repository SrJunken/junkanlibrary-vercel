import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/useRedux'
import { setQuery, fetchBooks } from '../store/searchSlice'
import BookList from '../components/BookList'
import './SearchPage.scss'

export default function SearchPage() {
  const { initialSearchTerm } = useParams<{ initialSearchTerm?: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
 
  const query = useAppSelector(state => state.search.query)
  const books = useAppSelector(state => state.search.books)
  const isLoading = useAppSelector(state => state.search.isLoading)
  const error = useAppSelector(state => state.search.error)

  useEffect(() => {
    if (initialSearchTerm && initialSearchTerm !== query) {
      dispatch(setQuery(initialSearchTerm))
      dispatch(fetchBooks(initialSearchTerm))
    }
  }, [initialSearchTerm])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!query.trim()) return
    dispatch(fetchBooks(query))
    navigate(`/search/${encodeURIComponent(query)}`, { replace: true })
  }

  return (
    <div className="search-page">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="text"
          value={query}
          onChange={e => dispatch(setQuery(e.target.value))}
          placeholder="Search books by title, author…"
          autoFocus
        />
        <button className="search-btn" type="submit">Search</button>
      </form>

      {isLoading && (
        <div className="feedback loading">
          <span className="spinner" />
          Searching…
        </div>
      )}

      {error && (
        <div className="feedback error">
          error {error}
        </div>
      )}

      {!isLoading && !error && books.length > 0 && (
        <>
          <p className="results-count">{books.length} books found for "{query}"</p>
          <BookList books={books} />
        </>
      )}

      {!isLoading && !error && query && books.length === 0 && (
        <div className="feedback no-results">No books found for "{query}"</div>
      )}

      {!query && !isLoading && (
        <div className="feedback hint">Type something above to start searching.</div>
      )}
    </div>
  )
}