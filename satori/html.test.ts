import * as h from './html';

export const aab = h.a({
  href: 'a',
  download: 'a',
});

// @ts-expect-error haha
export const aab2 = h.a({
  download: 'a',
});

export const aab3 = h.a({
  href: 'a',
});

export const aab4 = h.a({});

export const metaAttrImpl3 = h.meta({
  name: '',
});

// content allowedIfAttributeIsPresent
export const metaAttrImpl = h.meta({
  name: '',
  content: '',
});

// content allowedIfAttributeIsPresent
export const metaAttrImpl5 = h.meta({
  itemprop: '',
  content: '',
});

// content allowedIfAttributeIsPresent
export const metaAttrImpl99 = h.meta({
  'http-equiv': '',
  content: '',
});

// @ts-expect-error don't content allowedIfAttributeIsPresent
export const metaAttrImpl2 = h.meta({
  content: '',
});

export const metaAttrImpl7 = h.meta({
  itemprop: '',
});

// @ts-expect-error haha
export const metaAttrImpl8 = h.meta({
  'http-equiv': '',
  name: '',
});

// @ts-expect-error haha
export const metaAttrImpl10 = h.meta({
  'http-equiv': '',
  itemprop: '',
});

// @ts-expect-error haha
export const metaAttrImpl9 = h.meta({
  name: '',
  itemprop: '',
});

export const metaAttrImpl4 = h.meta({});

export const buttonImplA = h.button({});

export const buttonImpl0 = h.button({
  type: 'submit',
});

export const buttonImpl1 = h.button({
  type: 'submit',
  formaction: '',
});

// @ts-expect-error haha
export const buttonImpl2 = h.button({
  type: 'reset',
  formaction: '',
});

export const buttonImpl3 = h.button({
  formaction: '',
});

export const inputImplA = h.input({});

export const inputImpl0 = h.input({
  type: 'submit',
});

export const inputImpl1 = h.input({
  type: 'submit',
  formaction: '',
});

// @ts-expect-error haha
export const inputImpl2 = h.input({
  type: 'reset',
  formaction: '',
});

export const inputImpl3 = h.input({
  formaction: '',
});

export const inputImpl8 = h.input({
  type: 'image',
});

export const inputImpl9 = h.input({
  type: 'image',
  formaction: '',
});

export const hlink = h.link({ href: '/favicon.ico', rel: 'icon' });

export const hlink2 = h.link({ href: '/favicon.svg', rel: 'icon', type: 'image/svg+xml' });

export const htmeta = h.meta({ charset: 'utf-8' });

export const tagtest = h.html(
  { lang: 'en' },
  h.head({}),
  h.body({}, h.main({}, h.h1({}), h.p({}, h.text('aab'))))
);
