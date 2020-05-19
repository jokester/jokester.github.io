import React from 'react';
import { PreJson } from '../src/dummy/pre-json';
import { Layout } from '../src/components/layout/layout';

const IndexPage: React.FC = (props) => {
  return (
    <Layout>
      <PreJson value={props} />
    </Layout>
  );
};

export default IndexPage;
