import { useParams, Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import './BookDetailPage.scss'

interface BookDetail {
  title: string
  description?: string | { value: string }
  subjects?: string[]
  covers?: number[]
  first_publish_date?: string
}

export default function BookDetailPage() {
  const { bookId } = useParams<{ bookId: string }>()

  const url = bookId ? `https://openlibrary.org/works/${bookId}.json` : null
  const { data, isLoading, error } = useFetch<BookDetail>(url)

  const description = !data?.description
    ? null
    : typeof data.description === 'string'
      ? data.description
      : data.description.value

  const coverUrl = data?.covers?.[0]
    ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg`
    : null

  return (
    <div className="book-detail-page">
      <Link to="/search" className="back-link">Back to search</Link>

      {isLoading && (
        <div className="detail-loading">
          <span className="spinner" /> Loading book details…
        </div>
      )}

      {error && (
        <div className="detail-error">Could not load book: {error}</div>
      )}

      {data && !isLoading && (
        <div className="detail-content">
          <div className="detail-cover-col">
            {coverUrl ? (
              <img src={coverUrl} alt={data.title} className="detail-cover" />
            ) : (
              <div className="detail-no-cover">no cover</div>
            )}
          </div>
          <div className="detail-info-col">
            <h2 className="detail-title">{data.title}</h2>
            {data.first_publish_date && (
              <p className="detail-meta">First published: {data.first_publish_date}</p>
            )}
            {description && (
              <p className="detail-description">{description.slice(0, 600)}{description.length > 600 ? '…' : ''}</p>
            )}
            {data.subjects && data.subjects.length > 0 && (
              <div className="detail-subjects">
                {data.subjects.slice(0, 8).map(s => (
                  <span key={s} className="subject-chip">{s}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}