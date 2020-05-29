import React from 'react';
import { useDispatch } from 'react-redux';

import { addComment } from '../store/reducers/blogReducer';
import  { useField } from '../hooks';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const Comments = ({ comments, id }) => {
  const dispatch = useDispatch();
  const comment = useField('text', 'comment');

  const submitCommentHandler = (e) => {
    e.preventDefault();

    dispatch(addComment(id, comment.attr.value));

    comment.reset();
  };

  return (
    <>
      <h3>Comments</h3>

      {!comments.length ?
        <p>No comments yet</p> :
        <ul>
          {comments.map(({ comment, id }) => (
            <li key={id}>{comment}</li>
          ))}
        </ul>
      }

      <h3 style={{ marginTop: 40 }}>Add new comment</h3>
      <form onSubmit={submitCommentHandler}>
        <TextField fullWidth { ...comment.attr } label={comment.attr.id} />

        <Button fullWidth style={{ marginTop: 12 }} type="submit" variant="contained" color="primary">Submit comment</Button>
      </form>
    </>
  );
};

export default Comments;
