export const isServer = typeof window === 'undefined';
export const isDevBuild =process.env.GATSBY_ENV === 'development';
