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
    justifyContent: 'space-between',
  };

  return (
    <div style={flex}>
      <div>
        <Link to="/" style={padding}>Blogs</Link>
        <Link to="/users" style={padding}>Users</Link>
      </div>
      <UserStatus />
    </div>
  );
};

export default Navigation;
