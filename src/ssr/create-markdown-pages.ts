import * as fsp from './fsp';
import path from 'path';

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

export async function getMarkdownList(): Promise<{ postsDir: string; files: string[] }> {
  const start = path.join(__dirname, '../../posts');
  const files = await recursiveDir(start);
  return { postsDir: start, files: files.filter((_) => /\.(md|markdown)$/i.test(_)) };
}
