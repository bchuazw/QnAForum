const React = require('react');
const Layout = require('../layout/Layout');

function Index(props) {
  const { questions, currentUser, currentSort } = props;

  return (
    <Layout title="Newest Questions" currentUser={currentUser}>
      <div className="container py-5">
        <div className="row">
          {/* LEFT SIDEBAR */}
          <aside className="col-md-2">
            {/* Mobile Dropdown for Sidebar */}
            <div className="d-md-none mb-4">
              <select
                className="form-select sidebar-nav-mobile"
                onChange={(e) => (window.location.href = e.target.value)}
              >
                <option value="/questions?sort=newest" selected={currentSort === 'newest'}>
                  Newest
                </option>
                <option value="/questions?sort=upvoted" selected={currentSort === 'upvoted'}>
                  Upvoted
                </option>
                <option value="/questions?sort=unanswered" selected={currentSort === 'unanswered'}>
                  Unanswered
                </option>
                <option value="/tags">Tags</option>
                <option value="/users">Users</option>
              </select>
            </div>

            {/* Desktop Sidebar */}
            <div className="sidebar-nav d-none d-md-block">
              <nav className="nav flex-column">
                <a
                  className={`nav-link ${currentSort === 'newest' ? 'active' : ''}`}
                  href="/questions?sort=newest"
                >
                  Newest
                </a>
                <a
                  className={`nav-link ${currentSort === 'upvoted' ? 'active' : ''}`}
                  href="/questions?sort=upvoted"
                >
                  Upvoted
                </a>
                <a
                  className={`nav-link ${currentSort === 'unanswered' ? 'active' : ''}`}
                  href="/questions?sort=unanswered"
                >
                  Unanswered
                </a>
                <hr />
                <a className="nav-link" href="/tags">
                  Tags
                </a>
                <a className="nav-link" href="/users">
                  Users
                </a>
              </nav>
            </div>
          </aside>

          {/* MAIN QUESTION LIST */}
          <main className="col-md-7">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="mb-0 fw-bold">
                {currentSort === 'upvoted'
                  ? 'Highest Upvoted Questions'
                  : currentSort === 'unanswered'
                  ? 'Unanswered Questions'
                  : 'Newest Questions'}
              </h4>
              <a href="/questions/ask" className="btn btn-primary">
                Ask a Question
              </a>
            </div>

            {questions.map((q, idx) => (
              <div key={q._id} className={`question-list-item animate-fade-in`} style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="d-flex">
                  {/* Stats box */}
                  <div className="stats-box me-3">
                    <div className="stat-value">{q.votes}</div>
                    <div className="stat-label">Votes</div>
                    <hr />
                    <div className="stat-value">{q.answersCount || 0}</div>
                    <div className="stat-label">Answers</div>
                  </div>

                  {/* Title & Body */}
                  <div className="flex-grow-1">
                    <h5>
                      <a href={`/questions/${q._id}`} className="text-primary">
                        {q.title}
                      </a>
                    </h5>
                    <p className="text-muted mb-2">
                      {q.body.substring(0, 120)}...
                    </p>
                    {/* Tags */}
                    <div className="mb-2">
                      {q.tags && q.tags.map(tag => (
                        <span key={tag} className="badge bg-primary me-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="text-end">
                      <small className="text-muted">
                        Asked by {q.author ? q.author.username : 'unknown'}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </main>

          {/* RIGHT SIDEBAR */}
          <aside className="col-md-3">
            <div className="overflow-blog">
              <h5>The Overflow Blog</h5>
              <ul className="list-unstyled">
                <li className="mb-3 d-flex align-items-start">
                  <i className="bi bi-file-earmark-text-fill text-primary me-2 mt-1"></i>
                  <a href="#" className="text-decoration-none text-primary">
                    Tips & Tricks
                  </a>
                </li>
                <li className="mb-3 d-flex align-items-start">
                  <i className="bi bi-file-earmark-text-fill text-primary me-2 mt-1"></i>
                  <a href="#" className="text-decoration-none text-primary">
                    More Blog Posts
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer className="login-footer">
        <p>© 2025 ChillSeek. All rights reserved.</p>
      </footer>
    </Layout>
  );
}

module.exports = Index;