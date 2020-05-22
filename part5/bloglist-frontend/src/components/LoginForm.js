import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ username, password, usernameHandler, passwordHandler, loginHandler }) => {
  return (
    <>
      <h2>Log in please</h2>
      <form onSubmit={loginHandler}>
        <div>
          <label htmlFor="username">username</label><br />
          <input
            type="text"
            value={username}
            id="username"
            name="username"
            onChange={usernameHandler}
          />
        </div>
        <div>
          <label htmlFor="password">password</label><br />
          <input
            type="password"
            value={password}
            name="password"
            id="password"
            onChange={passwordHandler}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  usernameHandler: PropTypes.func.isRequired,
  passwordHandler: PropTypes.func.isRequired,
  loginHandler: PropTypes.func.isRequired,
};

export default LoginForm;
