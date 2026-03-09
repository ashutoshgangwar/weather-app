import React, { createContext, useState, useContext } from "react";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);

  const updateWeather = (weather) => {
    setCurrentWeather(weather);
    setError(null);
  };

  const updateForecast = (forecast) => {
    setForecastWeather(forecast);
  };

  const setErrorMessage = (errorMsg) => {
    setError(errorMsg);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <WeatherContext.Provider
      value={{
        currentWeather,
        forecastWeather,
        loading,
        setLoading,
        error,
        setErrorMessage,
        clearError,
        updateWeather,
        updateForecast,
        location,
        setLocation,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within WeatherProvider");
  }
  return context;
};
