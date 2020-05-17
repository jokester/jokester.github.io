import React from 'react';
import { Header } from "./header";

export const Layout: React.FC = (props) => {
  return (
    <div className="min-h-screen bg-black text-yellow-100">
      <Header />
     <div>{props.children}</div>
    </div>
  );
};
