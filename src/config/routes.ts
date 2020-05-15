import { SsrPostNodesQuery } from '../../graphql-types';

export const TypedRouters = {
  posts: {
    index: '/posts',
    show: (node: SsrPostNodesQuery['allMdx']['edges'][number]['node']) =>
      `/posts/${node.frontmatter?.publishAt ?? 'draft'}/${node.frontmatter?.slug ?? 'no-slug'}`.replace(/\/+/g, '/'),
  },
} as const;

export function shouldBuildPostPage(mdxNode: SsrPostNodesQuery['allMdx']['edges'][number]): boolean {
  return !!mdxNode.node.frontmatter?.publishAt;
}
