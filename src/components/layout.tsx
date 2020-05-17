import React from 'react';
import { Header } from "./header";

export const Layout: React.FC = (props) => {
  return (
    <div>
      <Header />
     <div>{props.children}</div>
    </div>
  );
};
