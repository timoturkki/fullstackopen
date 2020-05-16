import React, { useState, useEffect } from "react";

import axios from "axios";

const WeatherData = ({ city }) => {
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;

    // create cancel token so the async operation can be cancelled
    // if the component is destroyed before the promise is done
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    // to handle e.g. Washington, D.C
    const formattedCity = city.split(",")[0].split(" ")[0];
    const weaterApiUrl = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${formattedCity}`;

    axios
      .get(weaterApiUrl, { cancelToken: source.token })
      .then(({ data }) => {
        if (data.success === false) {
          setWeatherData(null);
        } else {
          setWeatherData(data.current);
        }
      })
      .catch(() => setWeatherData(null));

    return () => {
      source.cancel();
    };
  }, [city]);

  return (
    <>
      <h3>Weather in {city}</h3>

      {!weatherData ? (
        <p>
          Ooops! Something went wrong, you sure you added a working api key?
        </p>
      ) : (
        <>
          {!Object.keys(weatherData).length ? (
            <p>Please wait while we are fetching weather data...</p>
          ) : (
            <>
              <p>
                Temperature in {city} is {weatherData.temperature} degrees at
                the moment.
              </p>

              {weatherData.weather_icons.map((iconUrl, i) => (
                <img
                  key={`weather-icon-${i}`}
                  width="50"
                  height="50"
                  src={iconUrl}
                  alt=""
                />
              ))}

              <p>Wind speed is {weatherData.wind_speed} mph</p>
              <p>Wind direction is {weatherData.wind_dir}.</p>
            </>
          )}
        </>
      )}
    </>
  );
};

export default WeatherData;
