import React from 'react';
import { useDispatch } from 'react-redux';

import { filterChange } from '../reducers/filterReducer';

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => dispatch(filterChange(e.target.value));

  const style = {
    margin: '10px 0',
  };

  return (
    <div style={style}>
      <label htmlFor="filter">Filter anecdotes</label>
      <input type="text" id="filter" name="filter" onChange={handleChange} />
    </div>
  );
};

export default Filter;