import React, { useEffect } from 'react';

const Notification = ({ notification, deleteHandler }) => {
  const { msg, isAlert, id } = notification;

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(`${msg} deleted`);
      deleteHandler(id);
    }, 5000);
    return () => clearTimeout(timer);
  });

  return <p className={`notification${isAlert ? ' error' : ''}`}>{msg}</p>;
};

export default React.memo(Notification);
