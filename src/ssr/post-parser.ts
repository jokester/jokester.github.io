import fsp from 'node:fs/promises';
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

export async function extractPostMeta(filename: string): Promise<null | MarkdownMeta> {
  const mdFile = matter(await fsp.readFile(filename, { encoding: 'utf-8' }));
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
