import axios from 'axios';
import { GeoCodeResponse, WeatherDataResponse } from './types';

/**
 * Fetches geocode data for a given city.
 * @param {string} city - The city name.
 * @param {string} apiKey - The API key for OpenWeatherMap.
 * @returns {Promise<GeoCodeResponse>} - The geocode data.
 * @throws {Error} - If no matching location is found or the API request fails.
 */
export const fetchGeoCode = async (
  city: string,
  apiKey: string
): Promise<GeoCodeResponse> => {
  try {
    const geoCodeResponse = await axios.get<GeoCodeResponse[]>(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid${apiKey}`
    );

    const firstMatch = geoCodeResponse.data[0];
    if (!firstMatch) {
      throw new Error('No matching location found');
    }
    return firstMatch;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch geocode data: ${error.message}`);
    } else {
      throw new Error('Failed to fetch geocode data: Unknown error');
    }
  }
};

/**
 * Fetches weather data for a given city.
 * @param {string} city - The city name.
 * @returns {Promise<{ weatherData: WeatherDataResponse, location: GeoCodeResponse }>} - The weather data and location.
 * @throws {Error} - If the API key is missing or the API request fails.
 */
export const fetchWeatherData = async (
  city: string
): Promise<{ weatherData: WeatherDataResponse; location: GeoCodeResponse }> => {
  console.log('fetchWeatherData called');
  const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
  if (!apiKey) {
    throw new Error('API key is missing');
  }

  const location = await fetchGeoCode(city, apiKey);
  const { lon, lat } = location;
  try {
    const response = await axios.get<WeatherDataResponse>(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid${apiKey}`
    );
    return { weatherData: response.data, location };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch weather data: ${error.message}`);
    } else {
      throw new Error('Failed to fetch weather data: Unknown error');
    }
  }
};
