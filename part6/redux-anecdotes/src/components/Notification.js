import React from 'react';
import { useSelector } from 'react-redux';
import { generate as generateId } from 'short-id';

const Notification = () => {
  const notifications = useSelector(state => state.notifications);

  const style = {
    color: '#2b4832',
    backgroundColor: '#e7f7f5',
    fontSize: 19,
    padding: '10px 20px',
    margin: '10px 0',
    boxShadow: '0 2px 4px rgba(30, 30, 30, 0.3)',
  };

  return (
    <>
      {notifications.map(({ msg }) =>
        <div key={generateId()} style={style}>
          {msg}
        </div>,
      )}
    </>
  );
};

export default Notification;