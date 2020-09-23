import React from 'react';
import { SiteMeta } from '../../config/const';
import Head from 'next/head';
import { GoogleAnalyticsTag } from '../external/tracking-tags';

export const HtmlMeta: React.FC<{ title: string; canonicalPath: string }> = (props) => {
  /**
   * TODO: ogp / keywords / etc
   */
  return (
    <Head>
      <title>{props.title}</title>
      <GoogleAnalyticsTag />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1.5,minimum-scale=1" />
      <link rel="canonical" href={`${SiteMeta.canonicalOrigin}${props.canonicalPath}`} />
    </Head>
  );
};
