interface ShadowSettings {
  color: string;
  textShadowColor: string;
  textShadowBlur: number;
  textShadowOffsetX: number;
  textShadowOffsetY: number;
}

export const createShadowStyle = (color: string): ShadowSettings => {
  return {
    color,
    textShadowColor: '#000000',
    textShadowBlur: 1,
    textShadowOffsetX: 1,
    textShadowOffsetY: 1,
  };
};

interface LineShadowSettings {
  color?: string;
  shadowColor: string;
  shadowBlur: number;
  shadowOffsetX: number;
  shadowOffsetY: number;
}

export const createLineShadowStyle = (color?: string): LineShadowSettings => {
  return {
    color: color ?? undefined,
    shadowColor: 'rgba(0, 0, 0, 0.5)', // Shadow color
    shadowBlur: 4, // Shadow blur
    shadowOffsetX: 1, // Shadow offset X
    shadowOffsetY: 1, // Shadow offset Y
  };
};
