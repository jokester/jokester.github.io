import * as fsp from './fsp';
import path from 'path';
import matter from 'gray-matter';
import * as dateFns from 'date-fns';
import { publicDecrypt } from 'crypto';

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

export async function readMarkdownFile(realpath: string) {
  return fsp.readText(realpath).then(matter);
}

interface MarkdownFrontMatter {
  title: string;
  publishAt: string;
}

export interface MarkdownMeta {
  realpath: string;
  basename: string;
  slug: string[];
  frontMatter: MarkdownFrontMatter;
  // content: string;
}

export async function getMarkdownList(): Promise<{
  postsDir: string;
  files: MarkdownMeta[];
}> {
  const start = path.join(process.env.REPO_ROOT!, 'posts');
  const realpaths = await recursiveDir(start);
  const files: MarkdownMeta[] = [];

  for (const realpath of realpaths) {
    const basename = path.basename(realpath);

    let _, yymmdd, slug;
    if (
      ([_, yymmdd = null, slug = null] = /^(\d+-\d+-\d+)-(.*)\.(md|markdown)$/i.exec(basename) ?? []) &&
      yymmdd &&
      slug
    ) {
      const mdFile = await readMarkdownFile(realpath);
      const data: {
        title?: string;
        publishAt?: Date;
      } = mdFile.data as any;

      if (data.title && data.publishAt) {
        files.push({
          realpath,
          basename,
          slug: [slug], //realpath.slice(start.length + 1).split('/'),
          frontMatter: {
            title: data.title,
            publishAt: dateFns.format(data.publishAt, 'yyyy-MM-dd'),
          },
        });
      }
    }
  }
  return {
    postsDir: start,
    files,
  };
}
