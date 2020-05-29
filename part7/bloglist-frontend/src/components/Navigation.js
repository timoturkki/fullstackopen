import React from 'react';
import { Link } from 'react-router-dom';

import UserStatus from './UserStatus';

const Navigation = () => {
  const padding = {
    paddingRight: 5,
  };

  const flex = {
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <div style={flex}>
      <Link to="/" style={padding}>Blogs</Link>
      <Link to="/users" style={padding}>Users</Link>
      <UserStatus />
    </div>
  );
};

export default Navigation;
