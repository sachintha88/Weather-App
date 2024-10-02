import { Spin } from 'antd';
import styled from 'styled-components';
import { WeatherStatusInterface } from './types';

const getBackgroundImage = (weather: string) => {
  switch (weather) {
    case 'overcast clouds':
    case 'broken clouds':
      return `url('src/assets/clouds_background.jpg')`;
    case 'light rain':
    case 'moderate rain':
    case 'thunderstorm':
      return `url('src/assets/rainy_background.jpg')`;
    default:
      return `url('src/assets/sunny_background.jpg')`;
  }
};

export const WeatherBox = styled.div<WeatherStatusInterface>`
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  // center the div
  margin: 10px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  //flex box
  display: inline-flex;
  flex-direction: column;

  background-image: ${(props) => getBackgroundImage(props.weather)};
  // strech the background image to cover the whole div
  background-size: cover;
`;

export const WeatherIconBox = styled.div<WeatherStatusInterface>`
  display: flex;
  z-index: 10000;
  justify-content: center;
  width: 150px;
  height: 150px;
  margin-top: 20px;
  background-image: ${(props) => {
    const weather = props.weather ?? 'clear sky';
    return `url('src/assets/weatherIcons/${weather}.png')`;
  }};
  background-size: cover;
`;

export const City = styled.div`
  font-size: 50px;
  color: white;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
  margin-left: 20px;
`;

// Interface for glass effect properties
export interface GlassEffectProps {
  width?: number;
  height?: number;
  opacity?: number;
  shadow?: number;
}

export const GlassBox = styled.div<GlassEffectProps>`
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
  background: ${(props) => `rgba(190, 190, 190, ${props.opacity})`};
  display: flex;
  padding: 20px;
  margin-left: 20px;
  margin-bottom: 10px;
  backdrop-filter: blur(10px);
  border-radius: 10px;
  box-shadow: ${(props) => `0 0 10px rgba(0, 0, 0, ${props.shadow ?? 0.1})`};
`;

export const TempeGadget = styled.div`
  font-size: 70px;
  color: white;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
  margin-left: 10px;
  // make decimal numbers smaller
  span {
    font-size: 30px;
  }
`;

export const DetailedDescription = styled.div`
  font-size: 20px;
  color: white;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
  margin-left: 20px;
`;

export const Title = DetailedDescription;

export const WeatherIconBoxSmall = styled.div<{ desc: string }>`
  display: flex;
  z-index: 10000;
  width: 80px;
  height: 80px;
  margin-top: -20px;
  margin-left: -40px;
  background-image: ${(props) => {
    const weather = props.desc ?? 'clear sky';
    return `url('src/assets/weatherIcons/${weather}.png')`;
  }};
  background-size: cover;
`;

export const FormContainer = styled.div`
  width: 600px;
`;

export const CenteredContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const LoadingContainer = styled(Spin)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 200px;
  left: 50%;
`;

export const OverviewContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
