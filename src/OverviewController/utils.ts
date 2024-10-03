import { get, isEqual, map } from 'lodash';
import moment from 'moment-timezone';
import {
  CurrentWeatherData,
  DailyWeatherDatum,
  HourlyWeatherData,
  HourlyWeatherDatum,
  WeatherStatus,
} from './types';

/**
 * Transforms raw weather data and location data into a structured format.
 *
 * @param {unknown} weatherData - The raw weather data from the API.
 * @param {unknown} locationData - The raw location data from the API.
 * @returns {CurrentWeatherData | null} - The transformed weather data or null if input data is invalid.
 */
export const transformWeatherData = (
  weatherData: unknown,
  locationData: unknown
) => {
  if (!weatherData || !locationData) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const weather = weatherData as any;
  const location = locationData as any;
  const weatherMain = weather.current.weather[0].main;

  // Map unexpected values to 'Sunny' as a default
  const mappedWeather: WeatherStatus =
    weatherMain === 'Clouds' ||
    weatherMain === 'Rain' ||
    weatherMain === 'Sunny'
      ? weatherMain
      : 'Sunny';

  const importantWeatherData: CurrentWeatherData = {
    city: location.name,
    weather: mappedWeather,
    weatherDescription: weather.current.weather[0].description,
    temperature: weather.current.temp,
    humidity: weather.current.humidity,
    windSpeed: weather.current.wind_speed,
    cloudiness: weather.current.clouds,
    sunrise: weather.current.sunrise,
    sunset: weather.current.sunset,
    timezone: weather.timezone,
  };

  return importantWeatherData;
};

/**
 * Converts an epoch timestamp to a formatted date string in a specified timezone.
 *
 * @param {number} epoch - The epoch timestamp to convert.
 * @param {string} tz - The timezone to use for conversion.
 * @param {string} format - The format string for the output date.
 * @returns {string} - The formatted date string.
 */
export const convertEpochToDay = (
  epoch: number,
  tz: string,
  format: string
) => {
  return moment.unix(epoch).tz(tz).format(format);
};

/**
 * Extracts and transforms hourly weather data into a structured format.
 *
 * @param {HourlyWeatherData[]} hourly - The raw hourly weather data from the API.
 * @param {string} tz - The timezone to use for the data.
 * @returns {HourlyWeatherDatum[]} - The transformed hourly weather data.
 */
export const extractHourlyWeatherData = (
  hourly: HourlyWeatherData[],
  tz: string
): HourlyWeatherDatum[] => {
  return map(hourly, (hour) => ({
    dt: hour.dt,
    tz: tz,
    temp: hour.temp,
    clouds: hour.clouds,
    rain: hour.rain ? hour.rain['1h'] : 0,
    pop: hour.pop,
    windSpeed: hour.wind_speed,
  }));
};

/**
 * Extracts and transforms daily weather data into a structured format.
 *
 * @param {any[]} daily - The raw daily weather data from the API.
 * @param {string} tz - The timezone to use for the data.
 * @returns {DailyWeatherDatum[]} - The transformed daily weather data.
 */
export function extractDailyWeatherData(
  daily: any[],
  tz: string
): DailyWeatherDatum[] {
  return map(daily, (day) => ({
    dt: day.dt,
    tz: tz,
    weatherDesc: get(day, 'weather[0].description', null),
    summary: get(day, 'summary', null),
  }));
}

/**
 * Checks if a given timestamp corresponds to today's date.
 *
 * @param {number} timestamp - The epoch timestamp to check.
 * @returns {boolean} - True if the timestamp is today, false otherwise.
 */
export const isToday = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const today = new Date();
  return isEqual(
    [date.getDate(), date.getMonth(), date.getFullYear()],
    [today.getDate(), today.getMonth(), today.getFullYear()]
  );
};
