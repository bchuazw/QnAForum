// views/layout/Layout.jsx
const React = require('react');

function Layout(props) {
  const user = props.currentUser;
  const loggedIn = !!user;

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>{props.title || 'ChillSeek'}</title>
        
        {/* Bootstrap CSS */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        />
        
        {/* Bootstrap Icons */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
        />
        
        <link rel="stylesheet" href="/css/custom.css" />
      </head>
      <body>
        {/* NAVBAR */}
        <nav className="navbar navbar-expand-lg navbar-dark custom-navbar position-relative">
          {/* Snow container filling the entire nav */}
          <div
            className="header-snow-container"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              overflow: 'hidden',
              zIndex: 0
            }}
          />

          <div className="container-fluid">
            <a className="navbar-brand custom-brand" href="/">ChillSeek</a>
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
                      <a className="nav-link custom-nav-link" href="/users/profile">{user.username}</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link custom-nav-link" href="/questions/ask">Ask Question</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link custom-nav-link" href="/users/logout">Logout</a>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <a className="nav-link custom-nav-link" href="/users/login">Login</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link custom-nav-link" href="/users/register">Sign Up</a>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>

        {/* MAIN CONTENT */}
        {props.children}

        {/* Bootstrap JS */}
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

        {/* Snowflake Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Minimal CSS for snow in the navbar
                const styleEl = document.createElement('style');
                styleEl.innerHTML = \`
                  .snowflake {
                    position: absolute;
                    /* We'll randomize top below, so no fixed top here */
                    color: #fff;
                    opacity: 0.25; /* more translucent */
                    font-size: 1.2rem;
                    animation-name: fallHeader;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                  }
                  @keyframes fallHeader {
                    to {
                      transform: translateY(150%);
                    }
                  }
                \`;
                document.head.appendChild(styleEl);

                // Grab the nav snow container
                const container = document.querySelector('.header-snow-container');
                if (!container) return;

                const SNOWFLAKE_COUNT = 20; 
                const containerRect = container.getBoundingClientRect();

                for (let i = 0; i < SNOWFLAKE_COUNT; i++) {
                  const flake = document.createElement('span');
                  flake.classList.add('snowflake');
                  flake.innerText = '❅'; // or ❆, ✻, etc.

                  // Random horizontal start within the container
                  const leftPerc = Math.random() * 100; 
                  flake.style.left = leftPerc + '%';

                  // Random vertical start: from -30% to +20% 
                  // so some flakes appear mid-air
                  const topPerc = Math.random() * 50 - 30; 
                  flake.style.top = topPerc + '%';

                  // Random size
                  const size = 10 + Math.random() * 15; // 10px to 25px
                  flake.style.fontSize = size + 'px';

                  // Random fall duration
                  const duration = 3 + Math.random() * 3; // 3s to 6s
                  flake.style.animationDuration = duration + 's';

                  // Random delay
                  const delay = Math.random() * 3;
                  flake.style.animationDelay = delay + 's';

                  container.appendChild(flake);
                }
              })();
            `
          }}
        />
      </body>
    </html>
  );
}

module.exports = Layout;
