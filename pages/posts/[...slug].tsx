import React from 'react';
import { PreJson } from '../../src/dummy/pre-json';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Layout } from '../../src/components/layout';
import { getMarkdownList } from '../../src/ssr/create-markdown-pages';

interface RouteParams {
  slug: string[];
}

interface PageProps {
  slug: string[];
  postContent: string;
}

const PostsShowPage: React.FC<PageProps> = (props) => (
  <Layout>
    <div>
      <pre>{__filename}</pre>
      <hr />
      <h4>props:</h4>
      <PreJson value={props} />
      <h1>title: TITLE</h1>
      <code>{props.postContent}</code>
    </div>
  </Layout>
);

export const getStaticPaths: GetStaticPaths<{}> = async () => {
  const x = await getMarkdownList();
  return {
    paths: x.files.map((mdFile) => ({
      params: {
        slug: mdFile.slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PageProps> = async (ctx) => {
  const query: RouteParams = ctx.params as any;
  return {
    props: {
      slug: query.slug,
      postContent: `content for ${query.slug.join('/')}`,
    },
  };
};
export default PostsShowPage;
