import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const Notifications = () => {
  const notifications = useSelector(({ notifications }) => notifications);

  return (
    <>
      {notifications.map(({ msg, id, isAlert }) =>
        <p key={id} className={`notification${isAlert ? ' error' : ''}`}>{msg}</p>,
      )}
    </>
  );
};

Notification.propTypes = {
  notification: PropTypes.object.isRequired,
  deleteHandler: PropTypes.func.isRequired,
};

export default Notifications;