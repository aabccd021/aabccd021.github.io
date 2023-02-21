#!/usr/bin/env tsx

import { div, generate, img, png, pre } from '../../../satori/generate';

export const main = async () =>
  generate({
    filename: `${__dirname}/thumbnail`,
    element: div(
      { tw: 'flex h-full w-full bg-[#282828] text-[#d4be98]' },
      div(
        { tw: 'flex m-auto items-center justify-center' },
        div(
          { tw: 'text-[80px] m-4 flex flex-col items-center' },
          img({ height: 200, src: await png(`${__dirname}/../../../gruvbox/pnpm`) })
        ),
        pre({ tw: 'text-[100px] m-4 flex flex-col items-center' }, 'Install\nRecursively')
      )
    ),
  });

// eslint-disable-next-line functional/no-expression-statement
void main();
