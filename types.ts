import { CSSProperties } from 'react';

export type ColorScheme = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface ProfilerStyles {
  color?: CSSProperties['color'];
  bgColor?: CSSProperties['backgroundColor'];
  fontSize?: CSSProperties['fontSize'];
  fontWeight?: CSSProperties['fontWeight'];
}

export interface LogProfilerDataToConsoleInput {
  id: string;
  phase: 'mount' | 'update';
  actualDuration: number;
  baseDuration?: number;
  startTime?: number;
  commitTime?: number;
  colorScheme?: ColorScheme;
  output?: 'short' | 'verbose' | 'json';
}

export type LogProfilerDataToConsole = (input: LogProfilerDataToConsoleInput) => void;

export interface LogMessageToConsoleInput {
  id: string;
  message: string;
  colorScheme?: ColorScheme;
  styles?: ProfilerStyles;
  hide?: boolean;
}

export type LogMessageToConsole = (input: LogMessageToConsoleInput) => void;
