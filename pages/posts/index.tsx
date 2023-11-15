import * as React from 'react';
import { Layout } from '../../src/components/layout/layout';
import { GetStaticProps } from 'next';
import { loadPosts } from '../../src/ssr/post-resolver';
import Link from 'next/link';
import { TypedRoutes } from '../../src/config/routes';
import { MarkdownMeta } from '../../src/ssr/post-parser';

interface PageProps {
  files: MarkdownMeta[];
}
const PostsIndexPage: React.FC<PageProps> = (props) => {
  return (
    <Layout>
      <ul>
        {props.files.map((mdFile, i) => (
          <PostListItem meta={mdFile} key={mdFile.filename} />
        ))}
      </ul>
    </Layout>
  );
};

const PostListItem: React.FC<{ meta: MarkdownMeta }> = ({ meta }) => {
  return (
    <li className="block my-2">
      <Link as={TypedRoutes.posts.show(meta.pathSegments)} href="/posts/[...segments]">
        <span className="text-sm mr-2 sm:mr-4 font-mono">{meta.frontMatter.publishAt}</span>
        <span lang={meta.frontMatter.lang}>{meta.frontMatter.title}</span>
      </Link>
    </li>
  );
};

export const getStaticProps: GetStaticProps<PageProps> = async (ctx) => {
  const files = await loadPosts();

  return { props: { files: files.files } };
};

export default PostsIndexPage;
