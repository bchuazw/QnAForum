// views/users/PublicProfile.jsx
import React from 'react';
import Layout from '../layout/Layout';

function PublicProfile(props) {
  const {
    user,
    userQuestions,
    userAnswers,
    reputation,
    currentUser
  } = props;

  // Basic counts
  const questionCount = userQuestions ? userQuestions.length : 0;
  const answerCount = userAnswers ? userAnswers.length : 0;

  return (
    // Pass currentUser so the navbar displays the logged-in state
    <Layout title={`${user.username}'s Public Profile`} currentUser={currentUser}>
      {/* Profile Card Section */}
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-sm" style={{ borderRadius: '12px' }}>
              <div className="card-body text-center">
                <img
                  src={user.profilePic || '/images/default.png'}
                  alt="Profile"
                  className="rounded-circle mb-3"
                  style={{
                    width: '120px',
                    height: '120px',
                    objectFit: 'cover',
                    border: '4px solid white'
                  }}
                />
                <h3 className="mb-1">{user.username}</h3>
                <p className="text-muted mb-2">{user.email}</p>
                {user.bio && <p className="mb-2">{user.bio}</p>}

                {/* Simple Stats Row */}
                <hr />
                <div className="d-flex justify-content-around">
                  <div>
                    <h6 className="text-uppercase text-muted mb-1">Questions</h6>
                    <p className="fw-bold mb-0">{questionCount}</p>
                  </div>
                  <div>
                    <h6 className="text-uppercase text-muted mb-1">Answers</h6>
                    <p className="fw-bold mb-0">{answerCount}</p>
                  </div>
                  <div>
                    <h6 className="text-uppercase text-muted mb-1">Reputation</h6>
                    <p className="fw-bold mb-0">{reputation}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Section */}
      <div className="container mt-4" style={{ maxWidth: '900px' }}>
        <h5 className="mb-3 fw-bold text-center">Activity</h5>
        <div className="row g-4">
          {/* Questions Card */}
          <div className="col-md-6">
            <div className="card shadow-sm" style={{ borderRadius: '12px' }}>
              <div className="card-header bg-primary text-white">
                <h6 className="mb-0">{user.username}'s Questions</h6>
              </div>
              <div className="card-body">
                {userQuestions && userQuestions.length > 0 ? (
                  userQuestions.map((q) => (
                    <div key={q._id} className="mb-2">
                      <a
                        href={`/questions/${q._id}`}
                        className="fw-bold text-primary text-decoration-none"
                      >
                        {q.title}
                      </a>
                      <p className="text-muted mb-0">
                        {q.body.substring(0, 80)}...
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-muted">No questions yet.</p>
                )}
              </div>
            </div>
          </div>

          {/* Answers Card */}
          <div className="col-md-6">
            <div className="card shadow-sm" style={{ borderRadius: '12px' }}>
              <div className="card-header bg-success text-white">
                <h6 className="mb-0">{user.username}'s Answers</h6>
              </div>
              <div className="card-body">
                {userAnswers && userAnswers.length > 0 ? (
                  userAnswers.map((a) => (
                    <div key={a._id} className="mb-2">
                      <a
                        href={`/questions/${a.question}`}
                        className="fw-bold text-success text-decoration-none"
                      >
                        View Question
                      </a>
                      <p className="text-muted mb-0">
                        {a.body.substring(0, 80)}...
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-muted">No answers yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PublicProfile;
