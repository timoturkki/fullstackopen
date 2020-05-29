import React from 'react';
import { useSelector } from 'react-redux';

import LoginForm from '../components/LoginForm';
import Loading from '../components/Loading';
import LoggedInContent from '../components/LoggedInContent';

const Frontpage = () => {
  const loading = useSelector(({ loading }) => loading);
  const user = useSelector(({ user }) => user);

  return (
    <>
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

export default Frontpage;
