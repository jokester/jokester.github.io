import * as fsp from './fsp';
import path from 'path';
import matter from 'gray-matter';
import { format } from 'date-fns';
import { isDevBuild } from '../config/build-env';
import isEqual from 'lodash/isEqual';
import sortBy from 'lodash/sortBy';
import { createLogger } from '../utils/debug-logger';
import { asyncThrottle } from '../utils/async-throttle';

const logger = createLogger(__filename);

async function recursiveDir(
  start: string,
  shouldContinue: (dirPath: string) => boolean = () => true,
): Promise<string[]> {
  const toSearch = [start];
  const ret: string[] = [];
  while (toSearch.length) {
    const dir = toSearch.shift()!;
    for (const entry of await fsp.readDir(dir)) {
      const realpath = path.join(dir, entry);

      const stat = await fsp.lstat(realpath);
      if (stat.isFile()) {
        ret.push(realpath);
      } else if (stat.isDirectory() && shouldContinue(realpath)) {
        toSearch.push(realpath);
      }
    }
  }

  return ret;
}

export async function readMarkdownContent(slug: string[]) {
  const x = await getMarkdownList();
  const meta = x.files.find((_) => isEqual(_.slug, slug))!;
  const parsed = matter(await fsp.readText(meta.realpath));

  return { meta, content: parsed.content } as const;
}

interface MarkdownFrontMatter {
  title: string;
  publishAt?: string;
  lang?: 'zh-hans' | 'zh-hant' | 'en' | 'ja';
}

export interface MarkdownMeta {
  realpath: string;
  slug: string[];
  frontMatter: MarkdownFrontMatter;
}

function launderFrontMatter(data: { title?: string; publishAt?: Date }): null | MarkdownFrontMatter {
  if (data.title && data.publishAt) {
    return { title: data.title, publishAt: format(data.publishAt, 'yyyy-MM-dd') };
  } else if (data.title) {
    return { title: data.title };
  }
  return null;
}

export const getMarkdownList = asyncThrottle(doParsePostList, 3e3);

async function doParsePostList(): Promise<{
  postsDir: string;
  files: MarkdownMeta[];
}> {
  // MUST NOT use __dir, the file may be built and reside in .next
  const start = path.join(process.env.REPO_ROOT!, 'posts');
  const realpaths = await recursiveDir(start);
  const files: MarkdownMeta[] = [];

  for (const realpath of realpaths) {
    const basename = path.basename(realpath);

    let authorDate, slugFromBasename;
    if (
      ([, authorDate = null, slugFromBasename = null] = /^(\d+-\d+-\d+)-(.*)\.(md|markdown)$/i.exec(basename) ?? []) &&
      authorDate &&
      slugFromBasename
    ) {
      const mdFile = matter(await fsp.readText(realpath));
      const frontMatter = launderFrontMatter(mdFile.data as any);

      if (frontMatter?.publishAt) {
        logger(`published post: ${realpath}`);
        files.push({
          realpath,
          slug: [frontMatter.publishAt, slugFromBasename], //realpath.slice(start.length + 1).split('/'),
          frontMatter,
        });
      } else if (frontMatter && isDevBuild) {
        logger(`draft post: ${realpath}`);
        files.push({
          realpath,
          slug: ['7777-77-77', slugFromBasename], //realpath.slice(start.length + 1).split('/'),
          frontMatter,
        });
      } else {
        logger(`non-post: ${realpath}`);
      }
    }
  }
  return {
    postsDir: start,
    files: sortBy(files, (_) => _.frontMatter.publishAt).reverse(),
  };
}
