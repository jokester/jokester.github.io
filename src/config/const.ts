import { css, CSSObject } from '@emotion/react';

export const SiteMeta = {
  canonicalOrigin: `https://jokester.github.io`,
  siteTitle: `挖坑自動機 / Digging automaton`,
  siteTitleShort: `挖坑自動機`,
  siteTitleShorter: `挖`,
  siteDesc: 'Posts and works about Web, Android, Linux and stuff.',
} as const;

const breakpoints = [360, 640, 768, 1024, 1280];

const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

export function bcss(_default: CSSObject, ...objects: Array<CSSObject>): CSSObject {
  const built = { ..._default };
  for (let i = 0; i < mq.length; i++) {
    built[mq[i]] = objects[i];
  }

  return built;
}
