import React from 'react';
import { useDispatch } from 'react-redux';

import { loginUser } from '../store/reducers/userReducer';
import  { useField } from '../hooks';

import Button from '@material-ui/core/Button';

const LoginForm = () => {
  const dispatch = useDispatch();
  const username = useField('text', 'username');
  const password = useField('password', 'password');

  const loginHandler = async (e) => {
    e.preventDefault();

    dispatch(loginUser({
      username: username.attr.value,
      password: password.attr.value,
    }));
  };

  return (
    <>
      <h2>Log in please</h2>
      <form id="login-form" onSubmit={loginHandler}>
        <div>
          <label htmlFor={username.attr.id}>username</label><br />
          <input { ...username.attr } />
        </div>
        <div>
          <label htmlFor={password.attr.id}>password</label><br />
          <input { ...password.attr } />
        </div>
        <Button style={{ marginTop: 12 }} type="submit" variant="contained" color="primary">Login</Button>
      </form>
    </>
  );
};

export default LoginForm;
