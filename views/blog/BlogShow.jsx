// views/blog/BlogShow.jsx
import React from 'react';
import Layout from '../layout/Layout';

function BlogShow(props) {
  const { post, currentUser } = props;

  return (
    <Layout title={post.title} currentUser={currentUser}>
      <div className="container mt-5" style={{ maxWidth: '800px' }}>
        <h2 className="mb-3 fw-bold">{post.title}</h2>
        <p>{post.content}</p>
        <a href="/blog" className="btn btn-secondary btn-sm mt-3">
          Back to Blog
        </a>
      </div>
    </Layout>
  );
}

export default BlogShow;
