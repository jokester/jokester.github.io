import React from 'react';
import { Layout } from '../src/components/layout/layout';
import { HtmlMeta } from '../src/components/meta/html-meta';
import { SiteMeta } from '../src/config/const';
import { TypedRoutes } from '../src/config/routes';

const IndexPage: React.FC = (props) => {
  return (
    <Layout>
      <HtmlMeta title={SiteMeta.siteTitle} />
      <div>{SiteMeta.siteDesc}</div>
    </Layout>
  );
};

export default IndexPage;
