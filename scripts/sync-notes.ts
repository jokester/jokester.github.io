/* eslint-disable no-process-exit */
import path from 'node:path';
import fsp from 'node:fs/promises';
import * as dree from 'dree';

const SOURCE_DIR = path.join(__dirname, '../notes');
const TARGET_DIR = path.join(__dirname, '../posts');

async function main(): Promise<void> {
  const [source, target] = await Promise.all([walkDir(SOURCE_DIR), walkDir(TARGET_DIR)]);

  console.debug('source', source);
  console.debug('target', target);
}

interface PostItem {
  slug: string;
  filename: string;
  contentHash: string;
  date: string;
  category: string;
}

function buildTargetPath(p: PostItem) {}

async function walkDir(start: string): Promise<PostItem[]> {
  const found: Promise<PostItem>[] = [];
  const scan = await dree.scanAsync(start, { followLinks: true, extensions: ['md'] }, (dir, item) => {
    console.debug('dir', dir);
    console.debug('item', item);
  });
  console.debug('scan', scan);
  return Promise.all(found);
}

if (require.main === module) {
  const [_node, _script] = process.argv;
  main()
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
