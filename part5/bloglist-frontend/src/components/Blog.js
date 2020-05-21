import React, { useState } from 'react';

const Blog = ({ blog, removeBlogHandler }) => {
  const [detailsIsVisible, setDetailsIsVisible] = useState(false);
  const { title, author, id, url, user, likes } = blog;

  const removeBlog = () => {
    if (window.confirm(`Are you sure you want to delete this blog: ${title}`)) {
      removeBlogHandler(id, title);
    }
  };

  const addLike = () => {
    console.log('liked!');
  };

  return (
    <>
      <li>{title}, written by: {author}
        <button type="button" onClick={() => setDetailsIsVisible(!detailsIsVisible)}>{ detailsIsVisible ? 'Hide details' : 'View details'}</button>
      </li>

      {detailsIsVisible && <>
        <p>url: {url}</p>
        <p>likes: {likes} <button type="button" onClick={addLike}>Like</button></p>
        <p>added by: {user.name}</p>

        <button type="button" onClick={removeBlog}>Remove blog</button>
      </>}
    </>
  );
};

export default Blog;
