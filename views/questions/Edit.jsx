// views/questions/Edit.jsx
import React from 'react';
import Layout from '../layout/Layout';

function EditQuestion(props) {
  const { question, currentUser } = props;

  return (
    <Layout title="Edit Question" currentUser={currentUser}>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm border-0 p-4">
              <div className="card-body">
                <h3 className="card-title mb-4">Edit Question</h3>
                <form method="POST" action={`/questions/${question._id}/edit`}>
                  {/* Title */}
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label fw-semibold">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      defaultValue={question.title}
                      required
                    />
                  </div>

                  {/* Body */}
                  <div className="mb-3">
                    <label htmlFor="body" className="form-label fw-semibold">Body</label>
                    <textarea
                      className="form-control"
                      id="body"
                      name="body"
                      rows="5"
                      defaultValue={question.body}
                      required
                    ></textarea>
                  </div>

                  {/* Tags */}
                  <div className="mb-3">
                    <label htmlFor="tags" className="form-label fw-semibold">Tags (comma-separated)</label>
                    <input
                      type="text"
                      className="form-control"
                      id="tags"
                      name="tags"
                      defaultValue={question.tags.join(',')}
                    />
                  </div>

                  {/* Buttons */}
                  <div className="d-flex align-items-center">
                    <button type="submit" className="btn btn-primary me-3 update-btn">
                      ✏️ Update
                    </button>
                    {/* Replace history.back() with a direct link */}
                    <a
                      href={`/questions/${question._id}`}
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

export default EditQuestion;
