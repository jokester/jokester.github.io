import { PreJson } from '../src/dummy/pre-json';
import * as React from 'react';
import { GetStaticProps } from 'next';
import { Layout } from '../src/components/layout/layout';
import { MarkdownArticle } from '../src/components/markdown/markdown-article';

interface PageProps {
  renderedAt: number;
  renderedBy: string;
}

const AboutPage: React.FC<PageProps> = (props) => {
  return (
    <Layout>
      <MarkdownArticle
        title="About"
        content={`
### About this site

This is my personal site about Web, Android, Linux and stuff.

You may see contents in English / Chinese / Japanese, please stay calm \`:o\`

### About me

I have various skills and responsibilities. My title is executive developer.

Github profile: [gh/jokester](https://github.com/jokester)

More links about me: [about.me/wangguan](https://about.me/wangguan)
`}
      />
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
