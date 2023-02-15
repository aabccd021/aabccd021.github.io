import { pnpm } from '../../../gruvbox/pnpm';
import { generate } from '../../../satori/generate';

const el = (type: string) => (props: object, children?: unknown) => ({
  key: '',
  type,
  props: {
    ...props,
    children,
  },
});

const div = el('div');

const pre = el('pre');

const element: React.ReactNode = div(
  {
    tw: 'flex h-full w-full bg-[#282828] text-[#d4be98]',
  },
  [
    div(
      {
        tw: 'flex m-auto items-center justify-center',
      },
      [
        div(
          {
            tw: 'text-[80px] m-4 flex flex-col items-center',
          },
          [pnpm({ width: '200', height: '200' }), div({}, 'pnpm')]
        ),
        pre(
          {
            tw: 'text-[100px] m-4 flex flex-col items-center',
          },
          'Install\nRecursively'
        ),
      ]
    ),
  ]
);

export const main = () => generate({ element, output: `${__dirname}/thumbnail.svg` });
