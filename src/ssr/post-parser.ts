import fsp from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { format, parseISO } from 'date-fns';
import { createLogger } from '../utils/debug-logger';

const logger = createLogger(__filename);
export interface MarkdownFrontMatter {
  title: string;
  publishAt: string;
  updatedAt?: string;
  slug: string;
  // path?: string; build from ${publishAt}-${slug} OR ${publishAt}-${slug}
  lang?: 'zh-hans' | 'zh-hant' | 'en' | 'ja';
  // tags?
}

export interface MarkdownMeta {
  filename: string;
  pathSegments: string[];
  frontMatter: MarkdownFrontMatter;
}

export interface PostItem {
  origPath: string;
  pathSegments: string[];
}

export async function extractPost(filename: string): Promise<null | PostItem> {
  const content = await fsp.readFile(filename, { encoding: 'utf-8' });
  const mdFile = matter(content);
  const frontMatter = mdFile.data as Partial<MarkdownFrontMatter>;
  if (frontMatter.title && frontMatter.publishAt) {
    logger('extractPostMeta', { filename, frontMatter });
    // rewrite YAML dates into string
    const publishYear = format(new Date(frontMatter.publishAt), 'yyyy');
    const publishDate = format(new Date(frontMatter.publishAt), 'MM-dd');
    const match = /^[-\d]+(.*)$/.exec(path.basename(filename));
    const filteredName = match ? match[1] : path.basename(filename);
    return {
      origPath: filename,
      pathSegments: [publishYear, `${publishDate}-${filteredName}`],
    };
  }
  return null;
}

export async function extractPostMeta(filename: string): Promise<null | MarkdownMeta> {
  const content = await fsp.readFile(filename, { encoding: 'utf-8' });
  const mdFile = matter(content);
  const frontMatter = mdFile.data as Partial<MarkdownFrontMatter>;
  if (frontMatter.title && frontMatter.publishAt && frontMatter.slug) {
    logger('extractPostMeta', { filename, frontMatter });
    // rewrite YAML dates into string
    const publishDate = format(new Date(frontMatter.publishAt), 'yyyy-MM-dd');
    return {
      filename,
      pathSegments: [publishDate, frontMatter.slug],
      frontMatter: {
        ...(frontMatter as MarkdownFrontMatter),
        publishAt: publishDate,
      },
    };
  }
  return null;
}
