// views/users/Profile.jsx
import React from 'react';
import Layout from '../layout/Layout';

function Profile(props) {
  const {
    user,
    currentUser,
    questionsCount,
    answersCount,
    reputation,
    userQuestions,
    userAnswers
  } = props;

  return (
    <Layout title={`${user.username}'s Profile`} currentUser={currentUser}>
      {/* Gradient Cover Banner */}
      <div
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
        />
      </div>

      {/* Profile Card */}
      <div className="container" style={{ marginTop: '-80px' }}>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  {/* Profile Image */}
                  <div className="me-4" style={{ width: '120px', height: '120px' }}>
                    <img
                      src={user.profilePic || '/images/default.png'}
                      alt="Profile"
                      className="rounded-circle"
                      style={{
                        width: '120px',
                        height: '120px',
                        objectFit: 'cover',
                        border: '4px solid white',
                        backgroundColor: 'white'
                      }}
                    />
                  </div>
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

      {/* History Section */}
      <div className="container mt-5">
        <h4 className="mb-4">Your Activity</h4>
        <div className="row g-4">
          {/* User's Questions */}
          <div className="col-md-6">
            <h5 className="mb-3">Your Questions</h5>
            {userQuestions && userQuestions.length > 0 ? (
              <div className="row row-cols-1 g-3">
                {userQuestions.map((q) => (
                  <div className="col" key={q._id}>
                    <div className="card h-100">
                      <div className="card-body">
                        <a
                          href={`/questions/${q._id}`}
                          className="card-title h5 text-decoration-none"
                        >
                          {q.title}
                        </a>
                        <p className="card-text text-muted mb-1">
                          {q.body.substring(0, 100)}...
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted">No questions posted yet.</p>
            )}
          </div>

          {/* User's Answers */}
          <div className="col-md-6">
            <h5 className="mb-3">Your Answers</h5>
            {userAnswers && userAnswers.length > 0 ? (
              <div className="row row-cols-1 g-3">
                {userAnswers.map((a) => (
                  <div className="col" key={a._id}>
                    <div className="card h-100">
                      <div className="card-body">
                        <a
                          href={`/questions/${a.question}`}
                          className="card-title h5 text-decoration-none"
                        >
                          View Question
                        </a>
                        <p className="card-text text-muted mb-1">
                          {a.body.substring(0, 100)}...
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted">No answers posted yet.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
