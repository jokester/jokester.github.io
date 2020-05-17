import React from 'react';
import { Link } from 'gatsby';
import { Location } from '@reach/router';
import { TypedRouters } from '../config/routes';
import classNames from 'classnames';

const SectionLink: React.FC<{ path: string }> = (props) => {
  return (
    <Location>
      {(locationCtx) => (
        <Link
          to={props.path}
          className={classNames('', locationCtx.location.pathname === props.path ? 'text-yellow-200' : '')}
        >
          {props.children}
        </Link>
      )}
    </Location>
  );
};

export const Header: React.FC = () => {
  return (
    <div className="px-4 py-2 flex items-center bg-gray-900 space-x-4">
      <SectionLink path={TypedRouters.index}>LOGO</SectionLink>
      <SectionLink path={TypedRouters.posts.index}>/posts</SectionLink>
      <SectionLink path={TypedRouters.works}>/works</SectionLink>
      <SectionLink path={TypedRouters.about.me}>/me</SectionLink>
    </div>
  );
};
