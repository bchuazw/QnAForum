// views/questions/Show.jsx
import React from 'react';
import Layout from '../layout/Layout';

function Show(props) {
  const { question, answers, currentUser, errorMsg } = props;

  // Determine if the user has up/downvoted this question
  let userVoteQuestion = 0;
  if (currentUser && question.voters) {
    const foundVote = question.voters.find(
      v => String(v.user) === String(currentUser._id)
    );
    if (foundVote) userVoteQuestion = foundVote.vote; // 1 or -1
  }

  // Determine if the user has up/downvoted each answer
  const userVotes = {}; // { answerId: 1 or -1 }
  answers.forEach(ans => {
    if (currentUser && ans.voters) {
      const foundVote = ans.voters.find(
        v => String(v.user) === String(currentUser._id)
      );
      userVotes[ans._id] = foundVote ? foundVote.vote : 0;
    } else {
      userVotes[ans._id] = 0;
    }
  });

  return (
    <Layout title={question.title} currentUser={currentUser}>
      <div className="container mt-4">
        {/* Display error message if any */}
        {errorMsg && (
          <div className="alert alert-danger d-flex align-items-center" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            <div>{errorMsg}</div>
          </div>
        )}

        {/* Question Section */}
        <div className="row mb-4">
          {/* Left column for question votes */}
          <div className="col-auto text-center">
            <form method="POST" action={`/questions/${question._id}/vote`}>
              <input type="hidden" name="voteType" value="up" />
              <button type="submit" className="btn p-0 border-0" style={{ background: 'none' }}>
                {userVoteQuestion === 1 ? (
                  <i className="bi bi-caret-up-fill fs-3 text-success"></i>
                ) : (
                  <i className="bi bi-caret-up fs-3 text-secondary"></i>
                )}
              </button>
            </form>
            <div className="fw-bold fs-5">{question.votes}</div>
            <form method="POST" action={`/questions/${question._id}/vote`}>
              <input type="hidden" name="voteType" value="down" />
              <button type="submit" className="btn p-0 border-0" style={{ background: 'none' }}>
                {userVoteQuestion === -1 ? (
                  <i className="bi bi-caret-down-fill fs-3 text-danger"></i>
                ) : (
                  <i className="bi bi-caret-down fs-3 text-secondary"></i>
                )}
              </button>
            </form>
          </div>

          {/* Main question content */}
          <div className="col">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h2 className="card-title mb-3">{question.title}</h2>
                <p className="card-text">{question.body}</p>
                <div className="mb-2">
                  {question.tags.map(tag => (
                    <span key={tag} className="badge bg-primary me-1">{tag}</span>
                  ))}
                </div>
                <small className="text-muted">
                  Asked by {question.author ? question.author.username : 'unknown'}
                </small>

                {/* Edit/Delete buttons for question if currentUser is the author */}
                {currentUser && question.author &&
                  String(currentUser._id) === String(question.author._id) && (
                    <div className="mt-3">
                      <a
                        href={`/questions/${question._id}/edit`}
                        className="btn btn-outline-primary btn-sm me-2"
                      >
                        Edit
                      </a>
                      <form
                        method="POST"
                        action={`/questions/${question._id}/delete`}
                        style={{ display: 'inline' }}
                      >
                        <button type="submit" className="btn btn-outline-danger btn-sm">
                          Delete
                        </button>
                      </form>
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Answers Section */}
        <h4 className="mb-3">Answers</h4>
        {answers.map(ans => (
          <div key={ans._id} className="row mb-3">
            {/* Left column for answer votes */}
            <div className="col-auto text-center">
              <form method="POST" action={`/answers/${ans._id}/vote`}>
                <input type="hidden" name="voteType" value="up" />
                <button type="submit" className="btn p-0 border-0" style={{ background: 'none' }}>
                  {userVotes[ans._id] === 1 ? (
                    <i className="bi bi-caret-up-fill fs-3 text-success"></i>
                  ) : (
                    <i className="bi bi-caret-up fs-3 text-secondary"></i>
                  )}
                </button>
              </form>
              <div className="fw-bold">{ans.votes}</div>
              <form method="POST" action={`/answers/${ans._id}/vote`}>
                <input type="hidden" name="voteType" value="down" />
                <button type="submit" className="btn p-0 border-0" style={{ background: 'none' }}>
                  {userVotes[ans._id] === -1 ? (
                    <i className="bi bi-caret-down-fill fs-3 text-danger"></i>
                  ) : (
                    <i className="bi bi-caret-down fs-3 text-secondary"></i>
                  )}
                </button>
              </form>
            </div>

            {/* Answer content */}
            <div className="col">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <p className="mb-2">{ans.body}</p>
                </div>
                <div className="card-footer text-muted d-flex justify-content-between align-items-center">
                  <small>by {ans.author ? ans.author.username : 'unknown'}</small>
                  {currentUser && ans.author &&
                    String(currentUser._id) === String(ans.author._id) && (
                      <div>
                        <a
                          href={`/answers/${ans._id}/edit`}
                          className="btn btn-outline-primary btn-sm me-2"
                        >
                          Edit
                        </a>
                        <form
                          method="POST"
                          action={`/answers/${ans._id}/delete`}
                          style={{ display: 'inline' }}
                        >
                          <button type="submit" className="btn btn-outline-danger btn-sm">
                            Delete
                          </button>
                        </form>
                      </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Post new answer */}
        <div className="mt-4">
          <h5>Your Answer</h5>
          <form method="POST" action={`/questions/${question._id}/answers`}>
            <div className="mb-3">
              <textarea
                id="body"
                name="body"
                className="form-control"
                rows="3"
                placeholder="Type your answer here..."
              ></textarea>
            </div>
            <div className="d-flex align-items-center">
              <button type="submit" className="btn btn-primary me-3">Post Answer</button>
              <a href="/questions" className="btn btn-secondary">
                🔙 Back
              </a>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Show;
