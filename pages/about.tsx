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
      <h2>AboutPage in {__filename}</h2>
      <PreJson value={props} />
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
