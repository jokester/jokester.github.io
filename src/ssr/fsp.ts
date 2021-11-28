import fs from 'fs';
import util from 'util';

import * as fsp from 'fs/promises';

export const readDir = util.promisify(fs.readdir);
export const readFile = util.promisify(fs.readFile);

export const readText = (filename: string) => readFile(filename, { encoding: 'utf8' }) as Promise<string>;

export const lstat = util.promisify(fs.lstat);

export const stat = util.promisify(fs.stat);

export const unlink = util.promisify(fs.unlink);

export const mkdtemp = util.promisify(fs.mkdtemp);

export const rmdir = util.promisify(fs.rmdir);

export const rename = util.promisify(fs.rename);

export const writeFile = util.promisify(fs.writeFile);

export const cp = util.promisify(fs.copyFile);

export const mv = fsp.rename;
