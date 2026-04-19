import { useState, useEffect } from 'react'
import SearchBar from './SearchBar'
import BookList from './BookList'
import type { Book, OpenLibraryResponse } from '../types/book'
import './SearchContainer.scss'
import { useParams } from 'react-router-dom'

function SearchContainer() {

  const params = useParams<string>()
  const [searchTerm, setSearchTerm] = useState<string>( params.initialSearchTerm == null ? "" : params.initialSearchTerm)
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState<boolean>(false)
/*
  for (let i = 0; i < 10000; i++) {
  }   
*/
  useEffect(() => {
    if (!searchTerm) return

    const fetchBooks = async () => {
      setLoading(true)
      try {
        const res = await fetch(
          `https://openlibrary.org/search.json?q=${searchTerm}&limit=10`
        )
        const data: OpenLibraryResponse = await res.json()
        setBooks(data.docs || [])
      } catch (error) {
        console.error('Error:', error)
        setBooks([])
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [searchTerm])

  return (
    <div className="search-container">
      <SearchBar onSearch={setSearchTerm} />
      
      {loading && <p className="loading">Loading...</p>}
      
      {!loading && books.length > 0 && (
        <>
          <p className="count"> {books.length} books found</p>
          <BookList books={books} />
        </>
      )}
      
      {!loading && searchTerm && books.length === 0 && (
        <p className="no-results">No books found</p>
      )}
    </div>
  )
}

export default SearchContainer