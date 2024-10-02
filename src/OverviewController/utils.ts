import { get, isEqual, map } from 'lodash';
import moment from 'moment-timezone';
import {
  CurrentWeatherData,
  DailyWeatherDatum,
  HourlyWeatherData,
  HourlyWeatherDatum,
  WeatherStatus,
} from './types';

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

export const convertEpochToDay = (
  epoch: number,
  tz: string,
  format: string
) => {
  return moment.unix(epoch).tz(tz).format(format);
};

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

export const isToday = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const today = new Date();
  return isEqual(
    [date.getDate(), date.getMonth(), date.getFullYear()],
    [today.getDate(), today.getMonth(), today.getFullYear()]
  );
};
