import { generate } from '../../../satori/generate';

const element: React.ReactNode = {
  key: '',
  type: 'div',
  props: {
    style: {
      color: '#d4be98',
      backgroundColor: '#282828',
      height: '100%',
      width: '100%',
      display: 'flex',
    },
    children: {
      type: 'pre',
      props: {
        tw: 'm-auto text-[#d4be98] text-[140px]',
        children: '❯ gh repo create',
      },
    },
  },
};

export const main = () => generate({ element, output: `${__dirname}/thumbnail.svg` });
