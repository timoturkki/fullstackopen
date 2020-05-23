import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const asAnecdote = (anecdote) => ({ content: anecdote, votes: 0 })
;
const getAnecdotes = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createAnecdote = async (content) => {
  const response = await axios.post(baseUrl, asAnecdote(content));
  return response.data;
};

const updateAnecdote = async (anecdote) => {
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote);

  return response.data;
};

export default { getAnecdotes, createAnecdote, updateAnecdote };