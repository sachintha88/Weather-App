import { FC } from 'react';
import HourlyPrecipitationChart from '../Components/Charts/HourlyPrecipitationChart/HourlyPrecipitationChart';
import MinutelyPolarBarChart from '../Components/Charts/MinutelyPolarBarChart/MinutelyPolarBarChart';
import TempChart from '../Components/Charts/TemperatureChart/TempChart';
import DayBox from '../Components/DayBox';
import { useWeatherStore } from '../Stores/weatherStore';
import {
  ColumnContainer,
  Container,
  FlexContainer,
  GlassBoxStyled,
  GlassBoxStyledStretch,
  MarginTopContainer,
  SidePaneContainer,
} from './overviewStyles';
import WeatherDetailsSidePane from './WeatherDeailsSidePane';
import WeatherDetailPane from './WeatherDetailPane';

interface OverviewViewProps {}

const OverviewView: FC<OverviewViewProps> = ({}: OverviewViewProps) => {
  const {
    minutelyWeatherData,
    hourlyWeatherData,
    dailyWeatherData,
    tempForecastData,
    currentWeatherData,
    locationData,
  } = useWeatherStore();

  return (
    <Container>
      <ColumnContainer>
        <FlexContainer>
          <GlassBoxStyled
            opacity={0.2}
            shadow={0.5}
            style={{ flexDirection: 'column', justifyContent: 'space-around' }}
          >
            <MarginTopContainer marginTop="50px">
              <WeatherDetailPane currentWeatherData={currentWeatherData} />
            </MarginTopContainer>
            <MarginTopContainer marginTop="10px">
              <GlassBoxStyledStretch opacity={0.1} shadow={0.2}>
                <WeatherDetailsSidePane
                  importantWeatherData={currentWeatherData}
                />
              </GlassBoxStyledStretch>
            </MarginTopContainer>
          </GlassBoxStyled>
          <GlassBoxStyledStretch opacity={0.2} shadow={0.5} minWidth="400px">
            <TempChart data={tempForecastData} />
          </GlassBoxStyledStretch>
          <GlassBoxStyledStretch
            opacity={0.2}
            shadow={0.5}
            minWidth="400px"
            style={{ maxWidth: '800px' }}
          >
            <iframe
              width="100%"
              height="100%"
              src={`https://maps.google.com/maps?q=${locationData?.lat},${locationData?.lon}&z=10&output=embed`}
            />
          </GlassBoxStyledStretch>
        </FlexContainer>
        <FlexContainer style={{ marginTop: '20px' }}>
          <GlassBoxStyledStretch opacity={0.2} shadow={0.5} flex="1">
            <MinutelyPolarBarChart
              minutelyWeatherData={minutelyWeatherData ?? []}
              title="Minutely Precipitation Over The Next Hour"
            />
          </GlassBoxStyledStretch>
          <GlassBoxStyledStretch opacity={0.2} shadow={0.5} flex="2">
            <HourlyPrecipitationChart
              weatherData={hourlyWeatherData ?? []}
              title="Next 48 Hours"
            />
          </GlassBoxStyledStretch>
        </FlexContainer>
      </ColumnContainer>
      <SidePaneContainer>
        <GlassBoxStyled
          opacity={0.2}
          shadow={0.5}
          style={{ flexDirection: 'column', height: '100%' }}
        >
          {dailyWeatherData?.map((dayData) => (
            <DayBox key={dayData.dt} dailyWeatherData={dayData} />
          ))}
        </GlassBoxStyled>
      </SidePaneContainer>
    </Container>
  );
};

export default OverviewView;
