// views/tags/TagsIndex.jsx
import React from 'react';
import Layout from '../layout/Layout';

function TagsIndex(props) {
  const { tagsData, currentUser } = props;

  return (
    <Layout title="Tags" currentUser={currentUser}>
      <div className="container mt-5">
        <h2 className="mb-3 fw-bold">Tags</h2>
        <p className="text-muted mb-4">
          A tag is a keyword or label that categorizes your question with other, similar questions.
        </p>

        {/* 3 columns per row on md+ screens, 1 column on smaller */}
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {tagsData.map((tag, idx) => (
            <div key={idx} className="col">
              {/* Card with a 2px solid blue border */}
              <div
                className="card h-100 shadow-sm"
                style={{ border: '2px solid #3b82f6', borderRadius: '12px' }}
              >
                <div className="card-body">
                  <h5 className="card-title text-primary">{tag.name}</h5>
                  <p className="card-text text-muted mb-3">
                    {tag.description}
                  </p>
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center">
                  <small className="text-muted">
                    {tag.usageCount} question{tag.usageCount !== 1 ? 's' : ''}
                  </small>
                  <a
                    href={`/questions?tag=${encodeURIComponent(tag.name)}`}
                    className="btn btn-outline-primary btn-sm"
                  >
                    View Questions
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

export default TagsIndex;
