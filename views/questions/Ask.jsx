// views/questions/Ask.jsx
const React = require('react');
const Layout = require('../layout/Layout');

function Ask(props) {
  return (
    <Layout title="Ask a Question" currentUser={props.currentUser}>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h3>Ask a New Question</h3>
          <form method="POST" action="/questions">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" id="title" name="title" className="form-control" required />
            </div>
            <div className="mb-3">
              <label htmlFor="body" className="form-label">Body</label>
              <textarea id="body" name="body" className="form-control" rows="6" required></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="tags" className="form-label">Tags (comma-separated)</label>
              <input type="text" id="tags" name="tags" className="form-control" />
            </div>
            <button type="submit" className="btn btn-primary">Post Question</button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

module.exports = Ask;
