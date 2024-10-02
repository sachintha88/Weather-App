import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import React, {
  memo,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { TempForecastDatum } from '../../../OverviewController/types';
import ThemeContext from '../../../Theme/ThemeContext';
import { createTempChartOptions } from './chartUtils';

interface TempChartProps {
  data?: TempForecastDatum[] | null;
}

const TempChart: React.FC<TempChartProps> = ({ data }) => {
  const { colors } = useContext(ThemeContext);
  const chartRef = useRef<ReactECharts>(null);
  const [options, setOptions] = useState<echarts.EChartsCoreOption>({});

  const memoizedOptions = useMemo(() => {
    const chartData = data || [];
    return createTempChartOptions(chartData, colors);
  }, [data, colors]);

  useEffect(() => {
    const initializeChart = () => {
      setOptions(memoizedOptions);

      const handleResize = () => {
        chartRef.current?.getEchartsInstance().resize();
      };

      window.addEventListener('resize', handleResize, { passive: true });

      return () => {
        const chartInstance = chartRef.current?.getEchartsInstance();
        if (chartInstance) {
          chartInstance.dispose();
        }
        window.removeEventListener('resize', handleResize);
      };
    };

    const cleanup = initializeChart();
    return cleanup;
  }, [data, colors]);

  return (
    <ReactECharts
      ref={chartRef}
      echarts={echarts}
      option={options}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default memo(TempChart);
