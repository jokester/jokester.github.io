import React, { PropsWithChildren, useEffect } from 'react';
import { Header } from './header';
import { GoogleAnalyticsTag } from '../external/tracking-tags';

interface LayoutProps {}

export const Layout: React.FC<PropsWithChildren<LayoutProps>> = (props) => {
  return (
    <div className="bg-black text-yellow-100">
      <GoogleAnalyticsTag />
      <Header />
      <div className="min-h-screen container mx-auto">
        <div className="px-4 pt-6">{props.children}</div>
      </div>
    </div>
  );
};
