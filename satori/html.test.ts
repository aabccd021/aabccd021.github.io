#!/usr/bin/env tsx
/* eslint-disable node/no-sync */
/* eslint-disable functional/no-expression-statement */
/* eslint-disable import/no-nodejs-modules */
import * as fs from 'node:fs';

import { pipe } from 'fp-ts/function';

import * as h from './html';

const def = h.html({ lang: 'en' }, h.head({}, h.link({ href: '/favicon.io', rel: 'icon' })));

const tagToLines = (el: h._all): readonly string[] => {
  const attributes =
    'attributes' in el
      ? pipe(
          Object.entries(el.attributes)
            .map(([k, v]) => (v === true ? k : `${k}="${v}"`))
            .join(' '),
          (x) => ` ${x}`
        )
      : '';
  const children = Object.values(el.children)
    .flatMap(tagToLines)
    .map((x) => `  ${x}`);
  return [`<${el.type}${attributes}>`, ...children, `</${el.type}>`];
};

fs.writeFileSync('output.html', tagToLines(def).join('\n'));
