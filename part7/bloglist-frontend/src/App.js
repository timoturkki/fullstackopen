import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoginForm from './components/LoginForm';
import Loading from './components/Loading';
import Notifications from './components/Notifications';
import LoggedInContent from './components/LoggedInContent';

import { initializeBlogs } from './store/reducers/blogReducer';
import { initUser } from './store/reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector(({ loading }) => loading);
  const user = useSelector(({ user }) => user);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initUser());
  }, [dispatch]);

  return (
    <>
      <h1>Welcome to browse some blogs!</h1>

      <Notifications />

      {loading ?
        <Loading /> :
        <>
          {user ?
            <LoggedInContent /> :
            <LoginForm />
          }
        </>
      }
    </>
  );
};

export default App;