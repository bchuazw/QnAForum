// views/questions/Show.jsx
import React, { useEffect } from 'react';
import Layout from '../layout/Layout';

/**
 * Helper to format "time ago" logic.
 * @param {Date} date - The creation date/time.
 * @returns {string} - e.g. "just now", "10 minutes ago", "2 hours ago", or a full date/time string.
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
  return date.toLocaleString();
}

function Show(props) {
  const { question, answers, currentUser, errorMsg } = props;

  // Determine if the user has up/downvoted the question
  let userVoteQuestion = 0;
  if (currentUser && question.voters) {
    const foundVote = question.voters.find(
      v => String(v.user) === String(currentUser._id)
    );
    if (foundVote) userVoteQuestion = foundVote.vote;
  }

  // Format question creation time
  let qTimeDisplay = '';
  if (question.createdAt) {
    const createdDate = new Date(question.createdAt);
    const timeAgo = formatTimeAgo(createdDate);
    const fullDate = createdDate.toLocaleString();
    qTimeDisplay = `${timeAgo} at ${fullDate}`;
  }

  // Determine if the user has up/downvoted each answer
  const userVotes = {};
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

  // useEffect to set up the answer deletion modal logic
  useEffect(() => {
    // This script handles answer deletion using a modal
    const modalEl = document.getElementById('deleteAnswerModal');
    let answerDeleteUrl = '';
    if (modalEl) {
      modalEl.addEventListener('show.bs.modal', function (event) {
        // Button that triggered the modal
        const button = event.relatedTarget;
        answerDeleteUrl = button.getAttribute('data-delete-url');
      });
      const confirmBtn = document.getElementById('confirmDeleteAnswerBtn');
      if (confirmBtn) {
        confirmBtn.addEventListener('click', function () {
          if (answerDeleteUrl) {
            // Create and submit a form to delete the answer
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = answerDeleteUrl;
            document.body.appendChild(form);
            form.submit();
          }
        });
      }
    }
  }, []);

  return (
    <Layout title={question.title} currentUser={currentUser}>
      <div className="container mt-4">
        {errorMsg && (
          <div className="alert alert-danger d-flex align-items-center" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            <div>{errorMsg}</div>
          </div>
        )}

        {/* Question Section */}
        <div className="row mb-4">
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
                <small className="text-muted d-block">
                  Asked by{' '}
                  {question.author && question.author.profilePic && (
                    <img
                      src={question.author.profilePic}
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
                  {question.author ? question.author.username : 'unknown'}
                </small>
                {qTimeDisplay && (
                  <small className="text-muted d-block">{qTimeDisplay}</small>
                )}

                {currentUser && question.author &&
                  String(currentUser._id) === String(question.author._id) && (
                    <div className="mt-3">
                      <a
                        href={`/questions/${question._id}/edit`}
                        className="btn btn-outline-primary btn-sm me-2"
                      >
                        Edit
                      </a>
                      {/* Delete button that triggers the modal */}
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteQuestionModal"
                      >
                        Delete
                      </button>
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Answers Section */}
        <h4 className="mb-3">Answers</h4>
        {answers.map(ans => {
          let ansTimeDisplay = '';
          if (ans.createdAt) {
            const ansDate = new Date(ans.createdAt);
            const timeAgo = formatTimeAgo(ansDate);
            const fullDate = ansDate.toLocaleString();
            ansTimeDisplay = `${timeAgo} at ${fullDate}`;
          }
          return (
            <div key={ans._id} className="row mb-3">
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
              <div className="col">
                <div className="card shadow-sm border-0">
                  <div className="card-body">
                    <p className="mb-2">{ans.body}</p>
                  </div>
                  <div className="card-footer d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      {ans.author && ans.author.profilePic && (
                        <img
                          src={ans.author.profilePic}
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
                      <small>by {ans.author ? ans.author.username : 'unknown'}</small>
                    </div>
                    <div className="d-flex align-items-center">
                      {ansTimeDisplay && (
                        <small className="me-3">{ansTimeDisplay}</small>
                      )}
                      {currentUser && ans.author &&
                        String(currentUser._id) === String(ans.author._id) && (
                          <>
                            <a
                              href={`/answers/${ans._id}/edit`}
                              className="btn btn-outline-primary btn-sm me-2"
                            >
                              Edit
                            </a>
                            {/* Answer delete button triggers the answer delete modal */}
                            <button
                              type="button"
                              className="btn btn-outline-danger btn-sm"
                              data-bs-toggle="modal"
                              data-bs-target="#deleteAnswerModal"
                              data-delete-url={`/answers/${ans._id}/delete`}
                            >
                              Delete
                            </button>
                          </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

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
              <a href="/questions" className="btn btn-secondary">🔙 Back</a>
            </div>
          </form>
        </div>
      </div>

      {/* Modal for Question Delete Confirmation */}
      <div
        className="modal fade"
        id="deleteQuestionModal"
        tabIndex="-1"
        aria-labelledby="deleteQuestionModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteQuestionModalLabel">Confirm Deletion</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this question? This action cannot be undone.
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <form method="POST" action={`/questions/${question._id}/delete`}>
                <button type="submit" className="btn btn-danger">Confirm Delete</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Answer Delete Confirmation */}
      <div
        className="modal fade"
        id="deleteAnswerModal"
        tabIndex="-1"
        aria-labelledby="deleteAnswerModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteAnswerModalLabel">Confirm Answer Deletion</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this answer? This action cannot be undone.
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" id="confirmDeleteAnswerBtn" className="btn btn-danger">
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Inline script to handle Answer Delete Modal */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              let answerDeleteUrl = '';
              const deleteAnswerModal = document.getElementById('deleteAnswerModal');
              deleteAnswerModal.addEventListener('show.bs.modal', function(event) {
                const button = event.relatedTarget;
                answerDeleteUrl = button.getAttribute('data-delete-url');
              });
              document.getElementById('confirmDeleteAnswerBtn').addEventListener('click', function() {
                if(answerDeleteUrl) {
                  const form = document.createElement('form');
                  form.method = 'POST';
                  form.action = answerDeleteUrl;
                  document.body.appendChild(form);
                  form.submit();
                }
              });
            })();
          `,
        }}
      />
    </Layout>
  );
}

export default Show;
