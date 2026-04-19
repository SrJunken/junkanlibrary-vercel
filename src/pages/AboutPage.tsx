import './AboutPage.scss'

export default function AboutPage() {
  return (
    <div className="about-page">
      <h2>About Junkan Library</h2>
      <p className="about-lead">
        A free book discovery app
      </p>

      <div className="about-grid">
        <div className="about-card">
          <h3>Tech Stack</h3>
          <ul>
            <li>React and TypeScript</li>
            <li>With Lazy-loaded routes</li>
          </ul>
        </div>

        <div className="about-card">
          <h3>Data Source</h3>
          <p>
            All book data comes from Open Library, a project of the Internet Archive.
          </p>
        </div>

        <div className="about-card">
          <h3>Features</h3>
          <ul>
            <li>Full-text book search</li>
            <li>Book detail pages</li>
            <li>Dark / light mode</li>
          </ul>
        </div>
      </div>
    </div>
  )
}