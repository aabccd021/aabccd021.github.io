#!/usr/bin/env exec-main

// eslint-disable-next-line import/no-nodejs-modules
import * as fs from 'fs/promises';

import { generate } from '../../../satori/generate';

const el =
  (type: string) =>
  (props: object, ...children: readonly unknown[]) => ({
    key: '',
    type,
    props: {
      ...props,
      children,
    },
  });

const div = el('div');

const pre = el('pre');

const img = el('img');

const png = async (path: string) => {
  const data = await fs.readFile(`${path}.png`, { encoding: 'base64' });
  return `data:image/png;base64,${data}`;
};

export const main = async () => {
  const element: React.ReactNode = div(
    { tw: 'flex h-full w-full bg-[#282828] text-[#d4be98]' },
    div(
      { tw: 'flex m-auto items-center justify-center' },
      div(
        { tw: 'text-[80px] m-4 flex flex-col items-center' },
        img({ height: 200, src: await png('../../../gruvbox/pnpm') })
      ),
      pre({ tw: 'text-[100px] m-4 flex flex-col items-center' }, 'Install\nRecursively')
    )
  );
  return generate({ element, filename: `${__dirname}/thumbnail` });
};
