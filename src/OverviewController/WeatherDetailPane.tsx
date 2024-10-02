import { get, split } from 'lodash';
import { FC, memo } from 'react';
import {
  City,
  DetailedDescription,
  TempeGadget,
  Title,
  WeatherIconBox,
} from './StyledComponents';
import { CurrentWeatherData, WeatherDescriptionStatus } from './types';

interface WeatherDetailPaneProps {
  currentWeatherData: CurrentWeatherData | null;
}

const WeatherDetailPane: FC<WeatherDetailPaneProps> = ({
  currentWeatherData,
}) => {
  return (
    <>
      <WeatherIconBox
        weather={
          currentWeatherData?.weatherDescription ??
          WeatherDescriptionStatus.ClearSky
        }
      />
      <div style={{ marginRight: '20px' }}>
        <Title>Now</Title>
        <City>{currentWeatherData?.city}</City>
        <TempeGadget>
          {`${split(currentWeatherData?.temperature.toString(), '.')[0]}.`}
          <span>
            {`${get(split(currentWeatherData?.temperature.toString(), '.')[1], '0')}°C`}
          </span>
        </TempeGadget>
        <DetailedDescription>
          {currentWeatherData?.weatherDescription}
        </DetailedDescription>
      </div>
    </>
  );
};

export default memo(WeatherDetailPane);
