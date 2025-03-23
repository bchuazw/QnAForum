// views/questions/Index.jsx
const React = require('react');
const Layout = require('../layout/Layout');

/**
 * formatTimeAgo: returns a string like "just now", "10 minutes ago", "2 hours ago", or a date/time.
 */
function formatTimeAgo(date) {
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 5) {
    return 'just now';
  }
  if (diffMins < 60) {
    return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
  }
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  }
  // Over 24 hours => show date/time
  return date.toLocaleString();
}

function Index(props) {
  const { questions, currentUser, currentSort } = props;

  return (
    <Layout title="Newest Questions" currentUser={currentUser}>
      <div className="container py-5">
        <div className="row">
          {/* LEFT SIDEBAR */}
          <aside className="col-md-2">
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

            {questions.map((q, idx) => {
              // Safely handle missing createdAt
              let timeDisplay = '';
              if (q.createdAt) {
                const createdDate = new Date(q.createdAt);
                const timeAgo = formatTimeAgo(createdDate);
                const fullDate = createdDate.toLocaleString();
                // e.g. "5 hours ago at 1/1/2025, 12:00 PM"
                timeDisplay = `${timeAgo} at ${fullDate}`;
              }

              return (
                <div
                  key={q._id}
                  className="question-list-item animate-fade-in"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
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
                      {/* Author & time info */}
                      <div className="text-end">
                        <small className="text-muted d-flex align-items-center justify-content-end">
                          {/* Profile pic if available */}
                          {q.author && q.author.profilePic && (
                            <img
                              src={q.author.profilePic}
                              alt="profile"
                              style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                marginRight: '6px'
                              }}
                            />
                          )}
                          {/* Show username */}
                          {q.author ? q.author.username : 'unknown'} 
                        </small>
                        {/* Time display below if available */}
                        {timeDisplay && (
                          <small className="text-muted d-block">
                            {timeDisplay}
                          </small>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </main>

          {/* RIGHT SIDEBAR */}
          <aside className="col-md-3">
            <div className="overflow-blog">
              <h5>The Overflow Blog</h5>
              <ul className="list-unstyled">
                <li className="mb-3 d-flex align-items-start">
                  <i className="bi bi-file-earmark-text-fill text-primary me-2 mt-1"></i>
                  <a href="/blog/1" className="text-decoration-none text-primary">
                    Top Tips for Student Productivity
                  </a>
                </li>
                <li className="mb-3 d-flex align-items-start">
                  <i className="bi bi-file-earmark-text-fill text-primary me-2 mt-1"></i>
                  <a href="/blog" className="text-decoration-none text-primary">
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
