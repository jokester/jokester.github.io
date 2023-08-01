import { Feed } from 'feed';
import * as path from 'path';
import { writeFile } from './fsp';
import { loadPosts } from './post-resolver';
import { SiteMeta } from '../config/const';
import { TypedRoutes } from '../config/routes';

async function main() {
  const feed = new Feed({
    title: SiteMeta.siteTitle,
    description: SiteMeta.siteDesc,
    link: SiteMeta.canonicalOrigin,
    feedLinks: `https://feeds.feedburner.com/HoleDiggingAutomaton`,
    copyright: 'CC BY-SA',
    id: '',
  });

  const posts = await loadPosts();
  posts.files.slice(0, 5).forEach((post) => {
    post.frontMatter.publishAt &&
      feed.addItem({
        title: post.frontMatter.title,
        date: new Date(post.frontMatter.publishAt),
        link: `${SiteMeta.canonicalOrigin}${TypedRoutes.posts.show(post.pathSegments)}`,
      });
  });

  await writeFile(path.join(__dirname, '../../public/feed.xml'), feed.atom1());
}

main();
