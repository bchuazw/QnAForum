const React = require('react');
const Layout = require('./layout/Layout');

function Home(props) {
  const { title, currentUser, topQuestions } = props;

  // We'll ensure we only display up to 3 items
  const displayedQuestions = topQuestions.slice(0, 3);

  return (
    <Layout title={title} currentUser={currentUser}>
      {/* Hero Section */}
      <section className="forum-hero text-center text-white d-flex align-items-center">
        <div className="container">
          <h1 className="fw-bold mb-3 display-4">Welcome to ChillSeek</h1>
          <p className="lead mb-4">
            Ask, answer, and explore a world of questions with a thriving uni community.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <a href="/questions" className="btn btn-lg btn-forum-cta shadow-sm">
              View Questions
            </a>
            <a href="/questions/ask" className="btn btn-lg btn-outline-light shadow-sm">
              Ask a Question
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="forum-content py-5">
        <div className="container">
          <div className="row">
            {/* Left column: Stack of top questions */}
            <div className="col-md-8 mb-4">
              <h2 className="mb-4 fw-bold">Highest Upvoted Questions</h2>

              <div id="questionStack" className="stack-container">
                {displayedQuestions.map((q, idx) => (
                  <div
                    key={q._id}
                    className={`stack-item stack-pos-${idx}`}
                    data-question-id={q._id}
                  >
                    <div className="stack-card p-4 bg-white shadow border-3 rounded">
                      <h5 className="mb-2 fw-semibold">{q.title}</h5>
                      <p className="text-muted mb-3">
                        {q.body.substring(0, 100)}...
                      </p>
                      <div className="d-flex align-items-center mb-3">
                        <i className="bi bi-hand-thumbs-up-fill text-primary me-2"></i>
                        <span><strong>{q.votes}</strong> Votes</span>
                      </div>
                      <a href={`/questions/${q._id}`} className="btn btn-outline-primary">
                        View Question
                      </a>
                    </div>
                  </div>
                ))}

                {/* Up/Down controls */}
                <div className="stack-controls">
                  <button
                    id="stackUpBtn"
                    className="btn btn-sm btn-primary"
                    title="Previous Question"
                  >
                    <i className="bi bi-chevron-up"></i>
                  </button>
                  <button
                    id="stackDownBtn"
                    className="btn btn-sm btn-primary"
                    title="Next Question"
                  >
                    <i className="bi bi-chevron-down"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Right column: The Overflow Blog */}
            <div className="col-md-4">
              <div className="overflow-blog p-4 rounded shadow-sm bg-white">
                <h5 className="mb-3 fw-semibold">The Overflow Blog</h5>
                <ul className="list-unstyled">
                  <li className="mb-3 d-flex align-items-start">
                    <i className="bi bi-file-earmark-text-fill text-primary me-2 mt-1"></i>
                    <a href="#" className="text-decoration-none text-primary">
                      How to handle user input
                    </a>
                  </li>
                  <li className="mb-3 d-flex align-items-start">
                    <i className="bi bi-file-earmark-text-fill text-primary me-2 mt-1"></i>
                    <a href="#" className="text-decoration-none text-primary">
                      What’s new in JavaScript ES2023
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="login-footer">
        <p>© 2025 ChillSeek. All rights reserved.</p>
      </footer>

      {/* Inline script to handle rotating the stack with animation */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const stackContainer = document.getElementById('questionStack');
              let stackItems = Array.from(stackContainer.querySelectorAll('.stack-item'));

              function updateStackPositions() {
                stackItems.forEach((item, idx) => {
                  item.className = 'stack-item stack-pos-' + idx;
                });
              }

              function rotateDown() {
                stackItems.forEach(item => item.classList.add('animate-slide'));
                const first = stackItems.shift();
                stackItems.push(first);
                updateStackPositions();
              }

              function rotateUp() {
                stackItems.forEach(item => item.classList.add('animate-slide'));
                const last = stackItems.pop();
                stackItems.unshift(last);
                updateStackPositions();
              }

              document.getElementById('stackUpBtn').addEventListener('click', rotateUp);
              document.getElementById('stackDownBtn').addEventListener('click', rotateDown);

              updateStackPositions();
            })();
          `,
        }}
      />
    </Layout>
  );
}

module.exports = Home;