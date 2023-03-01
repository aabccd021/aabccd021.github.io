#!/usr/bin/env tsx
/* eslint-disable node/no-sync */
/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-conditional-statement */
/* eslint-disable import/no-nodejs-modules */
import * as fs from 'node:fs';

import { option } from 'fp-ts';
import { pipe } from 'fp-ts/function';
import type { Option } from 'fp-ts/Option';

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
      h.div({ class: 'title' }, h.p({}, 'aabccd021 blog')),
      h.nav(
        {},
        h.a({ href: '/', class: 'nav-item' }, 'Home'),
        h.a({ href: '/tags/', class: 'nav-item' }, 'Tags'),
        h.a({ href: '/about/', class: 'nav-item' }, 'About Me'),
        h.a(
          {
            href: '/feed/feed.xml',
            class: 'nav-item',
            rel: 'alternate',
            type: 'application/atom+xml',
          },
          'RSS Feed'
        )
      )
    ),
    h.main(
      { id: 'main' },
      h.h1({}, 'Create new GitHub repository from CLI with gh command'),
      h.ul({ class: 'post-metadata' }, h.li({}, 'Posted on', h.time({}, '05 February 2023')))
    )
  )
);

const makeAttributesString = (element: Exclude<h.All, string>): Option<string> => {
  if (!('attributes' in element)) {
    return option.none;
  }

  const attributeEntries = Object.entries(element.attributes);

  if (attributeEntries.length <= 0) {
    return option.none;
  }

  const attributesString = attributeEntries
    .map(([attributeName, attributeValue]) =>
      typeof attributeValue === 'boolean' ? attributeName : `${attributeName}="${attributeValue}"`
    )
    .join(' ');
  return option.some(attributesString);
};

const makeElementString = (element: h.All): readonly string[] => {
  if (typeof element === 'string') {
    return [element];
  }
  const attributesString = pipe(
    element,
    makeAttributesString,
    option.map((str) => ` ${str}`),
    option.getOrElse(() => '')
  );

  const openTag = `<${element.tag}${attributesString}>`;

  if (!('children' in element)) {
    return [openTag];
  }

  const children = Object.values(element.children)
    .flatMap(makeElementString)
    .map((x) => `  ${x}`);
  const closeTag = `</${element.tag}>`;
  return [openTag, ...children, closeTag];
};

fs.writeFileSync('output.html', makeElementString(def).join('\n'));
