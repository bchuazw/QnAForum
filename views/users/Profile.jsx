// views/users/Profile.jsx
const React = require('react');
const Layout = require('../layout/Layout');

function Profile(props) {
  const { user, currentUser, questionsCount, answersCount, reputation } = props;

  return (
    <Layout title={`${user.username}'s Profile`} currentUser={currentUser}>
      {/* Gradient Cover Banner */}
      <div
        className="profile-cover"
        style={{
          height: '180px',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          position: 'relative'
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.2)'
          }}
        ></div>
      </div>

      {/* Profile Card */}
      <div className="container" style={{ marginTop: '-80px' }}>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-body" style={{ position: 'relative' }}>
                <div className="d-flex align-items-center">
                  {/* Profile Image */}
                  <img
                    src={user.profilePic || '/images/default.png'}
                    alt="Profile"
                    className="rounded-circle"
                    style={{
                      width: '120px',
                      height: '120px',
                      objectFit: 'cover',
                      border: '4px solid white',
                      marginTop: '-60px',
                      marginRight: '20px',
                      backgroundColor: 'white'
                    }}
                  />
                  <div>
                    <h3 className="card-title mb-1">{user.username}</h3>
                    <p className="text-muted mb-2">{user.email}</p>
                    {user.bio ? (
                      <p className="mb-0">{user.bio}</p>
                    ) : (
                      <p className="text-muted mb-0">No bio set.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Stats Row */}
              <div className="row text-center px-3 py-2">
                <div className="col">
                  <h6 className="text-uppercase text-muted mb-1">Question Score</h6>
                  <p className="fw-bold mb-0">{questionsCount}</p>
                </div>
                <div className="col">
                  <h6 className="text-uppercase text-muted mb-1">Answer Score</h6>
                  <p className="fw-bold mb-0">{answersCount}</p>
                </div>
                <div className="col">
                  <h6 className="text-uppercase text-muted mb-1">Reputation</h6>
                  <p className="fw-bold mb-0">{reputation}</p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="card-footer text-end">
                <a href="/users/profile/edit" className="btn btn-warning btn-sm">
                  Edit Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

module.exports = Profile;
