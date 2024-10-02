// Weather status types using enum
export enum WeatherStatus {
  Clouds = 'Clouds',
  Rain = 'Rain',
  Sunny = 'Sunny',
}

// Weather description status using enum
export enum WeatherDescriptionStatus {
  ClearSky = 'clear sky',
  FewClouds = 'few clouds',
  ScatteredClouds = 'scattered clouds',
  BrokenClouds = 'broken clouds',
  OvercastClouds = 'overcast clouds',
  LightRain = 'light rain',
  ModerateRain = 'moderate rain',
  Thunderstorm = 'thunderstorm',
  Snow = 'snow',
  Mist = 'mist',
}

// Interface for weather status
export interface WeatherStatusInterface {
  weather: WeatherDescriptionStatus;
}

// Type for current weather data
export interface CurrentWeatherData {
  city: string;
  weather: WeatherStatus;
  weatherDescription: WeatherDescriptionStatus;
  temperature: number;
  humidity: number;
  windSpeed: number;
  cloudiness: number;
  sunrise: number;
  sunset: number;
  timezone: string;
}

// Type for temperature forecast data
export interface TempForecastDatum {
  dt: number;
  timezone: string;
  maxTemp: number;
  minTemp: number;
}

// Interface for geocode response
export interface GeoCodeResponse {
  lat: number;
  lon: number;
  [key: string]: any;
}

// Interface for weather data response
export interface WeatherDataResponse {
  daily: Array<{
    dt: number;
    clouds: number;
    weather: Array<{ main: string }>;
    temp: { min: number; max: number };
  }>;
  timezone: string;
  [key: string]: any;
}

// Type for location data
export interface LocationData {
  lat: number;
  lon: number;
  timezone: string;
}

// Type for minutely weather data
export interface MinutelyWeatherDatum {
  dt: number;
  precipitation: number;
}

// Interface for hourly weather data
export interface HourlyWeatherData {
  clouds: number;
  dt: number;
  pop: number;
  rain?: { '1h': number };
  temp: number;
  wind_speed: number;
}

// Interface for hourly weather datum
export interface HourlyWeatherDatum {
  clouds: number;
  dt: number;
  tz: string;
  pop: number;
  rain: number | null;
  temp: number;
  windSpeed: number;
}

// Interface for daily weather datum
export interface DailyWeatherDatum {
  dt: number;
  tz: string;
  weatherDesc: string | null;
  summary: string | null;
}
