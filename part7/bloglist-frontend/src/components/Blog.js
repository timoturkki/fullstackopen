import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { deleteBlog, updateBlog } from '../store/reducers/blogReducer';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const [detailsIsVisible, setDetailsIsVisible] = useState(false);
  const { title, author, id, url, user, likes } = blog;

  const removeBlog = () => {
    if (window.confirm(`Are you sure you want to delete this blog: ${title}`)) {
      dispatch(deleteBlog(id, title));
    }
  };

  const addLike = (e) => {
    e.stopPropagation();
    dispatch(updateBlog(id, { author, title, url, user: user.id, likes: likes + 1 }));
  };

  const toggleDetailsVisibility = () => setDetailsIsVisible(!detailsIsVisible);

  const blogStyles = {
    margin: '12px 0',
    padding: 12,
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    boxShadow: '0 2px 4px rgba(30, 30, 30, 0.3)',
  };

  const blogInfoStyles = {
    borderBottom: '1px solid rgb(220, 216, 216)',
    margin: '6px 0',
    padding: '6px 0',
    display: 'flex',
    alignItems: 'center',
  };

  const blogInfoFirstStyles = {
    ...blogInfoStyles,
    borderTop: '1px solid rgb(220, 216, 216)',
  };

  return (
    <>
      <li className="blog-item" style={blogStyles}>
        <p style={{ margin: 0, cursor: 'pointer' }} onClick={toggleDetailsVisibility}>
          {title}, written by: {author}
          <button data-test-details-btn style={{ marginLeft: 12 }} type="button" onClick={toggleDetailsVisibility}>{ detailsIsVisible ? 'Hide details' : 'View details'}</button>
        </p>

        {detailsIsVisible && <>
          <div style={{ padding: '6px 0' }}>
            <p style={blogInfoFirstStyles}>url: {url}</p>
            <p style={blogInfoStyles}>
              likes: {likes}
              <button data-test-like-btn style={{ marginLeft: 12 }} type="button" onClick={addLike}>Like</button>
            </p>
            <p style={blogInfoStyles}>added by: {user.name}</p>
          </div>

          <button data-test-remove-btn type="button" onClick={removeBlog}>Remove blog</button>
        </>}
      </li>
    </>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
