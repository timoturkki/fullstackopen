import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Notifications from './components/Notifications';
import Navigation from './components/Navigation';
import Frontpage from './views/Frontpage';
import Users from './views/Users';

import { initializeBlogs } from './store/reducers/blogReducer';
import { initUser } from './store/reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initUser());
  }, [dispatch]);

  return (
    <>
      <Navigation />
      <h1>Welcome to browse some blogs!</h1>

      <Notifications />

      <Switch>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Frontpage />
        </Route>
      </Switch>
    </>
  );
};

export default App;