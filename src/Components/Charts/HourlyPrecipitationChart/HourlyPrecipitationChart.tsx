import * as echarts from 'echarts/core';
import React, { memo, useContext, useEffect, useRef } from 'react';
import { HourlyWeatherDatum } from '../../../OverviewController/types';
import ThemeContext from '../../../Theme/ThemeContext';
import { createHourlyPrecipitationChartOptions } from './chartUtils';

interface HourlyPrecipitationChartProps {
  weatherData: HourlyWeatherDatum[];
  title?: string;
}

const HourlyPrecipitationChart: React.FC<HourlyPrecipitationChartProps> = ({
  weatherData,
  title,
}) => {
  const { colors } = useContext(ThemeContext);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeChart = () => {
      if (chartContainerRef.current) {
        const chartInstance = echarts.init(chartContainerRef.current);
        const chartOptions = createHourlyPrecipitationChartOptions(
          weatherData,
          title,
          colors
        );
        chartInstance.setOption(chartOptions);

        const handleResize = () => {
          chartInstance.resize();
        };

        window.addEventListener('resize', handleResize, { passive: true });

        return () => {
          chartInstance.dispose();
          window.removeEventListener('resize', handleResize);
        };
      }
    };

    const cleanup = initializeChart();
    return cleanup;
  }, [weatherData, title, colors]);

  return (
    <div ref={chartContainerRef} style={{ width: '100%', height: '100%' }} />
  );
};

export default memo(HourlyPrecipitationChart);
