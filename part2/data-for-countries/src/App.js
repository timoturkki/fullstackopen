import React, { useState, useEffect } from "react";

import axios from "axios";

import FilterCountriesForm from "./components/FilterCountriesForm";
import CountryResults from "./components/CountryResults";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(({ data }) => {
      setCountries(data);
    });
  }, []);

  const countriesToShow = filterValue
    ? countries.filter(({ name }) =>
        name.toLowerCase().includes(filterValue.toLowerCase())
      )
    : countries;

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
  };

  const handleCountrySelected = (name) => {
    setFilterValue(name);
  };

  return (
    <>
      <h1>Countries</h1>

      {countries.length === 0 ? (
        <p>Please wait while we are fetching countries...</p>
      ) : (
        <>
          <FilterCountriesForm
            filterValue={filterValue}
            changeHandler={handleFilterChange}
          />

          <CountryResults
            countries={countriesToShow}
            clickHandler={handleCountrySelected}
          />
        </>
      )}
    </>
  );
};

export default App;
