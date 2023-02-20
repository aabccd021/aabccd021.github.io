// eslint-disable-next-line import/no-nodejs-modules
import * as fs from 'node:fs/promises';

import satori from 'satori';
import sharp from 'sharp';

export const generate = async ({
  element,
  filename,
  width,
  height,
}: {
  readonly element: React.ReactNode;
  readonly filename: string;
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
  // const optimizedResult = optimize(result);
  const optimizedResult = { data: result };

  const optimizedResultAdjusted = optimizedResult.data
    .replace('href', 'xlink:href')
    .replace(
      'xmlns="http://www.w3.org/2000/svg"',
      'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"'
    );

  const [sharpOutput] = await Promise.all([
    sharp(Buffer.from(optimizedResultAdjusted)).toBuffer({
      resolveWithObject: true,
    }),
    fs.writeFile(`${filename}.svg`, optimizedResultAdjusted, { encoding: 'utf8' }),
  ]);

  return fs.writeFile(`${filename}.${sharpOutput.info.format}`, sharpOutput.data);
};
