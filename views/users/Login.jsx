// views/users/Login.jsx
const React = require('react');
const Layout = require('../layout/Layout');

function Login(props) {
  const { errorMsg } = props;

  return (
    <Layout title="Log In to Your Account">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm border-0 rounded-3">
            <div className="card-body p-4">
              <h3 className="text-center mb-4">Log In</h3>

              {/* Server-side error message (e.g., invalid credentials) */}
              {errorMsg && (
                <div className="alert alert-danger d-flex align-items-center" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  <div>{errorMsg}</div>
                </div>
              )}

              <form
                method="POST"
                action="/users/login"
                className="needs-validation"
                noValidate
                id="loginForm"
              >
                {/* EMAIL */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    required
                    placeholder="e.g. name@example.com"
                    pattern="^\S+@\S+\.\S+$"
                    title="Must be a valid email address."
                  />
                  {/* Real-time invalid email message */}
                  <small id="emailError" className="text-danger" style={{ display: 'none' }}>
                    <i className="bi bi-exclamation-circle-fill"></i> Invalid email format
                  </small>
                  <div className="invalid-feedback">
                    Please enter a valid email address.
                  </div>
                </div>

                {/* PASSWORD + TOGGLE */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label fw-semibold">Password</label>
                  <div className="input-group">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                      required
                      placeholder="Your password"
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      id="togglePassword"
                    >
                      <i className="bi bi-eye-slash" id="togglePasswordIcon"></i>
                    </button>
                  </div>
                  {/* Real-time password error (optional) */}
                  <small id="passwordError" className="text-danger" style={{ display: 'none' }}>
                    <i className="bi bi-exclamation-circle-fill"></i> Password is required
                  </small>
                  <div className="invalid-feedback">
                    Password is required.
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-100 mt-2">Log In</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Inline script for real-time checks and show/hide password */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const form = document.getElementById('loginForm');
              const emailInput = document.getElementById('email');
              const emailError = document.getElementById('emailError');
              const emailPattern = /^\\S+@\\S+\\.\\S+$/;

              const passwordInput = document.getElementById('password');
              const passwordError = document.getElementById('passwordError');

              const togglePasswordBtn = document.getElementById('togglePassword');
              const togglePasswordIcon = document.getElementById('togglePasswordIcon');

              // Real-time email check
              emailInput.addEventListener('input', function() {
                if (!emailPattern.test(emailInput.value)) {
                  emailError.style.display = 'inline';
                } else {
                  emailError.style.display = 'none';
                }
              });

              // Real-time password check (optional)
              passwordInput.addEventListener('input', function() {
                if (!passwordInput.value) {
                  passwordError.style.display = 'inline';
                } else {
                  passwordError.style.display = 'none';
                }
              });

              // Toggle password visibility
              togglePasswordBtn.addEventListener('click', function() {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);

                // Switch icon from eye-slash to eye
                if (type === 'text') {
                  togglePasswordIcon.classList.remove('bi-eye-slash');
                  togglePasswordIcon.classList.add('bi-eye');
                } else {
                  togglePasswordIcon.classList.remove('bi-eye');
                  togglePasswordIcon.classList.add('bi-eye-slash');
                }
              });

              // On submit, if invalid, prevent submission & add .was-validated
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

module.exports = Login;
