import * as echarts from 'echarts';
import React, { useContext, useEffect, useRef } from 'react';
import { MinutelyWeatherDatum } from '../../../OverviewController/types';
import ThemeContext from '../../../Theme/ThemeContext';
import { createMinutelyPolarBarChartOptions } from './chartUtils';

interface MinutelyPolarBarChartProps {
  minutelyWeatherData: MinutelyWeatherDatum[];
  title?: string;
}

const MinutelyPolarBarChart: React.FC<MinutelyPolarBarChartProps> = ({
  minutelyWeatherData,
  title,
}) => {
  const { colors } = useContext(ThemeContext);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    const initializeChart = () => {
      if (chartContainerRef.current) {
        const chartInstance = echarts.init(chartContainerRef.current);
        chartInstanceRef.current = chartInstance;

        const chartOptions = createMinutelyPolarBarChartOptions(
          minutelyWeatherData,
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
  }, [minutelyWeatherData, title, colors]);

  return (
    <div ref={chartContainerRef} style={{ width: '100%', height: '100%' }} />
  );
};

export default MinutelyPolarBarChart;
