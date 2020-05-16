import React from "react";

const CountryList = ({ countries, clickHandler }) => (
  <ul>
    {countries.map(({ name, alpha3Code }) => (
      <li key={`country-${alpha3Code}`}>
        {name}

        <button type="button" onClick={() => clickHandler(name.toLowerCase())}>
          Show info
        </button>
      </li>
    ))}
  </ul>
);

export default CountryList;
