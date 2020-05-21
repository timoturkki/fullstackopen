import React, { useEffect } from 'react';

const Notification = ({ notification, deleteHandler }) => {
  const { msg, isAlert } = notification;

  useEffect(() => {
    const timer = setTimeout(deleteHandler, 6000);
    return () => clearTimeout(timer);
  }, []);

  return <p className={`notification${isAlert ? ' error' : ''}`}>{msg}</p>;
};

export default Notification;
