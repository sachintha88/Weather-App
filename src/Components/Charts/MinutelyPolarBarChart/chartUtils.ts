import * as echarts from 'echarts';
import { map } from 'lodash';
import { MinutelyWeatherDatum } from '../../../OverviewController/types';
import { createLineShadowStyle, createShadowStyle } from '../chartUtils';

export const createMinutelyPolarBarChartOptions = (
  minutelyWeatherData: MinutelyWeatherDatum[],
  title: string | undefined,
  colors: { primary: string; blue: string }
): echarts.EChartOption => {
  return {
    title: {
      text: title,
      left: 'center',
      textStyle: createShadowStyle(colors.primary),
    },
    angleAxis: {
      type: 'category',
      data: map(minutelyWeatherData, (_, index) => `${index + 1} min`),
      axisLine: {
        lineStyle: {
          color: colors.primary, // White color for the x-axis line
        },
      },
      axisLabel: createShadowStyle(colors.primary),
      z: 10,
    },
    radiusAxis: {
      axisLine: {
        lineStyle: createLineShadowStyle(colors.primary),
      },
      axisLabel: createShadowStyle(colors.primary),
    },
    polar: {
      center: ['50%', '55%'], // Adjust the center of the polar chart
    },
    series: [
      {
        type: 'bar',
        data: map(minutelyWeatherData, 'precipitation'),
        coordinateSystem: 'polar',
        name: 'Precipitation',
        itemStyle: {
          color: colors.blue,
        },
        z: 1,
      },
    ],
  };
};
