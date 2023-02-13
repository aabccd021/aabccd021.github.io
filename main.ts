// eslint-disable-next-line import/no-nodejs-modules
import * as fs from 'node:fs/promises';

import satori from 'satori';

import { img } from './aab';

export const main = async () => {
  const font = await fs.readFile('./inter-latin-ext-700-normal.woff');
  const result = await satori(img, {
    width: 600,
    height: 400,
    fonts: [
      {
        name: 'Inter',
        data: font,
        weight: 400,
        style: 'normal',
      },
    ],
  });
  return fs.writeFile('aab.svg', result, { encoding: 'utf8' });
};
