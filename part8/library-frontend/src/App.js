
import React, { useState, useEffect } from 'react';
import { useApolloClient } from '@apollo/client';

import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';

const App = () => {
  const [token, setToken] = useState(null);
  const [error, setError] = useState('');
  const [page, setPage] = useState('authors');
  const client = useApolloClient();

  useEffect(() => {
    const token = localStorage.getItem('library-user-token');
    if (token) {
      setToken(token);
    }
  }, []);

  const logoutHandler = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage('authors');
  };

  const loginHandler = () => {
    setPage('authors');
  };

  const errorHandler = (msg) => {
    setError(msg);

    setTimeout(() => {
      setError('');
    }, 5000);
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ?
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={logoutHandler}>logout</button>
          </> :
          <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <p style={{ color: 'tomato' }}>{error}</p>

      <Authors show={page === 'authors'} token={token} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <LoginForm setToken={setToken} loginHandler={loginHandler} errorHandler={errorHandler} show={page === 'login'} />

    </div>
  );
};

export default App;