// views/answers/Edit.jsx
import React from 'react';
import Layout from '../layout/Layout';

function EditAnswer(props) {
  const { answer, errorMsg, currentUser } = props;

  return (
    <Layout title="Edit Your Answer" currentUser={currentUser}>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm border-0 p-4">
              <div className="card-body">
                <h3 className="card-title mb-4">Edit Your Answer</h3>
                {errorMsg && (
                  <div className="alert alert-danger" role="alert">
                    {errorMsg}
                  </div>
                )}
                <form method="POST" action={`/answers/${answer._id}/edit`}>
                  <div className="mb-3">
                    <label htmlFor="body" className="form-label fw-semibold">Answer</label>
                    <textarea
                      id="body"
                      name="body"
                      className="form-control"
                      rows="5"
                      defaultValue={answer.body}
                      required
                    ></textarea>
                  </div>

                  <div className="d-flex align-items-center">
                    <button type="submit" className="btn btn-primary me-3 update-btn">
                      ✏️ Save
                    </button>
                    {/* Link back to the question detail page */}
                    <a
                      href={`/questions/${answer.question}`}
                      className="btn btn-secondary back-btn"
                    >
                      🔙 Back
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default EditAnswer;
