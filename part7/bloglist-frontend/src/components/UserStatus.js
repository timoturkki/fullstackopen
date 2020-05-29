import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { logoutUser } from '../store/reducers/userReducer';

import Button from '@material-ui/core/Button';

const UserStatus = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(({ user }) => user);

  const logOutHandler = () => {
    dispatch(logoutUser());
    history.push('/');
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <p>
        You are logged in as {user.name}
        <Button style={{ marginLeft: 12 }} variant="contained" color="primary" onClick={logOutHandler}>logout</Button>
      </p>
    </>
  );
};

export default UserStatus;
