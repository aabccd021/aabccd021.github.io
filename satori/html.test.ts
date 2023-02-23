import type { a, button, input, meta } from './html';

export const aab: a['attributes'] = {
  href: 'a',
  download: 'a',
};

// @ts-expect-error haha
export const aab2: a['attributes'] = {
  download: 'a',
};

export const aab3: a['attributes'] = {
  href: 'a',
};

export const aab4: a['attributes'] = {};

export const metaAttrImpl3: meta['attributes'] = {
  name: '',
};

// content allowedIfAttributeIsPresent
export const metaAttrImpl: meta['attributes'] = {
  name: '',
  content: '',
};

// content allowedIfAttributeIsPresent
export const metaAttrImpl5: meta['attributes'] = {
  itemprop: '',
  content: '',
};

// content allowedIfAttributeIsPresent
export const metaAttrImpl99: meta['attributes'] = {
  'http-equiv': '',
  content: '',
};

// @ts-expect-error don't content allowedIfAttributeIsPresent
export const metaAttrImpl2: meta['attributes'] = {
  content: '',
};

export const metaAttrImpl7: meta['attributes'] = {
  itemprop: '',
};

// @ts-expect-error haha
export const metaAttrImpl8: meta['attributes'] = {
  'http-equiv': '',
  name: '',
};

// @ts-expect-error haha
export const metaAttrImpl10: meta['attributes'] = {
  'http-equiv': '',
  itemprop: '',
};

// @ts-expect-error haha
export const metaAttrImpl9: meta['attributes'] = {
  name: '',
  itemprop: '',
};

export const metaAttrImpl4: meta['attributes'] = {};

export const buttonImplA: button['attributes'] = {};

export const buttonImpl0: button['attributes'] = {
  type: 'submit',
};

export const buttonImpl1: button['attributes'] = {
  type: 'submit',
  formaction: '',
};

// @ts-expect-error haha
export const buttonImpl2: button['attributes'] = {
  type: 'reset',
  formaction: '',
};

export const buttonImpl3: button['attributes'] = {
  formaction: '',
};

export const inputImplA: input['attributes'] = {};

export const inputImpl0: input['attributes'] = {
  type: 'submit',
};

export const inputImpl1: input['attributes'] = {
  type: 'submit',
  formaction: '',
};

// @ts-expect-error haha
export const inputImpl2: input['attributes'] = {
  type: 'reset',
  formaction: '',
};

export const inputImpl3: input['attributes'] = {
  formaction: '',
};

export const inputImpl8: input['attributes'] = {
  type: 'image',
};

export const inputImpl9: input['attributes'] = {
  type: 'image',
  formaction: '',
};
