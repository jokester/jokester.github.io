import { Feed } from 'feed';
import * as path from 'path';
import { writeFile } from './fsp';
import { getMarkdownList } from './resolve-markdown-posts';
import { SiteMeta } from '../config/const';

async function main() {
  const posts = await getMarkdownList();
  const feed = new Feed({
    title: SiteMeta.siteTitle,
    description: SiteMeta.siteDesc,
    link: SiteMeta.canonicalOrigin,
    feedLinks: `http://feeds.feedburner.com/HoleDiggingAutomaton`,
    copyright: 'CC BY-SA',
    id: '',
  });

  await writeFile(path.join(__dirname, '../../public/feed.xml'), feed.atom1());
}

main();
