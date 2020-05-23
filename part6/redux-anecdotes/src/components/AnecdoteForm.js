import React from 'react';
import { useDispatch } from 'react-redux';
import { generate as generateId } from 'short-id';

import { addAnecdote } from '../reducers/anecdoteReducer';
import { addNotification, removeNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const submitAnecdote = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    const notificationId = generateId();

    e.target.anecdote.value = '';
    dispatch(addAnecdote(content));

    dispatch(addNotification(notificationId, `you just added notification "${content}"`, setTimeout(() => {
      dispatch(removeNotification(notificationId));
    }, 5000)));
  };

  return (
    <>
      <h2>Create new anecdote</h2>
      <form onSubmit={submitAnecdote}>
        <div>
          <label htmlFor="anecdote">Add new anecdote</label><br />
          <input type="text" id="anecdote" name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
