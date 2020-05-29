import React from 'react';
import { useDispatch } from 'react-redux';

import { loginUser } from '../store/reducers/userReducer';
import  { useField } from '../hooks';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
        <TextField fullWidth { ...username.attr } label={username.attr.id} />
        <TextField fullWidth { ...password.attr } label={password.attr.id} />
        <Button style={{ marginTop: 12 }} type="submit" variant="contained" color="primary">Login</Button>
      </form>
    </>
  );
};

export default LoginForm;
