import { SsrPostNodesQuery } from '../../graphql-types';

export const TypedRouters = {
  index: '/',
  posts: {
    index: '/posts',
    show: (node: SsrPostNodesQuery['allMdx']['edges'][number]['node']) =>
      `/posts/${node.frontmatter?.publishAt ?? 'xxxx-yy-zz'}/${node.frontmatter!.slug}`.replace(/\/+/g, '/'),
  },
} as const;

export function shouldBuildPostPage(mdxNode: SsrPostNodesQuery['allMdx']['edges'][number], allowDrafts : boolean): boolean {
  return (mdxNode.node.frontmatter?.slug && (allowDrafts || mdxNode.node.frontmatter.publishAt));
}
