import anecdotesService from '../services/anecdotes';

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_ANECDOTE':
      return state.map(a => a.id !== action.data.id ? a : action.data );
    case 'NEW_ANECDOTE':
      return [...state, action.data];
    case 'INIT_ANECDOTES':
      return action.data;
    default:
      return state;
  }
};

export const addAnecdote = content => {
  return async dispatch => {
    const data = await anecdotesService.createAnecdote(content);
    dispatch({ type: 'NEW_ANECDOTE', data });
  };
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const data = await anecdotesService.getAnecdotes();

    dispatch({ type: 'INIT_ANECDOTES', data });
  };
};

export const updateAnecdote = (anecdote) => {
  return async dispatch => {
    const data = await anecdotesService.updateAnecdote(anecdote);

    dispatch({ type: 'UPDATE_ANECDOTE', data });
  };
};

export default anecdoteReducer;