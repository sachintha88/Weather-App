import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { FC, useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import InputPair from '../Components/InputPair';
import { useWeatherStore } from '../Stores/weatherStore';
import useWeatherData from './hooks';
import OverviewView from './OverviewView';
import {
  CenteredContainer,
  FormContainer,
  LoadingContainer,
  OverviewContainer,
  WeatherBox,
} from './StyledComponents';
import { WeatherDescriptionStatus } from './types';

const citySchema = z.object({
  city: z.string().min(1, { message: 'City name is required' }),
});

type CityInput = z.infer<typeof citySchema>;

interface OverviewControllerProps {}

const OverviewController: FC<
  OverviewControllerProps
> = ({}: OverviewControllerProps) => {
  const [fetchClientWeatherData, setFetchClientWeatherData] = useState(false);

  const { currentWeatherData, city, setCity } = useWeatherStore();

  const { register, handleSubmit } = useForm<CityInput>({
    resolver: zodResolver(citySchema),
  });

  const onSubmit: SubmitHandler<CityInput> = () => {
    getWeatherData();
  };

  const { loading, getWeatherData, setLoading } = useWeatherData();

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

        setLoading(true);
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
          <FormContainer>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputPair
                {...register('city')}
                value={city}
                onChange={handleCityChange}
                onSubmit={getWeatherData}
                placeholder={'Enter city name'}
                buttonText={'Get Weather'}
              />
            </form>
          </FormContainer>
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
