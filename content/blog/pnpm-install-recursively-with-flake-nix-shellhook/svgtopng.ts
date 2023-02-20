#!/usr/bin/env exec-main

// eslint-disable-next-line import/no-nodejs-modules
import * as fs from 'fs/promises';
import sharp from 'sharp';

export const main = async () => {
  const thumbnailSvg = await fs.readFile('./thumbnail.svg', { encoding: 'utf8' });
  const res = await sharp(Buffer.from(thumbnailSvg)).toBuffer({ resolveWithObject: true });
  return fs.writeFile('thumbnail.png', res.data);
};
