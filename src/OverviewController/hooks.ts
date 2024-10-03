import { useQuery } from '@tanstack/react-query';
import { useWeatherStore } from '../Stores/weatherStore';
import { fetchWeatherData } from './apiUtils';
import {
  extractDailyWeatherData,
  extractHourlyWeatherData,
  transformWeatherData,
} from './utils';

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
