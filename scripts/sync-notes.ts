/* eslint-disable no-process-exit */
import path from 'node:path';
import fsp from 'node:fs/promises';
import * as dree from 'dree';
import {extractPostMeta} from "../src/ssr/post-parser";

const TARGET_DIR = path.join(__dirname, '../posts');
const DEFAULT_SOURCE_DIR = path.join(__dirname, '../posts');

async function cleanTargetDir(targetDir: string): Promise<void> {
  const pending: Promise<unknown>[] = [];
  await dree.scanAsync(targetDir, { followLinks: false }, (dir, item) => {
    if (item.isFile()) {
      pending.push(fsp.unlink(''));
    }
  });
  await Promise.all(pending);
}

async function main(srcDir: string): Promise<void> {
  const source = await walkDir(srcDir);

  console.debug('source', source);
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
  const found: Promise<null  |PostItem>[] = [];
  const scan = await dree.scanAsync(start, { followLinks: true, extensions: ['md'] }, (dir, item) => {
    console.debug('dir', dir);
    console.debug('item', item);
    found.push(extractPostMeta(dir.path))
  });
  console.debug('scan', scan);
  const foundResolved = await Promise.all(found);
  return foundResolved.filter(Boolean) as PostItem[];
}

if (require.main === module) {
  const [_node, _script, srcDir = DEFAULT_SOURCE_DIR] = process.argv;
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
