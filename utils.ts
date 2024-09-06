import {
  ColorScheme,
  LogMessageToConsole,
  LogProfilerDataToConsole,
  ProfilerStyles,
} from './types';

export const getProfilerColors = (colorScheme?: ColorScheme): ProfilerStyles => {
  const scheme = colorScheme ?? (Math.floor(Math.random() * 10) + 1) as ColorScheme; // random number from 1 to 10

  switch (scheme) {
    case 1:
      return { color: '#fff', bgColor: '#00796B' };
    case 2:
      return { color: '#000', bgColor: '#64B5F6' };
    case 3:
      return { color: '#000', bgColor: '#AFB42B' };
    case 4:
      return { color: '#000', bgColor: '#81C784' };
    case 5:
      return { color: '#fff', bgColor: '#AD1457' };
    case 6:
      return { color: '#fff', bgColor: '#BF360C' };
    case 7:
      return { color: '#fff', bgColor: '#512DA8' };
    case 8:
      return { color: '#fff', bgColor: '#33691E' }; // Light Green 900
    case 9:
      return { color: '#000', bgColor: '#81C784' }; // Green 300
    case 10:
      return { color: '#fff', bgColor: '#4E342E' }; // Brown 800
    default:
      return { color: '#fff', bgColor: '#546E7A' }; // Blue Gray 600
  }
};

export const getStyle = ({ colorScheme, styles }: { colorScheme?: ColorScheme, styles?: ProfilerStyles; }): string => {
  if (!colorScheme && styles) {
    const {
      color, bgColor, fontSize, fontWeight,
    } = styles || {};

    let stylesString: string;
    if (color) stylesString += `color: ${color};`;
    if (bgColor) stylesString += `background-color: ${bgColor};`;
    if (fontSize) stylesString += `font-size: ${fontSize};`;
    if (fontWeight) stylesString += `font-weight: ${fontWeight};`;

    return stylesString ?? '';
  }
  const { color, bgColor } = getProfilerColors(colorScheme);
  return `color: ${color}; background-color: ${bgColor}`;
};

export const logMessageToConsole: LogMessageToConsole = ({
  id, message, colorScheme, styles, hide = true,
}) => {
  // eslint-disable-next-line no-console
  if (!hide) console.debug('%c [%s] -- %s -- ', getStyle({ colorScheme, styles }), id, message);
};

export const logProfilerDataToConsole: LogProfilerDataToConsole = ({
  id,
  phase,
  startTime,
  commitTime,
  baseDuration,
  actualDuration,
  colorScheme,
  output = 'json',
}) => {
  let str: string;
  switch (output) {
    case 'json':
      str = JSON.stringify({
        id,
        phase,
        startTime,
        commitTime,
        baseDuration,
        actualDuration,
      });
      break;
    case 'verbose':
      str = ` Profiler [${id}] - ${phase} - actualDuration: ${actualDuration.toFixed(2)} ms `;
      break;
    case 'short':
    default:
      str = ` Profiler [${id}] - ${phase} - actualDuration: ${actualDuration.toFixed(2)} ms `;
      break;
  }

  // eslint-disable-next-line no-console
  console.debug(`%c${str}`, getStyle({ colorScheme }));
};
