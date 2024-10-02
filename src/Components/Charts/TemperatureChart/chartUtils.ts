import * as echarts from 'echarts/core';
import { TempForecastDatum } from '../../../OverviewController/types';
import { convertEpochToDay } from '../../../OverviewController/utils';

interface ChartColors {
  primary: string;
  red: string;
  blue: string;
}

export const createTempChartOptions = (
  data: TempForecastDatum[],
  colors: ChartColors
): echarts.EChartsCoreOption => {
  // Convert aggregated data to array format
  const chartData = data.map((item) => ({
    date: convertEpochToDay(item.dt, item.timezone, 'MM/DD'),
    minTemp: item.minTemp,
    maxTemp: item.maxTemp,
  }));

  // Calculate min and max values for the Y-axis
  const minY = Math.min(...chartData.map((item) => item.minTemp));
  const maxY = Math.max(...chartData.map((item) => item.maxTemp));

  return {
    title: {
      text: 'Temperature Over The Next Week (°C)',
      left: 'center',
      top: '20px',
      textStyle: {
        color: colors.primary,
      },
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        const data = params[0].data;
        const minTemp = data[1];
        const maxTemp = data[2];
        return `Lowest: ${minTemp}°C<br/>Highest: ${maxTemp}°C`;
      },
    },
    xAxis: {
      type: 'category',
      data: chartData.map((item) => item.date),
      axisLine: {
        lineStyle: {
          color: colors.primary,
        },
      },
      axisLabel: {
        color: colors.primary,
      },
    },
    yAxis: {
      type: 'value',
      min: Math.round(minY - 2),
      max: Math.round(maxY + 2),
      axisLabel: {
        color: colors.primary,
      },
    },
    series: [
      {
        name: 'Temperature Range',
        type: 'candlestick',
        barWidth: '10px',
        data: chartData.map((item) => [
          item.minTemp,
          item.maxTemp,
          item.minTemp,
          item.maxTemp,
        ]),
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 0.7, [
            { offset: 0, color: colors.red },
            { offset: 1, color: colors.blue },
          ]),
          color0: new echarts.graphic.LinearGradient(0, 0, 0, 0.7, [
            { offset: 0, color: colors.red },
            { offset: 1, color: colors.blue },
          ]),
          borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 0.7, [
            { offset: 0, color: colors.red },
            { offset: 1, color: colors.blue },
          ]),
          borderColor0: new echarts.graphic.LinearGradient(0, 0, 0, 0.7, [
            { offset: 0, color: colors.red },
            { offset: 1, color: colors.blue },
          ]),
        },
      },
    ],
  };
};
