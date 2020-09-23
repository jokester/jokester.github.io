import React from 'react';
import { SiteMeta } from '../../config/const';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { createLogger } from '../../utils/debug-logger';

const logger = createLogger(__filename);
export const HtmlMeta: React.FC<{ title: string }> = (props) => {
  /**
   * TODO: ogp / keywords / etc
   */
  const router = useRouter();

  return (
    <Head>
      <title>{props.title}</title>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1.5,minimum-scale=1" />
      <link rel="canonical" href={`${SiteMeta.canonicalOrigin}${router.asPath}`} />
    </Head>
  );
};
