import React from "react";

const FilterCountriesForm = ({ filterValue, changeHandler }) => (
  <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
    <label htmlFor="country-filter">Find countries</label>
    <br />
    <input
      type="text"
      id="country-filter"
      name="country-filter"
      value={filterValue}
      onChange={changeHandler}
    />
  </form>
);

export default FilterCountriesForm;
