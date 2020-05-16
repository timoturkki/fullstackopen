import React from "react";

import WeatherData from "./WeatherData";

const SingleCountryInfo = ({ country }) => {
  const { name, capital, population, languages, flag } = country;

  return (
    <>
      <h2>{name}</h2>

      <p>
        Capital of {name} is {capital}.
      </p>
      <p>
        Population of {name} is {population}.
      </p>

      <h3>Languages</h3>
      <ul>
        {languages.map(({ name, iso639_2 }) => (
          <li key={`lang-${iso639_2}`}>{name}</li>
        ))}
      </ul>

      <img width="200" height="200" src={flag} alt={`Flag of ${name}`} />

      <WeatherData city={capital} />
    </>
  );
};

export default SingleCountryInfo;
