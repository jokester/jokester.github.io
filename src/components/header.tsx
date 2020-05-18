import React from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { TypedRoutes } from '../config/routes';

const SectionLink: React.FC<{ path: string }> = (props) => {
  const { pathname } = useRouter();
  return (
    <Link href={props.path}>
      <span className={classNames('', pathname === props.path ? 'text-yellow-200' : '')}>{props.children}</span>
    </Link>
  );
};

export const Header: React.FC = () => {
  return (
    <div className="px-4 py-2 flex items-center bg-gray-900 space-x-4">
      <SectionLink path={TypedRoutes.index}>LOGO</SectionLink>
      <SectionLink path={TypedRoutes.posts.index}>/posts</SectionLink>
      <SectionLink path={TypedRoutes.works}>/works</SectionLink>
      <SectionLink path={TypedRoutes.about.me}>/me</SectionLink>
    </div>
  );
};
