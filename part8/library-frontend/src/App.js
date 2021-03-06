
import React, { useState, useEffect } from 'react';
import { useApolloClient } from '@apollo/client';

import { useQuery, useSubscription } from '@apollo/client';

import { USER, BOOK_ADDED, ALL_BOOKS } from './queries';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Recommended from './components/Recommended';

const App = () => {
  const [token, setToken] = useState(null);
  const [error, setError] = useState('');
  const [page, setPage] = useState('authors');
  const user = useQuery(USER);
  const client = useApolloClient();

  useEffect(() => {
    const token = localStorage.getItem('library-user-token');
    if (token) {
      setToken(token);
    }
  }, []);

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) },
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      window.alert(`${addedBook.title} added`);
      updateCacheWith(addedBook);
    },
  });

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

  if (user.loading) {
    return <p>Loading...</p>;
  }

  const userGenre = user && user.data && user.data.me ? user.data.me.favoriteGenre : null;

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ?
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommended')}>recommended</button>
            <button onClick={logoutHandler}>logout</button>
          </> :
          <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <p style={{ color: 'tomato' }}>{error}</p>

      <Authors show={page === 'authors'} token={token} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} userGenre={userGenre} />
      <Recommended show={page === 'recommended'} genre={userGenre} />
      <LoginForm setToken={setToken} loginHandler={loginHandler} errorHandler={errorHandler} show={page === 'login'} />

    </div>
  );
};

export default App;