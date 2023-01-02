import React, { PropsWithChildren, useEffect } from 'react';
import { Header } from './header';
import { GoogleAnalyticsTag } from '../external/tracking-tags';

export const Layout: React.FC<PropsWithChildren> = (props) => {
  return (
    <div className="bg-black text-yellow-100">
      <GoogleAnalyticsTag />
      <div className="min-h-screen container mx-auto">
        <Header />
        <div className="px-4 pt-6">{props.children}</div>
      </div>
    </div>
  );
};
