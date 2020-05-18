import { PreJson } from '../../src/dummy/pre-json';
import { TypedRouteParam, TypedRoutes } from '../../src/typed-routes';
import * as React from 'react';
import { useRouter } from 'next/router';
import { Layout } from '../../src/components/layout';

type PageProps = TypedRouteParam<typeof TypedRoutes.posts.index>;

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

export default PostsIndexPage;
