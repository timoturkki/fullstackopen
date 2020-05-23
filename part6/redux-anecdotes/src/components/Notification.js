import React from 'react';
import { connect } from 'react-redux';

const Notification = ({ notifications }) => {
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
      {notifications.map(({ msg, id }) =>
        <div key={id} style={style}>
          {msg}
        </div>,
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
  };
};

export default connect(mapStateToProps)(Notification);