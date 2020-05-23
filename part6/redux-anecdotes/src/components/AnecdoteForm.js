import React from 'react';
import { useDispatch } from 'react-redux';

import { addAnecdote } from '../reducers/anecdoteReducer';
import { addNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const submitAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;

    e.target.anecdote.value = '';

    dispatch(addAnecdote(content));

    dispatch(addNotification(`you just added notification "${content}"`, 5));
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
