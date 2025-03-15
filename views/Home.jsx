// views/Home.jsx
const React = require('react');
const Layout = require('./layout/Layout');

function Home(props) {
  return (
    <Layout title={props.title} currentUser={props.currentUser}>
      <div className="row">
        {/* LEFT SIDEBAR (optional) */}
        <aside className="col-md-2 d-none d-md-block border-end">
          <nav className="nav flex-column">
            <a className="nav-link" href="/questions?sort=newest">Newest</a>
            <a className="nav-link" href="/questions?sort=active">Active</a>
            <a className="nav-link" href="/questions?sort=unanswered">Unanswered</a>
            <hr/>
            <a className="nav-link" href="/tags">Tags</a>
            <a className="nav-link" href="/users">Users</a>
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="col-md-7">
          <h2>Welcome to My Q&A Forum</h2>
          <p>This is the homepage. You can check out the newest questions or ask your own.</p>
          <a href="/questions" className="btn btn-primary">View Questions</a>
        </main>

        {/* RIGHT SIDEBAR (optional) */}
        <aside className="col-md-3 d-none d-md-block">
          <div className="border p-3 mb-3">
            <h5>The Overflow Blog</h5>
            <ul className="list-unstyled">
              <li><a href="#">How to handle user input</a></li>
              <li><a href="#">What’s new in JavaScript ES2023</a></li>
            </ul>
          </div>
        </aside>
      </div>
    </Layout>
  );
}

module.exports = Home;
