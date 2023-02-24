import { a, button, input, meta } from './html';

export const aab = a({
  href: 'a',
  download: 'a',
});

// @ts-expect-error haha
export const aab2 = a({
  download: 'a',
});

export const aab3 = a({
  href: 'a',
});

export const aab4 = a({});

export const metaAttrImpl3 = meta({
  name: '',
});

// content allowedIfAttributeIsPresent
export const metaAttrImpl = meta({
  name: '',
  content: '',
});

// content allowedIfAttributeIsPresent
export const metaAttrImpl5 = meta({
  itemprop: '',
  content: '',
});

// content allowedIfAttributeIsPresent
export const metaAttrImpl99 = meta({
  'http-equiv': '',
  content: '',
});

// @ts-expect-error don't content allowedIfAttributeIsPresent
export const metaAttrImpl2 = meta({
  content: '',
});

export const metaAttrImpl7 = meta({
  itemprop: '',
});

// @ts-expect-error haha
export const metaAttrImpl8 = meta({
  'http-equiv': '',
  name: '',
});

// @ts-expect-error haha
export const metaAttrImpl10 = meta({
  'http-equiv': '',
  itemprop: '',
});

// @ts-expect-error haha
export const metaAttrImpl9 = meta({
  name: '',
  itemprop: '',
});

export const metaAttrImpl4 = meta({});

export const buttonImplA = button({});

export const buttonImpl0 = button({
  type: 'submit',
});

export const buttonImpl1 = button({
  type: 'submit',
  formaction: '',
});

// @ts-expect-error haha
export const buttonImpl2 = button({
  type: 'reset',
  formaction: '',
});

export const buttonImpl3 = button({
  formaction: '',
});

export const inputImplA = input({});

export const inputImpl0 = input({
  type: 'submit',
});

export const inputImpl1 = input({
  type: 'submit',
  formaction: '',
});

// @ts-expect-error haha
export const inputImpl2 = input({
  type: 'reset',
  formaction: '',
});

export const inputImpl3 = input({
  formaction: '',
});

export const inputImpl8 = input({
  type: 'image',
});

export const inputImpl9 = input({
  type: 'image',
  formaction: '',
});
