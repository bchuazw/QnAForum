// views/blog/BlogIndex.jsx
import React from 'react';
import Layout from '../layout/Layout';

function BlogIndex(props) {
  const { blogPosts, currentUser } = props;

  return (
    <Layout title="The Overflow Blog" currentUser={currentUser}>
      <div className="container mt-5">
        <h2 className="mb-4 fw-bold">The Overflow Blog</h2>
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {blogPosts.map((post) => (
            <div className="col" key={post.id}>
              <div className="card shadow-sm" style={{ borderRadius: '12px' }}>
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text text-muted">
                    {post.content.substring(0, 100)}...
                  </p>
                  <a href={`/blog/${post.id}`} className="btn btn-primary btn-sm">
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default BlogIndex;
