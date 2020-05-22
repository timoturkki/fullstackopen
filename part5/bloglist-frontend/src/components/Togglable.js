import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

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
        <button type="button" onClick={toggleVisibility}>{showButtonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button type="button" onClick={toggleVisibility}>{hideButtonLabel}</button>
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