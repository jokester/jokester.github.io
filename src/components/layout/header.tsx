import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { TypedRoutes } from '../../config/routes';
import { bcss, SiteMeta } from '../../config/const';

const linkClass = bcss({});

const SectionLink: React.FC<PropsWithChildren<{ path: string; className?: string }>> = (props) => {
  const { pathname } = useRouter();
  return (
    <Link
      href={props.path}
      className={classNames(props.className ?? '', {
        ['text-yellow-200']: props.path !== TypedRoutes.index && pathname.startsWith(props.path),
      })}
    >
      {props.children}
    </Link>
  );
};

export const Header: React.FC = () => {
  return (
    <div className="px-2 sm:px-4 py-1 flex items-center bg-gray-900 space-x-3 text-sm">
      <SectionLink className="hidden text-lg" path={TypedRoutes.index}>
        {SiteMeta.siteTitleShorter}
      </SectionLink>
      <SectionLink className="inline-block sm:hidden text sm:text-lg" path={TypedRoutes.index}>
        {SiteMeta.siteTitleShort}
      </SectionLink>
      <SectionLink className="hidden sm:inline-block text-lg" path={TypedRoutes.index}>
        {SiteMeta.siteTitle}
      </SectionLink>
      <span>|</span>
      <SectionLink path={TypedRoutes.posts.index}>/posts</SectionLink>
      <SectionLink path="/demos">/demos</SectionLink>
      <SectionLink path="/works">/works</SectionLink>
      <SectionLink path={TypedRoutes.about.me}>/about</SectionLink>
    </div>
  );
};
