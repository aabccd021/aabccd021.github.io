import { generate } from '../../../satori/generate';

const element = <div style={{ color: 'white', backgroundColor: 'green' }}>❯ gh repo create</div>;

export const main = () => generate({ element, output: `${__dirname}/thumbnail.svg` });
