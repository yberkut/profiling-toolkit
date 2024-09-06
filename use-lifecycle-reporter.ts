import { useEffect } from 'react';

import { logMessageToConsole } from './utils';
import { ColorScheme } from './types';

export interface UseLifecycleReporterProps {
  id: string;
  colorScheme?: ColorScheme;
}

const DEBUG = false;

export const useLifecycleReporter = ({ id, colorScheme }: UseLifecycleReporterProps) => {
  useEffect(() => {
    if (DEBUG) {
      logMessageToConsole({
        id, message: 'MOUNT', colorScheme, hide: false,
      });
    }

    return () => {
      if (DEBUG) {
        logMessageToConsole({
          id, message: 'UNMOUNT', colorScheme, hide: false,
        });
      }
    };
  }, [colorScheme, id]);

  if (DEBUG) {
    logMessageToConsole({
      id, message: 'RENDER', colorScheme, hide: false,
    });
  }
};
