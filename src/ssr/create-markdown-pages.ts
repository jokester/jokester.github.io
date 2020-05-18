import * as fsp from './fsp';
import path from 'path';
import debug from 'debug';

const logger = debug('ssr:create-markdown-pages');

export async function recursiveDir(
  start: string,
  shouldContinue: (path: string) => boolean = () => true,
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

export async function getMarkdownList(): Promise<{ postsDir: string; files: { realpath: string; slug: string[] }[] }> {
  const start = path.join(process.env.REPO_ROOT!, 'posts');
  const files = await recursiveDir(start);
  logger('start', start);
  logger('files', files);
  return {
    postsDir: start,
    files: files
      .filter((_) => /\.(md|markdown)$/i.test(_))
      .map((realpath) => ({
        realpath,
        slug: realpath.slice(start.length + 1).split('/'),
      })),
  };
}
