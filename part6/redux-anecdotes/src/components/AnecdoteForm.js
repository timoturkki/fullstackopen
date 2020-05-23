import React from 'react';
import { useDispatch } from 'react-redux';

import { addAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const submitAnecdote = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = '';
    dispatch(addAnecdote(content));
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
