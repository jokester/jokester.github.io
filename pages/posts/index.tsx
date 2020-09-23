import * as React from 'react';
import { Layout } from '../../src/components/layout/layout';
import { GetStaticProps } from 'next';
import { getMarkdownList, MarkdownMeta } from '../../src/ssr/resolve-markdown-posts';
import Link from 'next/link';
import { TypedRoutes } from '../../src/config/routes';
import { OnlyInDev } from '../../src/components/hoc/only-in-dev';

interface PageProps {
  files: MarkdownMeta[];
}
const PostsIndexPage: React.FC<PageProps> = (props) => {
  return (
    <Layout>
      <ul>
        {props.files.map((mdFile, i) => (
          <PostListItem meta={mdFile} key={i} />
        ))}
      </ul>
    </Layout>
  );
};

const PostListItem: React.FC<{ meta: MarkdownMeta }> = ({ meta }) => {
  return (
    <li className="block my-2">
      <Link as={TypedRoutes.posts.show(meta.slug)} href="/posts/[...slug]">
        <a>
          <span className="text-sm mr-2 sm:mr-4 font-mono">{meta.frontMatter.publishAt || '7777-77-77'}</span>
          <span lang={meta.frontMatter.lang}>{meta.frontMatter.title}</span>
          <OnlyInDev>
            {null}
            {/*<code className="block">({meta.slug.join('/')})</code>*/}
          </OnlyInDev>
        </a>
      </Link>
    </li>
  );
};

export const getStaticProps: GetStaticProps<PageProps> = async (ctx) => {
  const files = await getMarkdownList();

  return { props: { files: files.files } };
};

export default PostsIndexPage;
