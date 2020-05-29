import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
  const { title, author, id } = blog;

  const blogStyles = {
    margin: '12px 0',
    padding: 12,
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    boxShadow: '0 2px 4px rgba(30, 30, 30, 0.3)',
  };

  return (
    <>
      <li className="blog-item" style={blogStyles}>
        <p style={{ margin: 0, cursor: 'pointer' }}>
          <Link to={`/blogs/${id}`}>{title}, written by: {author}</Link>
        </p>
      </li>
    </>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
