import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Layout } from '../../src/components/layout/layout';
import { getMarkdownList, MarkdownMeta, readMarkdownContent } from '../../src/ssr/resolve-markdown-posts';
import { HtmlMeta } from '../../src/components/meta/html-meta';
import { TypedRoutes } from '../../src/config/routes';
import { MarkdownArticle } from '../../src/components/markdown/markdown-article';

interface RouteParams extends Record<string, string | string[]> {
  slug: string[];
}

interface PageProps {
  mdMeta: MarkdownMeta;
  mdContent: string;
}

const PostsShowPage: React.FC<PageProps> = (props) => (
  <Layout>
    <HtmlMeta title={`${props.mdMeta.frontMatter.title}`} canonicalPath={TypedRoutes.posts.show(props.mdMeta.slug)} />
    <MarkdownArticle title={props.mdMeta.frontMatter.title} content={props.mdContent} />
  </Layout>
);

export const getStaticPaths: GetStaticPaths<RouteParams> = async () => {
  const x = await getMarkdownList();
  return {
    paths: x.files.map((mdFile) => ({
      params: {
        slug: mdFile.slug,
      } as RouteParams,
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PageProps> = async (ctx) => {
  const query: RouteParams = ctx.params as any;
  const parsedMarkdown = await readMarkdownContent(query.slug);
  return {
    props: {
      mdMeta: parsedMarkdown.meta,
      mdContent: parsedMarkdown.content,
    },
  };
};
export default PostsShowPage;
