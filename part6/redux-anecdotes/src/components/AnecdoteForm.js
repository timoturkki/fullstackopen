import React from 'react';
import { connect } from 'react-redux';

import { addAnecdote } from '../reducers/anecdoteReducer';
import { addNotification } from '../reducers/notificationReducer';

const AnecdoteForm = ({ addNotification, addAnecdote }) => {
  const submitAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;

    e.target.anecdote.value = '';

    addAnecdote(content);

    addNotification(`you just added notification "${content}"`, 5);
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

const mapDispatchToProps = {
  addNotification,
  addAnecdote,
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);

