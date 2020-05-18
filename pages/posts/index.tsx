import { PreJson } from '../../src/dummy/pre-json';
import * as React from 'react';
import { useRouter } from 'next/router';
import { Layout } from '../../src/components/layout';
import { GetStaticProps } from 'next';
import { getMarkdownList, MarkdownMeta } from '../../src/ssr/create-markdown-pages';

interface PageProps {
  files: MarkdownMeta[];
}
const PostsIndexPage: React.FC<PageProps> = (props) => {
  const router = useRouter();
  return (
    <Layout>
      <pre>{__filename}</pre>
      <PreJson value={props} />
      <PreJson value={router.query} />
    </Layout>
  );
};

// IndexPage.getInitialProps = async ctx => {};
export const getStaticProps: GetStaticProps<PageProps> = async (ctx) => {
  const files = await getMarkdownList();

  return { props: { files: files.files } };
};

export default PostsIndexPage;
