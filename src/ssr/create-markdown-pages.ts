import * as fsp from '@jokester/ts-commonutil/node/fsp';
import path from 'path';

export async function recursiveDir(
  start: string,
  shouldContinue: (path: string) => boolean = () => true,
): Promise<string[]> {
  const toSearch = [start];
  const ret: string[] = [];
  let p;
  while ((p = toSearch.shift())) {
    const stat = await fsp.lstat(p);
    if (stat.isFile()) {
      ret.push(p);
    } else if (stat.isDirectory() && shouldContinue(p)) {
      toSearch.push(p);
    }
  }

  return ret;
}

export async function getMarkdownList(): Promise<{ postsDir: string; files: string[] }> {
  const start = path.join(__dirname, '../posts');
  const files = await recursiveDir(start);
  return { postsDir: start, files: files.filter((_) => /\.(md|markdown)$/i.test(_)) };
}
