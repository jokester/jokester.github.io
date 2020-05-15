import React from 'react';
import { Layout } from '../components/layout';
import { graphql, Link } from 'gatsby';
import { GatsbyPageProps } from '../types/gatsby-page-props';
import { SsrPostNodesQuery } from '../../graphql-types';
import { shouldBuildPostPage, TypedRouters } from '../config/routes';

const PostsPage: React.FC<GatsbyPageProps<{}, SsrPostNodesQuery>> = (props) => {
  const links = props.data.allMdx.edges.filter(shouldBuildPostPage).map((_) => (
    <Link key={_.node.id} to={TypedRouters.posts.show(_.node)}>
      <span>{_.node.frontmatter?.publishAt ?? 'DRAFT'}</span>
      {_.node.frontmatter?.title!}
      <hr />
    </Link>
  ));

  return (
    <Layout>
      PostsPage<div>{links}</div>
    </Layout>
  );
};

export const query = graphql`
  query SSRPostListNodes {
    allMdx(sort: { fields: frontmatter___publishAt }) {
      edges {
        node {
          id
          frontmatter {
            publishAt(formatString: "YYYY-MM-DD")
            title
          }
        }
      }
    }
  }
`;

export default PostsPage;
