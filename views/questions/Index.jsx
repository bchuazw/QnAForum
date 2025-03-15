const React = require('react');
const Layout = require('../layout/Layout');

function Index(props) {
  const { questions } = props;

  return (
    <Layout title="Newest Questions">
      <div className="row">
        {/* LEFT SIDEBAR (similar to Home) */}
        <aside className="col-md-2 d-none d-md-block border-end">
          <nav className="nav flex-column">
            <a className="nav-link active" href="/questions?sort=newest">Newest</a>
            <a className="nav-link" href="/questions?sort=active">Active</a>
            <a className="nav-link" href="/questions?sort=unanswered">Unanswered</a>
            <hr />
            <a className="nav-link" href="/tags">Tags</a>
            <a className="nav-link" href="/users">Users</a>
          </nav>
        </aside>

        {/* MAIN QUESTION LIST */}
        <main className="col-md-7">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">Newest Questions</h4>
            <a href="/questions/ask" className="btn btn-primary">Ask Question</a>
          </div>

          {questions.map(q => {
            return (
              <div key={q._id} className="card mb-3">
                <div className="card-body d-flex">
                  {/* Votes & Answers */}
                  <div className="text-center me-4">
                    <div><strong>{q.votes}</strong><br/>votes</div>
                    <div><strong>{q.answersCount || 0}</strong><br/>answers</div>
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
                <div className="card-footer text-end">
                  asked by {q.author ? q.author.username : 'unknown'} 
                </div>
              </div>
            );
          })}
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="col-md-3 d-none d-md-block">
          <div className="border p-3 mb-3">
            <h5>The Overflow Blog</h5>
            <ul className="list-unstyled">
              <li><a href="#">Tips & Tricks</a></li>
            </ul>
          </div>
        </aside>
      </div>
    </Layout>
  );
}

module.exports = Index;
