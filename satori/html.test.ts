import * as h from './html';

export const hlink = h.link({ href: '/favicon.ico', rel: 'icon' });

export const hlink2 = h.link({ href: '/favicon.svg', rel: 'icon', type: 'image/svg+xml' });

export const htmeta = h.meta({ charset: 'utf-8' });

// @ts-expect-error can't assign child to meta
export const htmeta2 = h.meta({ content: 'a' }, h.text('a'));

export const tagtest = h.html(
  { lang: 'en' },
  h.head({}),
  h.body({}, h.main({}, h.h1({}), h.p({}, h.text('aab'))))
);
