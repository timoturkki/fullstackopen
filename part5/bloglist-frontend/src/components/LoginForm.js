import React from 'react';

const LoginForm = ({ username, password, usernameHandler, passwordHandler, loginHandler }) => {
  return (
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
  );
};

export default LoginForm;
