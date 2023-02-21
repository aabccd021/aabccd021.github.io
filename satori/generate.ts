// eslint-disable-next-line import/no-nodejs-modules
import * as fs from 'node:fs/promises';

import { pipe } from 'fp-ts/function';
import satori from 'satori';
import sharp from 'sharp';
import { match as convert } from 'ts-pattern';

export const png = async (path: string) => {
  const data = await fs.readFile(`${path}.png`, { encoding: 'base64' });
  return `data:image/png;base64,${data}`;
};

const conv = (ext: 'avif' | 'png' | 'webp', s: sharp.Sharp) =>
  convert(ext)
    .with('avif', () => s.avif())
    .with('png', () => s.png())
    .with('webp', () => s.webp())
    .exhaustive();

const write = (filename: string) => (s: sharp.Sharp) => (ext: 'avif' | 'png' | 'webp') =>
  conv(ext, s)
    .toBuffer()
    .then((res) => fs.writeFile(`${filename}.${ext}`, res));

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
  const svgStr = await satori(element, {
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
  return pipe(svgStr, Buffer.from, sharp, write(filename), (writeToExt) =>
    Promise.all([writeToExt('webp'), writeToExt('avif'), writeToExt('png')])
  );
};
