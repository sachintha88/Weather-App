import * as echarts from 'echarts/core';
import { HourlyWeatherDatum } from '../../../OverviewController/types';
import { convertEpochToDay } from '../../../OverviewController/utils';
import { createLineShadowStyle, createShadowStyle } from '../chartUtils';

interface ChartColors {
  primary: string;
  blue: string;
  yellow: string;
  grey: string;
}

export const createHourlyPrecipitationChartOptions = (
  weatherData: HourlyWeatherDatum[],
  title: string | undefined,
  colors: ChartColors
): echarts.EChartsCoreOption => {
  const { primary, blue, yellow, grey } = colors;

  return {
    title: {
      text: title,
      left: 'center',
      textStyle: createShadowStyle(primary),
    },
    tooltip: {
      trigger: 'axis' as 'axis', // Explicitly specify the type
    },
    legend: {
      data: ['Rain', 'Wind Speed', 'Clouds'],
      textStyle: {
        color: primary,
        textShadowColor: '#000000',
        textShadowBlur: 4,
        textShadowOffsetX: 2,
        textShadowOffsetY: 2,
      },
      bottom: 0,
    },
    xAxis: {
      type: 'category' as 'category', // Explicitly specify the type
      data: weatherData.map((data) =>
        convertEpochToDay(data.dt, data.tz, 'MM/DD HH:mm')
      ),
      axisLine: {
        lineStyle: {
          color: primary,
        },
      },
      axisLabel: createShadowStyle(primary),
    },
    yAxis: [
      {
        type: 'value' as 'value', // Explicitly specify the type
        name: 'Rain (mm)',
        position: 'right',
        nameTextStyle: createShadowStyle(blue),
        axisLine: {
          lineStyle: createShadowStyle(blue), // Blue color for the Rain axis
        },
        axisLabel: createShadowStyle(blue),
      },
      {
        type: 'value' as 'value', // Explicitly specify the type
        name: 'Wind (m/s)',
        offset: 80,
        position: 'right',
        nameTextStyle: createShadowStyle(yellow),
        axisLine: {
          lineStyle: createShadowStyle(yellow), // Yellow color for the Wind Speed axis
        },
        axisLabel: createShadowStyle(yellow),
      },
      {
        type: 'value' as 'value', // Explicitly specify the type
        name: 'Clouds (%)',
        position: 'left',
        offset: 80,
        nameTextStyle: createShadowStyle(grey),
        axisLine: {
          lineStyle: createShadowStyle(grey),
        },
        axisLabel: createShadowStyle(grey),
      },
    ],
    series: [
      {
        name: 'Rain',
        type: 'bar', // Changed to bar chart
        showSymbol: false,
        data: weatherData.map((data) => data.rain ?? 0),
        yAxisIndex: 0,
        smooth: true,
        itemStyle: {
          color: blue,
        },
        lineStyle: createLineShadowStyle(),
      },
      {
        name: 'Wind Speed',
        type: 'line',
        showSymbol: false,
        data: weatherData.map((data) => data.windSpeed),
        yAxisIndex: 1,
        smooth: true,
        itemStyle: {
          color: yellow,
        },
        lineStyle: createLineShadowStyle(),
      },
      {
        name: 'Clouds',
        type: 'line',
        showSymbol: false,
        data: weatherData.map((data) => data.clouds),
        yAxisIndex: 2,
        smooth: true,
        itemStyle: {
          color: grey,
        },
        lineStyle: createLineShadowStyle(),
      },
    ],
  };
};
