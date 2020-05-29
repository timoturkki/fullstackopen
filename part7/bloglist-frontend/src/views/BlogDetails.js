import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { updateBlog } from '../store/reducers/blogReducer';

const BlogDetails = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch('/blogs/:id');
  const blog = useSelector(({ blogs }) => {
    return match ? blogs.find(blog => blog.id === match.params.id) : null;
  });

  if (!blog) {
    return (
      <h2>Blog not found...</h2>
    );
  }

  const { title, author, id, url, user, likes } = blog;

  const addLike = () => {
    dispatch(updateBlog(id, { author, title, url, user: user.id, likes: likes + 1 }));
  };

  return (
    <>
      <h2>{title}, written by: {author}</h2>

      <p>url: {url}</p>
      <p>
        likes: {likes}
        <button data-test-like-btn style={{ marginLeft: 12 }} type="button" onClick={addLike}>Like</button>
      </p>
      <p>added by: {user.name}</p>
    </>
  );
};

export default BlogDetails;
