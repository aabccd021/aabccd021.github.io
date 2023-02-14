// eslint-disable-next-line import/no-nodejs-modules
import * as fs from 'node:fs/promises';

import satori from 'satori';

export const generate = async ({
  element,
  output,
  width,
  height,
}: {
  readonly element: React.ReactNode;
  readonly output: string;
  readonly width?: number;
  readonly height?: number;
}) => {
  const result = await satori(element, {
    width: width ?? 1200,
    height: height ?? 630,
    fonts: [
      {
        name: 'Inter',
        data: await fs.readFile(`${__dirname}/inter-latin-ext-700-normal.woff`),
        weight: 400,
        style: 'normal',
      },
      {
        name: 'JetBrainsMono',
        data: await fs.readFile(`${__dirname}/JetBrainsMono-Regular.ttf`),
        weight: 400,
        style: 'normal',
      },
    ],
  });
  return fs.writeFile(output, result, { encoding: 'utf8' });
};
