const React = require('react');
const Layout = require('../layout/Layout');

function Show(props) {
  const { question, answers } = props;

  return (
    <Layout title={question.title}>
      <div className="row">
        {/* LEFT SIDEBAR can be repeated or simplified */}
        <aside className="col-md-2 d-none d-md-block border-end">
          {/* ... */}
        </aside>

        <main className="col-md-7">
          <h3>{question.title}</h3>
          <p>{question.body}</p>
          <div>
            {question.tags.map(tag => (
              <span key={tag} className="badge bg-secondary me-1">{tag}</span>
            ))}
          </div>
          <p className="text-muted">Votes: {question.votes}</p>
          {/* Voting form */}
          <form method="POST" action={`/questions/${question._id}/vote`}>
            <button name="voteType" value="up" className="btn btn-success me-2">Upvote</button>
            <button name="voteType" value="down" className="btn btn-danger">Downvote</button>
          </form>

          <hr/>
          <h5>Answers</h5>
          {answers.map(ans => (
            <div key={ans._id} className="card mb-2">
              <div className="card-body">
                {ans.body}
              </div>
              <div className="card-footer text-muted">
                by {ans.author ? ans.author.username : 'unknown'}
              </div>
            </div>
          ))}

          {/* Post new answer */}
          <form method="POST" action={`/questions/${question._id}/answers`}>
            <div className="mb-3">
              <label htmlFor="body" className="form-label">Your Answer</label>
              <textarea id="body" name="body" className="form-control" rows="3"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Post Answer</button>
          </form>
        </main>

        <aside className="col-md-3 d-none d-md-block">
          {/* Right sidebar if needed */}
        </aside>
      </div>
    </Layout>
  );
}

module.exports = Show;
