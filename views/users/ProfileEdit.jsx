// views/users/ProfileEdit.jsx
import React from 'react';
import Layout from '../layout/Layout';

function ProfileEdit(props) {
  const { user, currentUser } = props;

  // List of default profile pictures (ensure these images exist in public/images/)
  const defaultPics = [
    '/images/avatar1.png',
    '/images/avatar2.png',
    '/images/avatar3.png',
    '/images/avatar4.png',
    '/images/avatar5.png',
    '/images/avatar6.png',
    '/images/avatar7.png',
    '/images/avatar8.png',
    '/images/avatar9.png'
  ];

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
            {/* Default Profile Picture Selection */}
            <div className="mb-3">
              <label className="form-label">Select a Profile Picture</label>
              <div className="d-flex flex-wrap">
                {defaultPics.map((pic, idx) => (
                  <label key={idx} className="me-3 text-center" style={{ cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="profilePic"
                      value={pic}
                      defaultChecked={user.profilePic === pic || (!user.profilePic && idx === 0)}
                      style={{ marginRight: '5px' }}
                    />
                    <img
                      src={pic}
                      alt={`avatar${idx}`}
                      style={{
                        width: '60px',
                        height: '60px',
                        objectFit: 'cover',
                        border: user.profilePic === pic ? '2px solid #2a9d8f' : '1px solid #ddd',
                        borderRadius: '50%'
                      }}
                    />
                  </label>
                ))}
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Save Changes</button>
            <a href="/users/profile" className="btn btn-secondary ms-2">Cancel</a>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default ProfileEdit;
