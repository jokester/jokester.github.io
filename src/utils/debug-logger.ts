import debug from 'debug';
const repoRoot = __filename.replace(/src[\\/]utils[\\/].*$/i, '');

export function createLogger(srcFile: string) {
  const tag = srcFile
    .slice(repoRoot.length)
    .replace(/^src[\\/]/i, '')
    .replace(/[\\/]/g, ':');
  // console.log('createLogger: root', [__dirname, __filename, repoRoot]);
  // console.log('createLogger: tag', [srcFile, tag]);

  return debug(tag);
}
