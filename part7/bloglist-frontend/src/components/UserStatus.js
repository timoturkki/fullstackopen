import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { logoutUser } from '../store/reducers/userReducer';

const UserStatus = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);

  if (!user) {
    return null;
  }

  return (
    <>
      <p>You are logged in as {user.name} <button type="button" onClick={() => dispatch(logoutUser())}>logout</button></p>
    </>
  );
};

export default UserStatus;
