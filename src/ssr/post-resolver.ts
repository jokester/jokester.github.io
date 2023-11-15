import * as fsp from './fsp';
import path from 'path';
import matter from 'gray-matter';
import isEqual from 'lodash/isEqual';
import sortBy from 'lodash/sortBy';
import { createLogger } from '../utils/debug-logger';
import { asyncThrottle } from '../utils/async-throttle';
import { extractPostMeta, MarkdownMeta } from './post-parser';

const logger = createLogger(__filename);

async function findFiles(start: string): Promise<string[]> {
  const toSearch = [start];
  const ret: string[] = [];
  while (toSearch.length) {
    const dir = toSearch.shift()!;
    for (const entry of await fsp.readDir(dir)) {
      const realpath = path.join(dir, entry);

      const stat = await fsp.lstat(realpath);
      if (stat.isFile()) {
        ret.push(realpath);
      } else if (stat.isDirectory()) {
        toSearch.push(realpath);
      }
    }
  }

  return ret;
}

export async function readMarkdownContent(pathSegments: string[]): Promise<{ meta: MarkdownMeta; content: string }> {
  const posts = await loadPosts();
  const meta = posts.files.find((_) => isEqual(_.pathSegments, pathSegments))!;
  logger('readMarkdownContent', { pathSegments, meta });
  const parsed = matter(await fsp.readText(meta.filename));

  return { meta, content: parsed.content };
}

export const loadPosts = asyncThrottle(doLoadPosts, 3e3);

async function doLoadPosts(): Promise<{
  postsDir: string;
  files: MarkdownMeta[];
}> {
  // MUST NOT use __dir, the file may be built and reside in .next
  const start = path.join(process.env.REPO_ROOT!, 'posts');
  const realpaths = await findFiles(start);

  const files = (await Promise.all(realpaths.map(extractPostMeta))).filter(Boolean) as MarkdownMeta[];

  return {
    postsDir: start,
    files: sortBy(files, (_) => _.frontMatter.publishAt).reverse(),
  };
}
