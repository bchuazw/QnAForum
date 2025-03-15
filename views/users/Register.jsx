// views/users/Register.jsx
const React = require('react');
const Layout = require('../layout/Layout');

function Register(props) {
  const { errorMsg } = props;

  return (
    <Layout title="Create an Account">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm border-0 rounded-3">
            <div className="card-body p-4">
              <h3 className="text-center mb-4">Sign Up</h3>

              {/* Server-side error message (e.g., duplicates, Mongoose validation) */}
              {errorMsg && (
                <div className="alert alert-danger d-flex align-items-center" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  <div>{errorMsg}</div>
                </div>
              )}

              <form 
                method="POST" 
                action="/users/register" 
                className="needs-validation" 
                noValidate 
                id="registerForm"
              >
                {/* USERNAME */}
                <div className="mb-3">
                  <label htmlFor="username" className="form-label fw-semibold">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="form-control"
                    required
                    placeholder="Enter a unique username"
                  />
                  <div className="invalid-feedback">
                    Please enter a username.
                  </div>
                </div>

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
                      placeholder="At least 8 chars, with uppercase, lowercase, digit, special char"
                      pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}"
                      title="Must include uppercase, lowercase, number, special char, min 8 chars."
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      id="togglePassword"
                    >
                      <i className="bi bi-eye-slash" id="togglePasswordIcon"></i>
                    </button>
                  </div>
                  {/* Real-time password error */}
                  <small id="passwordError" className="text-danger" style={{ display: 'none' }}>
                    <i className="bi bi-exclamation-circle-fill"></i> Invalid password format
                  </small>
                  <div className="invalid-feedback">
                    Password must include uppercase, lowercase, digit, special char, min 8 chars.
                  </div>
                </div>

                <button type="submit" className="btn btn-success w-100 mt-2">Register</button>
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
              const form = document.getElementById('registerForm');
              const emailInput = document.getElementById('email');
              const emailError = document.getElementById('emailError');
              const emailPattern = /^\\S+@\\S+\\.\\S+$/;

              const passwordInput = document.getElementById('password');
              const passwordError = document.getElementById('passwordError');
              const passwordPattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,}/;

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

              // Real-time password check
              passwordInput.addEventListener('input', function() {
                if (!passwordPattern.test(passwordInput.value)) {
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

module.exports = Register;
