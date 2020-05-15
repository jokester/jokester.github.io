import React from 'react';

export const Layout: React.FC = (props) => {
  return (
    <div>
      <h1>TITLE</h1>
      <div>{props.children}</div>
    </div>
  );
};
