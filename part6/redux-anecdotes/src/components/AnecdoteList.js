import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { voteAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.sort((a, b) => b.votes - a.votes));
  const dispatch = useDispatch();

  return (
    <>
      {anecdotes.map(({ id, content, votes }) =>
        <div key={id}>
          <div>
            {content}
          </div>
          <div>
            has {votes}
            <button onClick={() => dispatch(voteAnecdote(id))}>vote</button>
          </div>
        </div>,
      )}
    </>
  );
};

export default AnecdoteList;
