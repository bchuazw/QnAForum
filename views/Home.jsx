// views/Home.jsx
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
          <h1 className="fw-bold mb-3 display-4">Welcome to My Q&A Forum</h1>
          <p className="lead mb-4">
            Ask, answer, and explore a world of questions with a thriving community.
          </p>
          <a href="/questions" className="btn btn-lg btn-forum-cta shadow-sm">
            View Questions
          </a>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="forum-content py-5">
        <div className="container">
          <div className="row">
            {/* Left column: Our stack of top questions */}
            <div className="col-md-8 mb-4">
              <h2 className="mb-3">Highest Upvoted Questions</h2>

              <div id="questionStack" className="stack-container">
                {displayedQuestions.map((q, idx) => (
                  <div
                    key={q._id}
                    className={`stack-item stack-pos-${idx}`}
                    data-question-id={q._id}
                  >
                    <div className="stack-card p-4 bg-white shadow border-3 rounded">
                      <h5 className="mb-2">{q.title}</h5>
                      <p className="text-muted mb-3">
                        {q.body.substring(0, 100)}...
                      </p>
                      <p className="mb-1">
                        <strong>Votes:</strong> {q.votes}
                      </p>
                      <a href={`/questions/${q._id}`} className="btn btn-outline-primary">
                        View
                      </a>
                    </div>
                  </div>
                ))}

                {/* Up/Down controls INSIDE the stack-container */}
                <div className="stack-controls">
                  <button id="stackUpBtn" className="btn btn-sm btn-dark me-2">
                    <i className="bi bi-chevron-up"></i>
                  </button>
                  <button id="stackDownBtn" className="btn btn-sm btn-dark">
                    <i className="bi bi-chevron-down"></i>
                  </button>
                </div>
              </div>

            </div>

            {/* Right column: The Overflow Blog */}
            <div className="col-md-4">
              <div className="overflow-blog p-3 rounded shadow-sm bg-white">
                <h5 className="mb-3">The Overflow Blog</h5>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <a href="#" className="text-decoration-none text-primary">
                      How to handle user input
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="text-decoration-none text-primary">
                      What’s new in JavaScript ES2023
                    </a>
                  </li>
                  {/* More blog links if needed */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inline script to handle rotating the stack */}
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
                const first = stackItems.shift();
                stackItems.push(first);
                updateStackPositions();
              }

              function rotateUp() {
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
