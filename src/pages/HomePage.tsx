import { useNavigate } from 'react-router-dom'
import './HomePage.scss'

export default function HomePage() {
  const navigate = useNavigate()

  const featured = ['the hobbit', 'dune', '1984', 'harry potter']

  return (
    <div className="home-page">
      <section className="hero">
        <h2 className="hero-title">Find any book you want</h2>
        <p className="hero-subtitle">
          Search millions of free books from our catalog.
        </p>
        <div className="hero-chips">
          {featured.map(term => (
            <button
              key={term}
              className="chip"
              onClick={() => navigate(`/search/${encodeURIComponent(term)}`)}
            >
              {term}
            </button>
          ))}
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>Search</h3>
          <p>Find any book by title, author, or keyword.</p>
        </div>
        <div className="feature-card">
          <h3>Details</h3>
          <p>View cover, authors, subjects and more.</p>
        </div>
        <div className="feature-card">
          <h3>Dark Mode</h3>
          <p>Easy on the eyes, day and night.</p>
        </div>
      </section>
    </div>
  )
}