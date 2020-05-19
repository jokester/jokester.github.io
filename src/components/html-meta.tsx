import React from 'react';
import { SiteMeta } from '../config/const';
import Head from 'next/head';

export const HtmlMeta: React.FC<{ title: string; canonicalPath: string }> = (props) => {
  /**
   * TODO: ogp / keywords / etc
   */
  return (
    <Head>
      <title>{props.title}</title>
      <link rel="canonical" href={`${SiteMeta.canonicalOrigin}${props.canonicalPath}`} />
    </Head>
  );
};
