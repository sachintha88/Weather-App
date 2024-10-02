import axios from 'axios';
import { FC, useCallback, useEffect, useState } from 'react';
import InputPair from '../Components/InputPair';
import { useWeatherStore } from '../Stores/weatherStore';
import useWeatherData from './hooks';
import OverviewView from './OverviewView';
import {
  CenteredContainer,
  LoadingContainer,
  OverviewContainer,
  WeatherBox,
} from './StyledComponents';
import { WeatherDescriptionStatus } from './types';

interface OverviewControllerProps {}

const OverviewController: FC<
  OverviewControllerProps
> = ({}: OverviewControllerProps) => {
  const [fetchClientWeatherData, setFetchClientWeatherData] = useState(false);

  const { currentWeatherData, city, setCity } = useWeatherStore();

  const onSubmit = (
    event:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    getWeatherData();
  };

  const { loading, getWeatherData } = useWeatherData();

  const handleCityChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCity(e.target.value);
    },
    [setCity]
  );

  useEffect(() => {
    const fetchCity = async () => {
      if (city === null) {
        const apiKey = import.meta.env.VITE_GEO_API_KEY;
        if (!apiKey) {
          throw new Error('API key is missing');
        }

        try {
          const response = await axios.get(
            `https://api.geoapify.com/v1/ipinfo?apiKey${apiKey}`
          );
          const data = response.data;
          setCity(data.city.name);
          setFetchClientWeatherData(true);
        } catch (error) {
          console.error('Error fetching IP info:', error);
        }
      }
    };

    fetchCity();
  }, [city, getWeatherData]);

  useEffect(() => {
    if (fetchClientWeatherData) {
      getWeatherData();
      setFetchClientWeatherData(false);
    }
  }, [fetchClientWeatherData, getWeatherData]);

  return (
    <>
      <WeatherBox
        weather={
          currentWeatherData?.weatherDescription ??
          WeatherDescriptionStatus.ClearSky
        }
      >
        <CenteredContainer>
          <InputPair
            value={city}
            onChange={handleCityChange}
            onSubmit={onSubmit}
            placeholder={'Enter city name'}
            buttonText={'Get Weather'}
            width="500px"
          />
        </CenteredContainer>
        <OverviewContainer>
          {loading ? (
            <LoadingContainer
              spinning={loading}
              tip="Loading data, please wait..."
              size="large"
            />
          ) : (
            <OverviewView />
          )}
        </OverviewContainer>
      </WeatherBox>
    </>
  );
};

export default OverviewController;
