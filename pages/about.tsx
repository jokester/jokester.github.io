import { PreJson } from '../src/dummy/pre-json';
import * as React from 'react';
import { GetStaticProps } from 'next';
import { Layout } from '../src/components/layout/layout';

interface PageProps {
  renderedAt: number;
  renderedBy: string;
}

const AboutPage: React.FC<PageProps> = (props) => {
  return (
    <Layout>
      <h1>About</h1>
      <hr />
      TODO
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<PageProps> = async () => ({
  props: {
    renderedAt: Date.now(),
    renderedBy: 'server',
  },
});

export default AboutPage;
