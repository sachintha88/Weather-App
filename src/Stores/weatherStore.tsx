import { create } from 'zustand';
import {
  CurrentWeatherData,
  DailyWeatherDatum,
  HourlyWeatherDatum,
  LocationData,
  MinutelyWeatherDatum,
  TempForecastDatum,
} from '../OverviewController/types';

interface WeatherState {
  city: string | null;
  minutelyWeatherData: MinutelyWeatherDatum[] | null;
  hourlyWeatherData: HourlyWeatherDatum[] | null;
  dailyWeatherData: DailyWeatherDatum[] | null;
  tempForecastData: TempForecastDatum[] | null;
  currentWeatherData: CurrentWeatherData | null;
  locationData: LocationData | null;
  setCity: (city: string) => void;
  setMinutelyWeatherData: (data: MinutelyWeatherDatum[] | null) => void;
  setHourlyWeatherData: (data: HourlyWeatherDatum[] | null) => void;
  setDailyWeatherData: (data: DailyWeatherDatum[] | null) => void;
  setTempForecastData: (data: TempForecastDatum[] | null) => void;
  setCurrentWeatherData: (data: CurrentWeatherData | null) => void;
  setLocationData: (data: LocationData | null) => void;
}

export const useWeatherStore = create<WeatherState>((set) => ({
  minutelyWeatherData: null,
  hourlyWeatherData: null,
  dailyWeatherData: null,
  tempForecastData: null,
  currentWeatherData: null,
  locationData: null,
  city: null,
  setMinutelyWeatherData: (data) => set({ minutelyWeatherData: data }),
  setHourlyWeatherData: (data) => set({ hourlyWeatherData: data }),
  setDailyWeatherData: (data) => set({ dailyWeatherData: data }),
  setTempForecastData: (data) => set({ tempForecastData: data }),
  setCurrentWeatherData: (data) => set({ currentWeatherData: data }),
  setLocationData: (data) => set({ locationData: data }),
  setCity: (city) => set({ city }),
}));
