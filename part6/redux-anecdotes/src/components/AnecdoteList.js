import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { generate as generateId } from 'short-id';

import { voteAnecdote } from '../reducers/anecdoteReducer';
import { addNotification, removeNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    const sorted = anecdotes.sort((a, b) => b.votes - a.votes);
    return filter
      ? sorted.filter(s => s.content.toLowerCase().includes(filter.toLowerCase()))
      : sorted;
  });

  const vote = (id, content) => {
    const notificationId = generateId();

    dispatch(voteAnecdote(id));

    dispatch(addNotification(notificationId, `you just voted "${content}"`, setTimeout(() => {
      dispatch(removeNotification(notificationId));
    }, 5000)));
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
            <button onClick={() => vote(id, content)}>vote</button>
          </div>
        </div>,
      )}
    </>
  );
};

export default AnecdoteList;
