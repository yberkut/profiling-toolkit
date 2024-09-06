import React, {
  Fragment,
  Profiler,
  ProfilerOnRenderCallback,
  ReactNode,
  useCallback,
} from 'react';

import { ColorScheme } from './types';
import { logProfilerDataToConsole } from './utils';

export interface ElementProfilerProps {
  id: string;
  children?: ReactNode;
  colorScheme?: ColorScheme;
}

const whiteList = null; // ['LoggedInGuard-AuthGuard', 'LoggedOutGuard-AuthGuard', 'Auth0Provider'];

const shouldProfile = (id: string) => !whiteList || whiteList.includes(id);

export const ElementProfiler = ({ id, children, colorScheme }: ElementProfilerProps) => {
  const handleRender = useCallback<ProfilerOnRenderCallback>((
    id,
    phase,
    startTime,
    commitTime,
    baseDuration,
    actualDuration
  ) => logProfilerDataToConsole({
    id, phase, startTime, commitTime, baseDuration, actualDuration, colorScheme, output: 'short',
  }), [colorScheme]);

  return (
    <Fragment>
      {shouldProfile(id) ? <Profiler key={`profiler-${id}`} id={id} onRender={handleRender}>{children}</Profiler> : children}
    </Fragment>
  );
};
