import React from "react";

import CountryList from "./CountryList";
import SingleCountryInfo from "./SingleCountryInfo";

const CountryResults = ({ countries, clickHandler }) => {
  return (
    <>
      {countries.length > 10 ? (
        <p>Too many countries to show, please add filter</p>
      ) : (
        <>
          {countries.length === 0 ? (
            <p>No countries found with the given filter... Please adjust!</p>
          ) : (
            <>
              {countries.length === 1 ? (
                <SingleCountryInfo country={countries[0]} />
              ) : (
                <CountryList
                  countries={countries}
                  clickHandler={clickHandler}
                />
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default CountryResults;
