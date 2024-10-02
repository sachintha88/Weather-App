import { Col, Row } from 'antd';
import { FC } from 'react';
import IconPair from '../Components/IconPair';
import { CurrentWeatherData } from './types';
import { convertEpochToDay } from './utils';

interface WeatherDetailsSidePaneProps {
  importantWeatherData: CurrentWeatherData | null;
}

const WeatherDetailsSidePane: FC<WeatherDetailsSidePaneProps> = ({
  importantWeatherData,
}) => {
  return (
    <div style={{ margin: '20px', width: '100%' }}>
      <Row gutter={16}>
        <Col span={12}>
          <IconPair
            type="humidity"
            value={`${importantWeatherData?.humidity}%`}
          />
        </Col>
        <Col span={12}>
          <IconPair
            type="wind"
            value={`${importantWeatherData?.windSpeed}m/s`}
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <IconPair
            type="cloudy"
            value={`${importantWeatherData?.cloudiness}%`}
          />
        </Col>
        <Col span={12}>
          <IconPair
            type="sunrise"
            value={
              importantWeatherData?.sunrise && importantWeatherData?.timezone
                ? convertEpochToDay(
                    importantWeatherData.sunrise,
                    importantWeatherData.timezone,
                    'hh:mm A'
                  )
                : 'N/A'
            }
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <IconPair
            type="sunset"
            value={
              importantWeatherData?.sunset && importantWeatherData?.timezone
                ? convertEpochToDay(
                    importantWeatherData.sunset,
                    importantWeatherData.timezone,
                    'hh:mm A'
                  )
                : 'N/A'
            }
          />
        </Col>
      </Row>
    </div>
  );
};

export default WeatherDetailsSidePane;
