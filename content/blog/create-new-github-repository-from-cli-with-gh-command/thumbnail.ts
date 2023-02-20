import { generate } from '../../../satori/generate';

const element: React.ReactNode = {
  key: '',
  type: 'div',
  props: {
    tw: 'h-full w-full flex bg-[#282828]',
    children: {
      type: 'pre',
      props: {
        tw: 'm-auto text-[#d4be98] text-[140px]',
        children: '❯ gh repo create',
      },
    },
  },
};

export const main = () => generate({ element, filename: `${__dirname}/thumbnail` });
