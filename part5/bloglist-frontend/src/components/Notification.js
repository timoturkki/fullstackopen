import React, { useEffect } from 'react';

const Notification = ({ notification, deleteHandler }) => {
  const { msg, isAlert } = notification;

  useEffect(() => {
    const timer = setTimeout(() => deleteHandler(), 5000);
    return () => clearTimeout(timer);
  }, [deleteHandler]);

  return <p className={`notification${isAlert ? ' error' : ''}`}>{msg}</p>;
};

export default React.memo(Notification);
