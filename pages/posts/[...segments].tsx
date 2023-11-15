import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Layout } from '../../src/components/layout/layout';
import { loadPosts, readMarkdownContent } from '../../src/ssr/post-resolver';
import { HtmlMeta } from '../../src/components/meta/html-meta';
import { MarkdownArticle } from '../../src/components/markdown/markdown-article';
import { MarkdownMeta } from '../../src/ssr/post-parser';

interface RouteParams extends Record<string, string | string[]> {
  segments: string[];
}

interface PageProps {
  mdMeta: MarkdownMeta;
  mdContent: string;
}

const PostsShowPage: React.FC<PageProps> = (props) => (
  <Layout>
    <HtmlMeta title={`${props.mdMeta.frontMatter.title}`} />
    <MarkdownArticle meta={props.mdMeta} content={props.mdContent} />
  </Layout>
);

export const getStaticPaths: GetStaticPaths<RouteParams> = async () => {
  const x = await loadPosts();
  return {
    paths: x.files.map((mdFile) => ({
      params: {
        segments: mdFile.pathSegments,
      } as RouteParams,
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PageProps> = async (ctx) => {
  const query: RouteParams = ctx.params as any;
  const parsedMarkdown = await readMarkdownContent(query.segments);
  return {
    props: {
      mdMeta: parsedMarkdown.meta,
      mdContent: parsedMarkdown.content,
    },
  };
};
export default PostsShowPage;
