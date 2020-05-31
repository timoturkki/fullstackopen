import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { LOGIN } from '../queries';

const LoginForm = ({ setToken, show, loginHandler, errorHandler }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [ login,result ] = useMutation(LOGIN, {
    onError: (error) => { errorHandler(error.graphQLErrors[0].message); },
  });

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('library-user-token', token);
    }
  }, [result.data]) // eslint-disable-line

  const submitLoginHandler = async (e) => {
    e.preventDefault();
    login({ variables: { username, password } });
    loginHandler();
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      <form onSubmit={submitLoginHandler}>
        <div>
          name
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>

        <button type='submit'>login</button>
      </form>
    </div>
  );
};

export default LoginForm;