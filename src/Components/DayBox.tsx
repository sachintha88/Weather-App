import { InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { FC, memo, useContext, useMemo } from 'react';
import styled from 'styled-components';
import {
  GlassBox,
  WeatherIconBoxSmall,
} from '../OverviewController/StyledComponents';
import { DailyWeatherDatum } from '../OverviewController/types';
import { isToday } from '../OverviewController/utils';
import ThemeContext from '../Theme/ThemeContext';

interface DayBoxProps {
  dailyWeatherData: DailyWeatherDatum | null;
}

const DateLabel = styled.div`
  color: ${(props) => props.color};
  font-size: 24px;
  margin-left: 10px;
  display: flex;
  align-items: center;
`;

const DayBox: FC<DayBoxProps> = memo(({ dailyWeatherData }) => {
  const { colors } = useContext(ThemeContext);

  const dateLabel = useMemo(() => {
    if (!dailyWeatherData || !dailyWeatherData.dt) return '';
    return isToday(dailyWeatherData.dt)
      ? 'Today'
      : new Date(dailyWeatherData.dt * 1000).toLocaleString('en-US', {
          weekday: 'long',
        });
  }, [dailyWeatherData, isToday]);

  return (
    <GlassBox opacity={0.2} shadow={0.5} style={{ height: '100%' }}>
      <WeatherIconBoxSmall desc={dailyWeatherData?.weatherDesc ?? ''} />
      <DateLabel color={colors.primary}>
        {dateLabel}
        {dailyWeatherData?.summary && (
          <Tooltip title={dailyWeatherData.summary}>
            <InfoCircleOutlined
              style={{ marginLeft: '8px', color: colors.primary }}
            />
          </Tooltip>
        )}
      </DateLabel>
    </GlassBox>
  );
});

export default DayBox;
