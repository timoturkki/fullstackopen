import React from "react";

const FilterNamesForm = ({ filterHandler, filterValue }) => (
  <form onSubmit={(e) => e.preventDefault()}>
    <label for="filter">filter names</label>
    <br />
    <input
      type="text"
      id="filter"
      name="filter"
      value={filterValue}
      onChange={filterHandler}
    />
  </form>
);

export default FilterNamesForm;
