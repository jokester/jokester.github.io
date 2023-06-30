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

This is a personal site about Web, Android, Linux and stuff.

All posts are my personal opinion and cannot represent any other entities.

### About me

I have various skills and responsibilities, most of them are about software development. My title is Executive Stuff Doer.

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
