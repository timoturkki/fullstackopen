import React, { useState } from 'react';

const Blog = ({ blog, removeBlogHandler, updateBlogHandler }) => {
  const [detailsIsVisible, setDetailsIsVisible] = useState(false);
  const { title, author, id, url, user, likes } = blog;

  const removeBlog = () => {
    if (window.confirm(`Are you sure you want to delete this blog: ${title}`)) {
      removeBlogHandler(id, title);
    }
  };

  const addLike = (e) => {
    e.stopPropagation();
    updateBlogHandler(id, { author, title, url, user: user.id, likes: likes + 1 });
  };

  const toggleDetailsVisibility = () => setDetailsIsVisible(!detailsIsVisible);

  const blogStyles = {
    margin: '12px 0',
    padding: 12,
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    boxShadow: '0 2px 4px rgba(30, 30, 30, 0.3)',
    cursor: 'pointer',
  };

  const buttonStyles = {
    marginLeft: 12,
  };

  const blogInfoBoxStyles = {
    padding: '6px 0',
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
      <li style={blogStyles} onClick={toggleDetailsVisibility}>
        {title}, written by: {author}
        <button style={buttonStyles} type="button" onClick={toggleDetailsVisibility}>{ detailsIsVisible ? 'Hide details' : 'View details'}</button>

        {detailsIsVisible && <>
          <div style={blogInfoBoxStyles}>
            <p style={blogInfoFirstStyles}>url: {url}</p>
            <p style={blogInfoStyles}>likes: {likes} <button style={buttonStyles} type="button" onClick={addLike}>Like</button></p>
            <p style={blogInfoStyles}>added by: {user.name}</p>
          </div>

          <button type="button" onClick={removeBlog}>Remove blog</button>
        </>}
      </li>
    </>
  );
};

export default Blog;
