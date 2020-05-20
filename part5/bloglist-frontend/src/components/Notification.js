import React from 'react';

const Notification = ({ message, isError }) => {
  if (!message) {
    return null;
  }

  return <p className={`notification${isError ? ' error' : ''}`}>{message}</p>;
};

export default Notification;
