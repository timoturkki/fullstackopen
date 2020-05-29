import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { Alert } from '@material-ui/lab';

const Notifications = () => {
  const notifications = useSelector(({ notifications }) => notifications);
  const margin = { marginBottom: 10 };

  return (
    <>
      {notifications.map(({ msg, id, isAlert }) =>
        <Alert style={margin} key={id} severity={`${isAlert ? 'error' : 'success'}`}>{msg}</Alert>,
      )}
    </>
  );
};

Notification.propTypes = {
  notification: PropTypes.object.isRequired,
  deleteHandler: PropTypes.func.isRequired,
};

export default Notifications;