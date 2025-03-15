// views/layout/Layout.jsx
const React = require('react');

function Layout(props) {
  console.log("Inside Layout, props.currentUser:", props.currentUser);
  const user = props.currentUser; // This is passed from Home.jsx via index.js
  const loggedIn = !!user;

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>{props.title || 'My Q&A Forum'}</title>
        
        {/* Bootstrap CSS */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        />
        
        {/* Bootstrap Icons (needed for <i class="bi ..."></i> icons) */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
        />
        
        <link rel="stylesheet" href="/css/custom.css" />
      </head>
      <body>
        {/* NAVBAR */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">My Q&A Forum</a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                {loggedIn ? (
                  <>
                    <li className="nav-item">
                      <a className="nav-link" href="/users/profile">{user.username}</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/questions/ask">Ask Question</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/users/logout">Logout</a>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <a className="nav-link" href="/users/login">Login</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/users/register">Sign Up</a>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>

        <div className="container mt-4">
          {props.children}
        </div>

        <footer className="border-top py-3 mt-4 text-center text-muted">
          <small>© 2025 My Q&A Forum. All rights reserved.</small>
        </footer>

        {/* Bootstrap JS */}
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
      </body>
    </html>
  );
}

module.exports = Layout;
