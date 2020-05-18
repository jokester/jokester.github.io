import { ParsedUrlQuery } from 'querystring';

export const TypedRoutes = {
  index: '/',
  posts: {
    index: '/posts',
    show: (slug: string) => `/posts/${slug}`,
  },
  works: '/works',
  about: {
    me: '/about',
  },
} as const;
export type TypedRouteParam<RouteNode> = RouteNode extends (param: infer Param) => string ? Param & ParsedUrlQuery : {};
