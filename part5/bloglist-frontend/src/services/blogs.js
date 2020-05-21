import axios from 'axios';

const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);

  return response.data;
};

const createBlog = async blog => {
  const response = await axios.post(baseUrl, blog, { headers: { Authorization: token } });

  return response.data;
};

const deleteBlog = async id => {
  const response = await axios.delete(`${baseUrl}/${id}`, { headers: { Authorization: token } });
  return response.data;
};

export default { getAll, setToken, createBlog, deleteBlog };