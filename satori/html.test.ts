#!/usr/bin/env tsx
/* eslint-disable node/no-sync */
/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-conditional-statement */
/* eslint-disable import/no-nodejs-modules */
import * as fs from 'node:fs/promises';

import { option } from 'fp-ts';
import { pipe } from 'fp-ts/function';
import type { Option } from 'fp-ts/Option';

import { generate } from './generate';
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
      h.div({ class: 'flex' }, h.p({}, 'aabccd021 blog')),
      h.nav(
        {},
        h.a({ href: '/' }, 'Home'),
        h.a({ href: '/tags/' }, 'Tags'),
        h.a({ href: '/about/' }, 'About Me'),
        h.a(
          {
            href: '/feed/feed.xml',
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
      h.ul({}, h.li({}, 'Posted on', h.time({}, '05 February 2023')))
    )
  )
);

const def2 = h.div(
  { class: 'h-full w-full flex bg-[#282828]' },
  h.pre({ class: 'm-auto text-[#d4be98] text-[140px]' }, '❯ gh repo create')
);

const elementToReactNode = (element: h.All): React.ReactNode => {
  if (typeof element === 'string') {
    return element;
  }
  const childrenElement = 'children' in element ? element.children : [];
  const children = childrenElement.map(elementToReactNode);
  return {
    key: '',
    type: element.tag,
    props: {
      ...element.attributes,
      tw: element.attributes.class,
      children,
    },
  };
};

const makeAttributesString = (element: Exclude<h.All, string>): Option<string> => {
  const attributesEntries = Object.entries(element.attributes);

  if (attributesEntries.length <= 0) {
    return option.none;
  }

  const attributesString = attributesEntries
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

const main = async () => {
  await fs.writeFile('output.html', makeElementString(def).join('\n'));
  await generate({ element: elementToReactNode(def2), filename: 'output' });
};

void main();
