#!/usr/bin/env tsx
/* eslint-disable node/no-sync */
/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-conditional-statement */
/* eslint-disable import/no-nodejs-modules */
import * as fs from 'node:fs';

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

const makeAttributesString = (el: Exclude<h.All, string>): string => {
  if (!('attributes' in el)) {
    return '';
  }

  const attributeEntries = Object.entries(el.attributes);

  if (attributeEntries.length <= 0) {
    return '';
  }

  const attributesString = attributeEntries
    .map(([attributeName, attributeValue]) =>
      typeof attributeValue === 'boolean' ? attributeName : `${attributeName}="${attributeValue}"`
    )
    .join(' ');
  return ` ${attributesString}`;
};

const makeElementString = (el: h.All): readonly string[] => {
  if (typeof el === 'string') {
    return [el];
  }
  const attributesString = makeAttributesString(el);
  const openTag = `<${el.tag}${attributesString}>`;

  if (!('children' in el)) {
    return [openTag];
  }

  const children = Object.values(el.children)
    .flatMap(makeElementString)
    .map((x) => `  ${x}`);
  const closeTag = `</${el.tag}>`;
  return [openTag, ...children, closeTag];
};

fs.writeFileSync('output.html', makeElementString(def).join('\n'));
