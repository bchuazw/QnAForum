// views/users/UsersIndex.jsx
import React from 'react';
import Layout from '../layout/Layout';

function UsersIndex(props) {
  // Destructure currentUser from props, in addition to usersData
  const { usersData, currentUser } = props;

  return (
    // Pass currentUser to Layout so the navbar knows the user is logged in
    <Layout title="All Users" currentUser={currentUser}>
      <div className="container mt-4">
        <h2 className="mb-3">All Users</h2>
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {usersData.map(({ user, reputation }, idx) => (
            <div className="col" key={idx}>
              {/* If you want a blue border, uncomment the style line */}
              <div
                className="card shadow-sm"
                style={{
                  borderRadius: '12px',
                  // border: '2px solid #3b82f6', // Uncomment for a blue border
                }}
              >
                <div className="card-body d-flex align-items-center">
                  <img
                    src={user.profilePic || '/images/default.png'}
                    alt="Profile"
                    className="rounded-circle me-3"
                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                  />
                  <div>
                    <h5 className="card-title mb-1">{user.username}</h5>
                    <p className="text-muted mb-1">{user.email}</p>
                    <small className="text-muted">Reputation: {reputation}</small>
                    <div className="mt-2">
                      <a
                        href={`/users/${user._id}`}
                        className="btn btn-sm btn-outline-secondary"
                      >
                        View Profile
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default UsersIndex;
