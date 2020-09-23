import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { buildEnv } from '../../config/build-env';
import { createLogger } from '../../utils/debug-logger';
import Head from 'next/head';

const logger = createLogger(__filename);

declare function gtag(...args: any[]): void;

/**
 * taken from https://github.com/zeit/next.js/blob/canary/examples/with-google-analytics/pages/_document.js
 * @returns {any}
 * @constructor
 */
export const GoogleAnalyticsTag: React.FC = () => {
  const { GA_TRACKING_ID } = buildEnv;
  const router = useRouter();

  useEffect(() => {
    logger('GA_TRACKING_ID', GA_TRACKING_ID);
    if (GA_TRACKING_ID) {
      const url = router.asPath;
      logger('RouteChangeComplete', url);
      setTimeout(() => {
        typeof gtag === 'function' &&
          gtag('config', GA_TRACKING_ID, {
            page_location: url,
            page_title: document.title,
          });
      }, 0);
    }
  }, []);

  return (
    (GA_TRACKING_ID && (
      <Head>
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      </Head>
    )) ||
    null
  );
};
