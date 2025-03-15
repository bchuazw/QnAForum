// views/users/ProfileEdit.jsx
const React = require('react');
const Layout = require('../layout/Layout');

function ProfileEdit(props) {
  const { user, currentUser } = props;

  return (
    <Layout title="Edit Profile" currentUser={currentUser}>
      <div className="row justify-content-center mt-4">
        <div className="col-md-6">
          <h3>Edit Profile</h3>
          <form method="POST" action="/users/profile/edit">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-control"
                defaultValue={user.username}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                defaultValue={user.email}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="text"
                id="password"
                name="password"
                className="form-control"
                defaultValue={user.password}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="bio" className="form-label">Bio</label>
              <textarea
                id="bio"
                name="bio"
                className="form-control"
                rows="3"
                defaultValue={user.bio}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="profilePic" className="form-label">Profile Picture URL</label>
              <input
                type="text"
                id="profilePic"
                name="profilePic"
                className="form-control"
                defaultValue={user.profilePic}
              />
            </div>
            <button type="submit" className="btn btn-primary">Save Changes</button>
            <a href="/users/profile" className="btn btn-secondary ms-2">Cancel</a>
          </form>
        </div>
      </div>
    </Layout>
  );
}

module.exports = ProfileEdit;
