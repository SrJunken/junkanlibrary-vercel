import { Link } from 'react-router-dom'
import { useAppSelector } from '../hooks/useRedux'
import BorrowButton from '../components/BorrowButton'
import './BorrowedPage.scss'

export default function BorrowedPage() {
  const { borrowedBooks } = useAppSelector(state => state.borrow)
  
  const activeBorrows = borrowedBooks.filter(b => !b.returned)
  const returnedBooks = borrowedBooks.filter(b => b.returned)

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  if (borrowedBooks.length === 0) {
    return (
      <div className="borrowed-page">
        <div className="empty-state">
          <div className="empty-icon">book</div>
          <h3>No borrowed books yet</h3>
          <p>Browse our collection and borrow your first book!</p>
          <Link to="/search" className="browse-link">Browse Books</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="borrowed-page">
      <div className="borrowed-header">
        <h2>My Borrowed Books</h2>
        <p className="borrowed-stats">
          {activeBorrows.length} active {activeBorrows.length === 1 ? 'borrow' : 'borrows'} • 
          {returnedBooks.length} returned
        </p>
      </div>

      <div className="borrowed-list">
        {activeBorrows.map(borrow => (
          <div key={borrow.id} className="borrowed-item">
            {borrow.coverId ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${borrow.coverId}-M.jpg`}
                alt={borrow.title}
                className="borrowed-cover"
              />
            ) : (
              <div className="borrowed-no-cover">no-cover</div>
            )}
            <div className="borrowed-info">
              <h3 className="borrowed-title">{borrow.title}</h3>
              <p className="borrowed-author">{borrow.author}</p>
              <div className="borrowed-dates">
                <span className="borrowed-date">
                  Borrowed: {formatDate(borrow.borrowedDate)}
                </span>
                <span className={`due-date ${isOverdue(borrow.dueDate) ? 'overdue' : ''}`}>
                  Due: {formatDate(borrow.dueDate)}
                  {isOverdue(borrow.dueDate) && ' !!! OVERDUE'}
                </span>
              </div>
            </div>
            <BorrowButton
              bookId={borrow.bookId}
              title={borrow.title}
              author={borrow.author}
              coverId={borrow.coverId}
            />
          </div>
        ))}

        {returnedBooks.length > 0 && (
          <>
            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Returned Books</h3>
            {returnedBooks.map(borrow => (
              <div key={borrow.id} className="borrowed-item" style={{ opacity: 0.7 }}>
                {borrow.coverId ? (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${borrow.coverId}-M.jpg`}
                    alt={borrow.title}
                    className="borrowed-cover"
                  />
                ) : (
                  <div className="borrowed-no-cover">no cover</div>
                )}
                <div className="borrowed-info">
                  <h3 className="borrowed-title">
                    {borrow.title}
                    <span className="returned-badge">Returned</span>
                  </h3>
                  <p className="borrowed-author">{borrow.author}</p>
                  <div className="borrowed-dates">
                    <span className="borrowed-date">
                      Borrowed: {formatDate(borrow.borrowedDate)}
                    </span>
                    {borrow.returnedDate && (
                      <span className="borrowed-date">
                        Returned: {formatDate(borrow.returnedDate)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}