import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { updateAnecdote } from '../reducers/anecdoteReducer';
import { addNotification } from '../reducers/notificationReducer';
import anecdotesService from '../services/anecdotes';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    const sorted = anecdotes.sort((a, b) => b.votes - a.votes);
    return filter
      ? sorted.filter(s => s.content.toLowerCase().includes(filter.toLowerCase()))
      : sorted;
  });

  const vote = async (id, content, votes) => {
    const anecdote = await anecdotesService.updateAnecdote({ id, content, votes: votes + 1 });
    dispatch(updateAnecdote(anecdote));

    dispatch(addNotification(`you just voted "${content}"`, 5));
  };

  return (
    <>
      {anecdotes.map(({ id, content, votes }) =>
        <div key={id}>
          <div>
            {content}
          </div>
          <div>
            has {votes}
            <button onClick={() => vote(id, content, votes)}>vote</button>
          </div>
        </div>,
      )}
    </>
  );
};

export default AnecdoteList;
