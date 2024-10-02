import axios from 'axios';

import { useQuery } from '@tanstack/react-query';
import { useWeatherStore } from '../Stores/weatherStore';
import { GeoCodeResponse, WeatherDataResponse } from './types';
import {
  extractDailyWeatherData,
  extractHourlyWeatherData,
  transformWeatherData,
} from './utils';

const fetchGeoCode = async (city: string, apiKey: string) => {
  const geoCodeResponse = await axios.get<GeoCodeResponse[]>(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid${apiKey}`
  );

  const firstMatch = geoCodeResponse.data[0];
  if (!firstMatch) {
    throw new Error('No matching location found');
  }
  return firstMatch;
};

const fetchWeatherData = async (city: string) => {
  console.log('fetchWeatherData called');
  const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
  if (!apiKey) {
    throw new Error('API key is missing');
  }

  const location = await fetchGeoCode(city, apiKey);
  const { lon, lat } = location;
  const response = await axios.get<WeatherDataResponse>(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid${apiKey}`
  );
  return { weatherData: response.data, location };
};

const useWeatherData = () => {
  const city = useWeatherStore((state) => state.city);

  const setMinutelyWeatherData = useWeatherStore(
    (state) => state.setMinutelyWeatherData
  );
  const setHourlyWeatherData = useWeatherStore(
    (state) => state.setHourlyWeatherData
  );
  const setDailyWeatherData = useWeatherStore(
    (state) => state.setDailyWeatherData
  );
  const setTempForecastData = useWeatherStore(
    (state) => state.setTempForecastData
  );
  const setCurrentWeatherData = useWeatherStore(
    (state) => state.setCurrentWeatherData
  );
  const setLocationData = useWeatherStore((state) => state.setLocationData);

  const { error, isLoading, refetch } = useQuery(
    ['weatherData'],
    () => fetchWeatherData(city ?? ''),
    {
      enabled: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: 120000, // 2 minutes
      onSuccess: ({ weatherData, location }) => {
        const { minutely, hourly, daily } = weatherData;
        const { lon, lat } = location;
        const { timezone } = weatherData;

        setCurrentWeatherData(transformWeatherData(weatherData, location));

        setTempForecastData(
          weatherData.daily.map((dailyForecast) => ({
            dt: dailyForecast.dt,
            timezone,
            minTemp: dailyForecast.temp.min,
            maxTemp: dailyForecast.temp.max,
          }))
        );

        setLocationData({ lon, lat, timezone });
        setMinutelyWeatherData(minutely);
        setHourlyWeatherData(extractHourlyWeatherData(hourly, timezone));
        setDailyWeatherData(extractDailyWeatherData(daily, timezone));
      },
      onError: () => {
        console.error('Failed to fetch weather data. Please try again later.');
      },
    }
  );

  return {
    loading: isLoading,
    error,
    getWeatherData: refetch,
  };
};

export default useWeatherData;
