const React = require('react');
const Layout = require('../layout/Layout');

function Ask(props) {
  return (
    <Layout title="Ask a Question" currentUser={props.currentUser}>
      {/* Full-screen container for centering */}
      <div className="login-container">
        {/* Header with logo */}
        <div className="login-header">
          <h1 className="login-logo">ChillSeek</h1>
          <p className="login-tagline">Your Uni Q&A Hub</p>
        </div>

        {/* Centered form */}
        <div className="login-form-wrapper">
          <div className="card login-card shadow-lg animate-fade-in">
            <div className="card-body p-4">
              <h3 className="text-center mb-4">Ask a New Question</h3>

              <form
                method="POST"
                action="/questions"
                className="needs-validation"
                noValidate
                id="askQuestionForm"
              >
                {/* Title */}
                <div className="mb-3">
                  <label htmlFor="title" className="form-label fw-semibold">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="form-control"
                    required
                    minLength="10"
                    placeholder="e.g. How do I prepare for a uni exam?"
                    title="Title must be at least 10 characters long."
                  />
                  <small id="titleError" className="text-danger" style={{ display: 'none' }}>
                    <i className="bi bi-exclamation-circle-fill"></i> Title must be at least 10 characters long
                  </small>
                  <div className="invalid-feedback">
                    Please enter a title (minimum 10 characters).
                  </div>
                </div>

                {/* Body */}
                <div className="mb-3">
                  <label htmlFor="body" className="form-label fw-semibold">Body</label>
                  <textarea
                    id="body"
                    name="body"
                    className="form-control"
                    rows="6"
                    required
                    placeholder="Provide details about your question..."
                  ></textarea>
                  <div className="invalid-feedback">
                    Please provide details for your question.
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-3">
                  <label htmlFor="tags" className="form-label fw-semibold">
                    Tags (comma-separated)
                    <span
                      className="ms-1"
                      title="Separate tags with commas (e.g., math, physics, exams)"
                    >
                      <i className="bi bi-info-circle text-muted"></i>
                    </span>
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    className="form-control"
                    placeholder="e.g. math, physics, exams"
                    pattern="^[\w\s-,]+$"
                    title="Tags can only contain letters, numbers, spaces, commas, and hyphens."
                  />
                  <small id="tagsError" className="text-danger" style={{ display: 'none' }}>
                    <i className="bi bi-exclamation-circle-fill"></i> Tags can only contain letters, numbers, spaces, commas, and hyphens
                  </small>
                  <div className="invalid-feedback">
                    Tags can only contain letters, numbers, spaces, commas, and hyphens.
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-100">Post Question</button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="login-footer">
          <p>© 2025 ChillSeek. All rights reserved.</p>
        </footer>
      </div>

      {/* Inline script for real-time validation */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const form = document.getElementById('askQuestionForm');
              const titleInput = document.getElementById('title');
              const titleError = document.getElementById('titleError');
              const tagsInput = document.getElementById('tags');
              const tagsError = document.getElementById('tagsError');
              const tagsPattern = /^[\\w\\s-,]+$/;

              // Real-time title validation
              titleInput.addEventListener('input', function() {
                if (titleInput.value.length < 10) {
                  titleError.style.display = 'inline';
                } else {
                  titleError.style.display = 'none';
                }
              });

              // Real-time tags validation
              tagsInput.addEventListener('input', function() {
                if (tagsInput.value && !tagsPattern.test(tagsInput.value)) {
                  tagsError.style.display = 'inline';
                } else {
                  tagsError.style.display = 'none';
                }
              });

              // Prevent form submission if invalid
              form.addEventListener('submit', function(event) {
                if (!form.checkValidity()) {
                  event.preventDefault();
                  event.stopPropagation();
                  form.classList.add('was-validated');
                }
              }, false);
            })();
          `,
        }}
      />
    </Layout>
  );
}

module.exports = Ask;