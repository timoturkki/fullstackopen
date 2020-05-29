import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

const Togglable = React.forwardRef(({ showButtonLabel, hideButtonLabel, children }, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  const hideWhenVisible = { display: isVisible ? 'none' : '' };
  const showWhenVisible = { display: isVisible ? '' : 'none' };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <>
      <div style={hideWhenVisible}>
        <Button variant="contained" color="primary" onClick={toggleVisibility}>{showButtonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button style={{ marginTop: 12 }} variant="contained" color="primary" onClick={toggleVisibility}>{hideButtonLabel}</Button>
      </div>
    </>
  );
});

Togglable.displayName = 'Togglable';

Togglable.propTypes = {
  showButtonLabel: PropTypes.string.isRequired,
  hideButtonLabel: PropTypes.string.isRequired,
};

export default Togglable;