// views/questions/Index.jsx
const React = require('react');
const Layout = require('../layout/Layout');

function Index(props) {
  const { questions, currentUser, currentSort } = props;

  return (
    <Layout title="Newest Questions" currentUser={currentUser}>
      <div className="row">
        {/* LEFT SIDEBAR */}
        <aside className="col-md-2 d-none d-md-block">
          <div className="sidebar-nav">
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
          <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">
            {currentSort === 'upvoted'
              ? 'Highest Upvoted Questions'
              : currentSort === 'unanswered'
              ? 'Unanswered Questions'
              : 'Newest Questions'
            }
          </h4>
            <a href="/questions/ask" className="btn btn-primary">
              Ask Question
            </a>
          </div>

          {questions.map(q => (
            <div key={q._id} className="question-list-item">
              <div className="d-flex">
                {/* Stats box */}
                <div className="stats-box">
                  <div className="stat-value">{q.votes}</div>
                  <div className="stat-label">votes</div>
                  <hr />
                  <div className="stat-value">{q.answersCount || 0}</div>
                  <div className="stat-label">answers</div>
                </div>

                {/* Title & Body */}
                <div>
                  <h5>
                    <a href={`/questions/${q._id}`}>
                      {q.title}
                    </a>
                  </h5>
                  <p className="text-muted mb-1">
                    {q.body.substring(0, 120)}...
                  </p>
                  {/* Tags */}
                  <div>
                    {q.tags && q.tags.map(tag => (
                      <span key={tag} className="badge bg-secondary me-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-end mt-2">
                <small className="text-muted">
                  asked by {q.author ? q.author.username : 'unknown'}
                </small>
              </div>
            </div>
          ))}
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="col-md-3 d-none d-md-block">
          <div className="overflow-blog">
            <h5>The Overflow Blog</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#">Tips & Tricks</a>
              </li>
              <li>
                <a href="#">More Blog Posts</a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </Layout>
  );
}

module.exports = Index;
