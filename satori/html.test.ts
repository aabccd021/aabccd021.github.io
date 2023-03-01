#!/usr/bin/env tsx
/* eslint-disable node/no-sync */
/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-conditional-statement */
/* eslint-disable import/no-nodejs-modules */
import * as fs from 'node:fs';

import { pipe } from 'fp-ts/function';

import * as h from './html';

const def = h.html(
  { lang: 'en' },
  h.head(
    {},
    h.link({ href: '/favicon.io', rel: 'icon' }),
    h.link({ href: '/favicon.svg', rel: 'icon', type: 'image/svg+xml' }),
    h.meta({ charset: 'utf-8' })
  ),
  h.body(
    {},
    h.header(
      {},
      h.div({ class: 'title' }, h.p({}, h.text('aabccd021 blog'))),
      h.nav(
        {},
        h.a({ href: '/', class: 'nav-item' }, h.text('Home')),
        h.a({ href: '/tags/', class: 'nav-item' }, h.text('Tags')),
        h.a({ href: '/about/', class: 'nav-item' }, h.text('About Me')),
        h.a(
          {
            href: '/feed/feed.xml',
            class: 'nav-item',
            rel: 'alternate',
            type: 'application/atom+xml',
          },
          h.text('RSS Feed')
        )
      )
    ),
    h.main(
      { id: 'main' },
      h.h1({}, h.text('Create new GitHub repository from CLI with gh command')),
      h.ul(
        { class: 'post-metadata' },
        h.li({}, h.text('Posted on'), h.time({}, h.text('05 February 2023')))
      )
    )
  )
);

const tagToLines = (el: h._all): readonly string[] => {
  if (el.type === 'text') {
    return [el.children];
  }
  const attributes =
    'attributes' in el && Object.keys(el.attributes).length > 0
      ? pipe(
          Object.entries(el.attributes)
            .map(([k, v]) => (v === true ? k : `${k}="${v}"`))
            .join(' '),
          (x) => ` ${x}`
        )
      : '';
  const children =
    'children' in el
      ? Object.values(el.children)
          .flatMap(tagToLines)
          .map((x) => `  ${x}`)
      : undefined;

  if (children === undefined) {
    return [`<${el.type}${attributes}>`];
  }
  return [`<${el.type}${attributes}>`, ...children, `</${el.type}>`];
};

const tagToLinesAny = (el: h.AnyElement): readonly string[] => {
  const attributes =
    'attributes' in el && Object.keys(el.attributes).length > 0
      ? pipe(
          Object.entries(el.attributes)
            .map(([k, v]) => (v === true ? k : `${k}="${v}"`))
            .join(' '),
          (x) => ` ${x}`
        )
      : '';
  const children =
    'children' in el
      ? typeof el.children === 'string' ? [`  ${el.children}`] : Object.values(el.children)
            .flatMap(tagToLines)
          .map((x) => `  ${x}`)
      : undefined;

  if (children === undefined) {
    return [`<${el.type}${attributes}>`];
  }
  return [`<${el.type}${attributes}>`, ...children, `</${el.type}>`];
};


fs.writeFileSync('output.html', tagToLines(def).join('\n'));


fs.writeFileSync('outputAny.html', tagToLinesAny(def).join('\n'));
