import React, { useEffect, useCallback } from 'react';

const Notification = ({ notification, deleteHandler }) => {
  const { msg, isAlert } = notification;
  const deleteCallback = () => deleteHandler();
  const memoizedDeleteHandler = useCallback(deleteCallback, []);

  useEffect(() => {
    const timer = setTimeout(memoizedDeleteHandler, 6000);
    return () => clearTimeout(timer);
  }, [memoizedDeleteHandler]);

  return <p className={`notification${isAlert ? ' error' : ''}`}>{msg}</p>;
};

export default Notification;
