import React from 'react';
import { isDevBuild } from '../../config/build-env';

export const OnlyInDev: React.FC<{ children: React.ReactNode }> = (props) => {
  return (isDevBuild ? props.children : null) as React.ReactElement;
};
