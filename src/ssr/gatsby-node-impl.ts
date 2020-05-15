import path from 'path';
import Gatsby from 'gatsby';
import { Actions, CreateNodeArgs, CreatePagesArgs, GatsbyNode, NodePluginArgs } from 'gatsby';
import debug from 'debug';
import { createFilePath } from 'gatsby-source-filesystem';
import { SsrPostNodesQuery } from '../../graphql-types';
import { shouldBuildPostPage, TypedRouters } from '../config/routes';

const logger = debug('gatsby-site:ssr');

async function createPostPages({ graphql, getNode, actions: { createPage } }: CreatePagesArgs) {
  const postNodes = await graphql(`
    query SSRPostNodes {
      allMdx(sort: { fields: frontmatter___publishAt }) {
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
  `);

  if (postNodes.errors) throw postNodes.errors;

  const publishedPostNodes = (postNodes.data as SsrPostNodesQuery).allMdx.edges
    .filter((edge) => process.env.GATSBY_ENV === 'development' || shouldBuildPostPage(edge))
    .map((_) => _.node);

  logger('published nodes', publishedPostNodes);

  for (const node of publishedPostNodes) {
    const pathWithDate = TypedRouters.posts.show(node);

    logger('create page at %s ', pathWithDate);
    createPage<{}>({
      path: pathWithDate,
      component: path.join(__dirname, '../templates/post.tsx'),
      context: { nodeId: node.id }, // becomes param "$nodeId" in graphql query
    });
  }

  logger('');
}

export async function createPages(args: CreatePagesArgs) {
  await createPostPages(args);
}

export function onCreateNode({ node, actions, getNode }: CreateNodeArgs) {
  // logger('onCreateNode', node.internal.type);
}
