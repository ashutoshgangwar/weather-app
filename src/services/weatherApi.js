// Function to get location suggestions by name (Geocoding API)
export const getLocationSuggestions = async (query) => {
  if (!query) return [];
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`,
    );
    return response.data; // Array of location objects
  } catch (error) {
    return [];
  }
};
import axios from "axios";

// OpenWeatherMap API Key - Get yours from https://openweathermap.org/api
const API_KEY = "95be2fa59d13bfdd7abb0ee25477400e"; // Replace with your actual API key

const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Function to get weather data by latitude and longitude
export const getWeatherByCoords = async (lat, lon) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch weather");
  }
};

// Function to get weather data by city name
export const getWeatherByCity = async (city) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`,
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "City not found");
  }
};

// Function to get forecast data by coordinates (not used in simplified app)
export const getForecastByCoords = async (lat, lon) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch forecast",
    );
  }
};

// Function to get forecast data by city (not used in simplified app)
export const getForecastByCity = async (city) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`,
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "City not found");
  }
};
