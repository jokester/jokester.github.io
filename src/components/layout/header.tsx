import React from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { TypedRoutes } from '../../config/routes';
import { SiteMeta } from '../../config/const';

const SectionLink: React.FC<{ path: string; className?: string }> = (props) => {
  const { pathname } = useRouter();
  return (
    <Link href={props.path}>
      <a
        className={classNames(props.className ?? '', {
          ['text-yellow-200']: props.path !== TypedRoutes.index && pathname.startsWith(props.path),
        })}
      >
        {props.children}
      </a>
    </Link>
  );
};

export const Header: React.FC = () => {
  return (
    <div className="px-4 py-2 flex items-center bg-gray-900 space-x-4">
      <SectionLink className="sm:hidden" path={TypedRoutes.index}>
        {SiteMeta.siteTitleShort}
      </SectionLink>
      <SectionLink className="hidden sm:inline-block" path={TypedRoutes.index}>
        {SiteMeta.siteTitle}
      </SectionLink>
      <span>|</span>
      <SectionLink path={TypedRoutes.posts.index}>/posts</SectionLink>
      <SectionLink path={TypedRoutes.works}>/works</SectionLink>
      <SectionLink path={TypedRoutes.about.me}>/about</SectionLink>
    </div>
  );
};
