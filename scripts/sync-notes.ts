/* eslint-disable no-process-exit */
import path from 'node:path';
import fsp from 'node:fs/promises';
import * as dree from 'dree';
import { extractPost, extractPostMeta, PostItem } from '../src/ssr/post-parser';
import { createLogger } from '../src/utils/debug-logger';

const logger = createLogger(__filename);
const POSTS_DIR = path.join(__dirname, '../posts');

async function main(srcDir: string): Promise<void> {
  await fsp.rm(POSTS_DIR, { recursive: true, force: true });
  await fsp.mkdir(POSTS_DIR, { recursive: true });
  const source = await findPosts(srcDir);
  for (const s of source) {
    const dest = path.join(POSTS_DIR, ...s.pathSegments);
    console.info('copy', { src: s.origPath, dest });
    await fsp.mkdir(path.dirname(dest), { recursive: true });
    await fsp.copyFile(s.origPath, dest);
  }
}

async function findPosts(start: string): Promise<PostItem[]> {
  const found: PostItem[] = [];
  await dree.scanAsync(start, { followLinks: true, extensions: ['md'] }, async (dir, item) => {
    const p = await extractPost(dir.path);
    if (p) {
      found.push(p);
    }
  });
  logger('found', found);
  return found;
}

if (require.main === module) {
  const [_node, _script, srcDir] = process.argv;
  if (!srcDir) {
    throw new Error(`usage: ${_script} <source-dir>`);
  }
  main(srcDir)
    .catch((e) => e)
    .then((error) => {
      if (error) {
        console.error(error);
        process.exit(1);
      } else {
        process.exit(0);
      }
    });
}
