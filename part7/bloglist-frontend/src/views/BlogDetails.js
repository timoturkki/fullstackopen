import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { updateBlog } from '../store/reducers/blogReducer';
import Comments from '../components/Comments';
import Loading from '../components/Loading';

import Button from '@material-ui/core/Button';

const BlogDetails = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch('/blogs/:id');
  const blog = useSelector(({ blogs }) => {
    return match ? blogs.find(blog => blog.id === match.params.id) : null;
  });
  const loading = useSelector(({ loading }) => loading);

  if (!blog) {
    return (
      <h2>Blog not found...</h2>
    );
  }

  const { title, author, id, url, user, likes, comments } = blog;

  const addLike = () => {
    dispatch(updateBlog(id, { author, title, url, user: user.id, likes: likes + 1 }));
  };

  return (
    <>
      <h2>{title}, written by: {author}</h2>

      <p>url: {url}</p>
      <p>
        likes: {likes}
        <Button style={{ marginLeft: 12 }} type="submit" variant="contained" color="primary" onClick={addLike}>Like</Button>
      </p>
      <p>added by: {user.name}</p>

      {loading ?
        <Loading /> :
        <Comments comments={comments} id={id} />
      }
    </>
  );
};

export default BlogDetails;
