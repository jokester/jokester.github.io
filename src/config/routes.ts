import { ParsedUrlQuery } from 'querystring';

/**
 * @note MUST have trailing slash
 */
export const TypedRoutes = {
  index: '/',
  posts: {
    index: '/posts/',
    show: (slug: string[]) => `/posts/${slug.join('/')}/`,
  },
  works: '/works/',
  about: {
    me: '/about/',
  },
} as const;
export type TypedRouteParam<RouteNode> = RouteNode extends (param: infer Param) => string ? Param & ParsedUrlQuery : {};
