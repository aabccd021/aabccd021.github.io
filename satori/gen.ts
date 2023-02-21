/* eslint-disable functional/no-expression-statement */
/* eslint-disable import/no-nodejs-modules */
import * as fs from 'node:fs/promises';

import * as html from './html';

const d = `${__dirname}/../temp`;

const main = async () => {
  await fs.rm(d, { recursive: true });
  await fs.mkdir(d);
  await Promise.all(
    Object.keys(html).flatMap((a) =>
      Object.keys(html).map((b) =>
        fs.writeFile(`${d}/${a}_${b}.html`, `<${a}><${b}>ccd</${b}></${a}>`, { encoding: 'utf8' })
      )
    )
  );
};

void main();
