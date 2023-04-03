#!/usr/bin/env tsx

import { generate } from '../../../satori/generate';
import { div, img, pre, text } from '../../../satori/html';

export const main = async () =>
  generate({
    filename: `${__dirname}/thumbnail`,
    element: div(
      { class: 'flex h-full w-full bg-[#282828] text-[#d4be98]' },
      div(
        { class: 'flex m-auto items-center justify-center' },
        div(
          { class: 'text-[80px] m-4 flex flex-col items-center' },
          img({
            height: 200,
            src: '',
            // await png(`${__dirname}/../../../gruvbox/pnpm`)
          })
        ),
        pre({ class: 'text-[100px] m-4 flex flex-col items-center' }, text('Install\nRecursively'))
      )
    ),
  });

// eslint-disable-next-line functional/no-expression-statement
void main();
