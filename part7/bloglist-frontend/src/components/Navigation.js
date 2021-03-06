import React from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const Navigation = () => {
  return (
    <AppBar position="static" color="inherit">
      <Toolbar color="inherit">
        <Button component={Link} to="/">Blogs</Button>
        <Button component={Link} to="/users">Users</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;