import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Container from '@material-ui/core/Container';

import UserStatus from './components/UserStatus';
import Notifications from './components/Notifications';
import Navigation from './components/Navigation';
import Frontpage from './views/Frontpage';
import Users from './views/Users';
import UserDetails from './views/UserDetails';
import BlogDetails from './views/BlogDetails';

import { initializeBlogs } from './store/reducers/blogReducer';
import { initializeUsers } from './store/reducers/usersReducer';
import { initUser } from './store/reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
    dispatch(initUser());
  }, [dispatch]);

  return (
    <>
      <Navigation />

      <Container maxWidth="xl">
        <UserStatus />
        <h1>Welcome to browse some blogs!</h1>

        <Notifications />

        <Switch>
          <Route exact path="/" component={Frontpage} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/users/:id" component={UserDetails} />
          <Route exact path="/blogs/:id" component={BlogDetails} />
        </Switch>
      </Container>
    </>
  );
};

export default App;