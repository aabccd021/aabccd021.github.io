import { generate } from '../../../satori/generate';

const element = (
  <div
    style={{
      color: '#d4be98',
      backgroundColor: '#282828',
      height: '100%',
      width: '100%',
      display: 'flex',
    }}
  >
    <pre style={{ margin: 'auto', fontSize: 140 }}>❯ gh repo create</pre>
  </div>
);

export const main = () => generate({ element, output: `${__dirname}/thumbnail.svg` });
