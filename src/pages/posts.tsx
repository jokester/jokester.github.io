import React from 'react';
import { Layout } from '../components/layout';
import { graphql, Link } from 'gatsby';
import { GatsbyPageProps } from '../types/gatsby-page-props';
import { SsrPostNodesQuery } from '../../graphql-types';
import { shouldBuildPostPage, TypedRouters } from '../config/routes';
import { isDevBuild } from '../config/build-env';

const PostsPage: React.FC<GatsbyPageProps<{}, SsrPostNodesQuery>> = (props) => {
  const links = props.data.allMdx.edges
    .filter((edge) => shouldBuildPostPage(edge, isDevBuild))
    .map((_) => (
      <Link className="block my-2" key={_.node.id} to={TypedRouters.posts.show(_.node)}>
        <li className="px-4">
          <span className="text-sm mr-2 font-mono">{_.node.frontmatter?.publishAt ?? 'yyyy-mm-dd'}</span>
          <span>{_.node.frontmatter?.title!}</span>
        </li>
      </Link>
    ));

  return (
    <Layout>
      <h1 className="pl-4 pt-2">Posts:</h1>
      <ul className="">{links}</ul>
    </Layout>
  );
};

export const query = graphql`
  query SSRPostListNodes {
    allMdx(sort: { fields: frontmatter___publishAt, order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            publishAt(formatString: "YYYY-MM-DD")
            title
            slug
          }
        }
      }
    }
  }
`;

export default PostsPage;
