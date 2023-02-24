/* eslint-disable max-len */
// Copied from https://gitlab.com/html-validate/html-validate/-/blob/d19def8fc92bdd5e586f231eb16cef7dcfd0a02b/src/elements/html5.ts

import type { ReadonlyNonEmptyArray } from 'fp-ts/ReadonlyNonEmptyArray';

enum TextContent {
  /* forbid node to have text content, inter-element whitespace is ignored */
  NONE = 'none',

  /* node can have text but not required too */
  DEFAULT = 'default',

  /* node requires text-nodes to be present (direct or by descendant) */
  REQUIRED = 'required',

  /* node requires accessible text (hidden text is ignored, tries to get text from accessibility tree) */
  ACCESSIBLE = 'accessible',
}

/**
 * @public
 */
export type MetaAttribute = {
  /* If set it should be a function evaluating to an error message or null if
   * the attribute is allowed */
  readonly allowed?:
    | {
        readonly type: 'allowedIfAttributeHasValue';
        readonly key: string;
        readonly expectedValue: ReadonlyNonEmptyArray<string>;
      }
    | {
        readonly type: 'allowedIfAttributeIsAbsent';
        readonly attrs: ReadonlyNonEmptyArray<string>;
      }
    | {
        readonly type: 'allowedIfAttributeIsPresent';
        readonly attrs: ReadonlyNonEmptyArray<string>;
      };

  /* if true this attribute can only take boolean values: my-attr, my-attr="" or my-attr="my-attr" */
  readonly data?:
    | {
        readonly type: 'boolean';
      }
    | {
        readonly type: 'enum';
        readonly value: ReadonlyNonEmptyArray<string>;
        readonly defaultValue?: string;
      }
    | {
        readonly type: 'number';
      };

  readonly validation?: RegExp | string;

  /* if true this attribute can omit the value */
  readonly omit?: boolean;

  /* if set this attribute is required to be set */
  readonly required?: boolean;
};

export type PermittedAttribute = Record<string, MetaAttribute>;

export type FormAssociated = {
  /** Listed elements have a name attribute and is listed in the form and fieldset elements property. */
  readonly listed: boolean;
};

export type PropertyExpression = string | readonly [string, unknown];

/**
 * @public
 */
export type MetaData = {
  /* content categories */
  readonly meta?: boolean;
  readonly flow?: PropertyExpression | boolean;
  readonly sectioning?: boolean;
  readonly heading?: boolean;
  readonly phrasing?: PropertyExpression | boolean;
  readonly embedded?: boolean;
  readonly interactive?: PropertyExpression | boolean;

  /* element properties */
  readonly foreign?: boolean;
  readonly void?: boolean;
  readonly transparent?: ReadonlyNonEmptyArray<string> | boolean;
  readonly implicitClosed?: ReadonlyNonEmptyArray<string>;
  readonly scriptSupporting?: boolean;
  readonly form?: boolean;
  /** Mark element as a form-associated element */
  readonly formAssociated?: Partial<FormAssociated>;
  readonly labelable?: PropertyExpression | boolean;

  /* attribute */
  readonly attributes?: PermittedAttribute;

  /* permitted data */
  readonly permittedContent?: ReadonlyNonEmptyArray<string>;
  readonly forbiddenDescendant?: ReadonlyNonEmptyArray<string>;
  readonly permittedOrder?: ReadonlyNonEmptyArray<string>;
  readonly permittedParent?: ReadonlyNonEmptyArray<string>;
  readonly requiredAncestors?: ReadonlyNonEmptyArray<string>;
  readonly requiredContent?: ReadonlyNonEmptyArray<string>;
  readonly textContent?: TextContent | `${TextContent}`;
};

export type MetaDataTable = Record<string, MetaData>;

export const globalAttributes: PermittedAttribute = {
  contenteditable: {
    omit: true,
    data: { type: 'enum', value: ['true', 'false'] },
  },
  dir: {
    data: { type: 'enum', value: ['ltr', 'rtl', 'auto'] },
  },
  draggable: {
    data: { type: 'enum', value: ['true', 'false'] },
  },
  hidden: {
    data: { type: 'boolean' },
  },
  id: {
    validation: '/\\S+/',
  },
  tabindex: {
    data: { type: 'number' },
  },
  accesskey: {},
  class: {},
  lang: {},
  spellcheck: {},
  style: {},
  title: {},
  translate: {},
};

export const html: MetaDataTable = {
  a: {
    flow: true,
    phrasing: true,
    interactive: true,
    transparent: true,
    attributes: {
      download: {
        allowed: { type: 'allowedIfAttributeIsPresent', attrs: ['href'] },
        omit: true,
        validation: '/.+/',
      },
      href: {
        validation: '/.*/',
      },
      hreflang: {
        allowed: { type: 'allowedIfAttributeIsPresent', attrs: ['href'] },
      },
      itemprop: {
        allowed: { type: 'allowedIfAttributeIsPresent', attrs: ['href'] },
      },
      ping: {
        allowed: { type: 'allowedIfAttributeIsPresent', attrs: ['href'] },
      },
      referrerpolicy: {
        allowed: { type: 'allowedIfAttributeIsPresent', attrs: ['href'] },
      },
      rel: {
        allowed: { type: 'allowedIfAttributeIsPresent', attrs: ['href'] },
      },
      target: {
        allowed: { type: 'allowedIfAttributeIsPresent', attrs: ['href'] },
        data: { type: 'enum', value: ['_blank', '_self', '_parent', '_top'] },
        validation: '/[^_].*/',
      },
      type: {
        allowed: { type: 'allowedIfAttributeIsPresent', attrs: ['href'] },
      },
    },
    forbiddenDescendant: ['@interactive'],
  },

  abbr: {
    flow: true,
    phrasing: true,
    permittedContent: ['@phrasing'],
  },

  address: {
    flow: true,
    permittedContent: ['@flow'],
    forbiddenDescendant: ['address', 'header', 'footer', '@heading', '@sectioning'],
  },

  area: {
    flow: ['isDescendant', 'map'],
    phrasing: ['isDescendant', 'map'],
    void: true,
    attributes: {
      href: {
        validation: '/.*/',
      },
      coords: {
        // allowed: (node: string) {
        // const attr = node.getAttribute("shape");
        // if (attr && attr.valueMatches("default", false)) {
        // 	return `cannot be used when "shape" attribute is "default"`;
        // } else {
        // 	return null;
        // }
        // },
      },
      download: {
        allowed: { type: 'allowedIfAttributeIsPresent', attrs: ['href'] },
      },
      itemprop: {
        allowed: { type: 'allowedIfAttributeIsPresent', attrs: ['href'] },
      },
      ping: {
        allowed: { type: 'allowedIfAttributeIsPresent', attrs: ['href'] },
      },
      referrerpolicy: {
        allowed: { type: 'allowedIfAttributeIsPresent', attrs: ['href'] },
      },
      rel: {
        allowed: { type: 'allowedIfAttributeIsPresent', attrs: ['href'] },
      },
      shape: {
        // allowed(node, attr) {
        //   const shape = attr.value || 'rect';
        //   switch (shape) {
        //     case 'circ':
        //     case 'circle':
        //     case 'poly':
        //     case 'polygon':
        //     case 'rect':
        //     case 'rectangle':
        //       return allowedIfAttributeIsPresent('coords')(node, attr);
        //     default:
        //       return null;
        //   }
        // },
        data: { type: 'enum', value: ['rect', 'circle', 'poly', 'default'] },
      },
      target: {
        allowed: { type: 'allowedIfAttributeIsPresent', attrs: ['href'] },

        data: { type: 'enum', value: ['_blank', '_self', '_parent', '_top'] },
        validation: '/[^_].*/',
      },
    },
    requiredAncestors: ['map'],
  },

  article: {
    flow: true,
    sectioning: true,
    permittedContent: ['@flow'],
    forbiddenDescendant: ['main'],
  },

  aside: {
    flow: true,
    sectioning: true,
    permittedContent: ['@flow'],
    forbiddenDescendant: ['main'],
  },

  audio: {
    flow: true,
    phrasing: true,
    embedded: true,
    interactive: ['hasAttribute', 'controls'],
    transparent: ['@flow'],
    attributes: {
      src: {
        validation: '/.+/',
      },
      crossorigin: {
        omit: true,
        data: { type: 'enum', value: ['anonymous', 'use-credentials'] },
      },
      itemprop: {
        allowed: { type: 'allowedIfAttributeIsPresent', attrs: ['src'] },
      },
      preload: {
        omit: true,
        data: { type: 'enum', value: ['none', 'metadata', 'auto'] },
      },
    },
    permittedContent: ['@flow', 'track', 'source'],
    forbiddenDescendant: ['audio', 'video'],
    permittedOrder: ['source', 'track', '@flow'],
  },

  b: {
    flow: true,
    phrasing: true,
    permittedContent: ['@phrasing'],
  },

  base: {
    meta: true,
    void: true,
    permittedParent: ['head'],
  },

  bdi: {
    flow: true,
    phrasing: true,
    permittedContent: ['@phrasing'],
  },

  bdo: {
    flow: true,
    phrasing: true,
    permittedContent: ['@phrasing'],
  },

  blockquote: {
    flow: true,
    sectioning: true,
    permittedContent: ['@flow'],
  },

  body: {
    permittedContent: ['@flow'],
    permittedParent: ['html'],
  },

  br: {
    flow: true,
    phrasing: true,
    void: true,
  },

  button: {
    flow: true,
    phrasing: true,
    interactive: true,
    formAssociated: {
      listed: true,
    },
    labelable: true,
    attributes: {
      autofocus: {
        data: { type: 'boolean' },
      },
      disabled: {
        data: { type: 'boolean' },
      },
      formaction: {
        allowed: {
          type: 'allowedIfAttributeHasValue',
          key: 'type',
          expectedValue: ['submit'],
        },
      },
      formenctype: {
        allowed: {
          type: 'allowedIfAttributeHasValue',
          key: 'type',
          expectedValue: ['submit'],
        },
      },
      formmethod: {
        allowed: {
          type: 'allowedIfAttributeHasValue',
          key: 'type',
          expectedValue: ['submit'],
        },
        data: { type: 'enum', value: ['get', 'post', 'dialog'] },
      },
      formnovalidate: {
        allowed: {
          type: 'allowedIfAttributeHasValue',
          key: 'type',
          expectedValue: ['submit'],
        },
        data: { type: 'boolean' },
      },
      formtarget: {
        allowed: {
          type: 'allowedIfAttributeHasValue',
          key: 'type',
          expectedValue: ['submit'],
        },
        data: { type: 'enum', value: ['_blank', '_self', '_parent', '_top'] },
        validation: '/[^_].*/',
      },
      type: {
        data: {
          type: 'enum',
          value: ['submit', 'reset', 'button'],
          defaultValue: 'submit',
        },
      },
    },
    permittedContent: ['@phrasing'],
    forbiddenDescendant: ['@interactive'],
    textContent: 'accessible',
  },

  canvas: {
    flow: true,
    phrasing: true,
    embedded: true,
    transparent: true,
  },

  caption: {
    permittedContent: ['@flow'],
    forbiddenDescendant: ['table'],
  },

  cite: {
    flow: true,
    phrasing: true,
    permittedContent: ['@phrasing'],
  },

  code: {
    flow: true,
    phrasing: true,
    permittedContent: ['@phrasing'],
  },

  col: {
    attributes: {
      span: {
        data: { type: 'number' },
      },
    },
    void: true,
  },

  colgroup: {
    implicitClosed: ['colgroup'],
    attributes: {
      span: {
        data: { type: 'number' },
      },
    },
    permittedContent: ['col', 'template'],
  },

  data: {
    flow: true,
    phrasing: true,
    permittedContent: ['@phrasing'],
  },

  datalist: {
    flow: true,
    phrasing: true,
    permittedContent: ['@phrasing', 'option'],
  },

  dd: {
    implicitClosed: ['dd', 'dt'],
    permittedContent: ['@flow'],
    requiredAncestors: ['dl > dd', 'dl > div > dd'],
  },

  del: {
    flow: true,
    phrasing: true,
    transparent: true,
  },

  details: {
    flow: true,
    sectioning: true,
    interactive: true,
    attributes: {
      open: {
        data: { type: 'boolean' },
      },
    },
    permittedContent: ['summary', '@flow'],
    permittedOrder: ['summary', '@flow'],
    requiredContent: ['summary'],
  },

  dfn: {
    flow: true,
    phrasing: true,
    permittedContent: ['@phrasing'],
    forbiddenDescendant: ['dfn'],
  },

  dialog: {
    flow: true,
    permittedContent: ['@flow'],
    attributes: {
      open: {
        data: { type: 'boolean' },
      },
    },
  },

  div: {
    flow: true,
    permittedContent: ['@flow', 'dt', 'dd'],
  },

  dl: {
    flow: true,
    // permittedContent: ['@script', 'dt', 'dd', 'div'],
    permittedContent: ['dt', 'dd', 'div'],
  },

  dt: {
    implicitClosed: ['dd', 'dt'],
    permittedContent: ['@flow'],
    forbiddenDescendant: ['header', 'footer', '@sectioning', '@heading'],
    requiredAncestors: ['dl > dt', 'dl > div > dt'],
  },

  em: {
    flow: true,
    phrasing: true,
    permittedContent: ['@phrasing'],
  },

  embed: {
    flow: true,
    phrasing: true,
    embedded: true,
    interactive: true,
    void: true,
    attributes: {
      src: {
        required: true,
        validation: '/.+/',
      },
      title: {
        required: true,
      },
    },
  },

  fieldset: {
    flow: true,
    formAssociated: {
      listed: true,
    },
    attributes: {
      disabled: {
        data: { type: 'boolean' },
      },
    },
    // permittedContent: ['@flow', 'legend?'],
    permittedContent: ['@flow', 'legend'],
    permittedOrder: ['legend', '@flow'],
  },

  figcaption: {
    permittedContent: ['@flow'],
  },

  figure: {
    flow: true,
    // permittedContent: ['@flow', 'figcaption?'],
    permittedContent: ['@flow', 'figcaption'],
    permittedOrder: ['figcaption', '@flow', 'figcaption'],
  },

  footer: {
    flow: true,
    permittedContent: ['@flow'],
    forbiddenDescendant: ['header', 'footer', 'main'],
  },

  form: {
    flow: true,
    form: true,
    attributes: {
      action: {
        validation: /^\s*\S+\s*$/,
      },
      autocomplete: {
        data: { type: 'enum', value: ['on', 'off'] },
      },
      method: {
        data: { type: 'enum', value: ['get', 'post', 'dialog'] },
      },
      novalidate: {
        data: { type: 'boolean' },
      },
      target: {
        data: { type: 'enum', value: ['_blank', '_self', '_parent', '_top'] },
        validation: '/[^_].*/',
      },
    },
    permittedContent: ['@flow'],
    forbiddenDescendant: ['@form'],
  },

  h1: {
    flow: true,
    heading: true,
    permittedContent: ['@phrasing'],
  },

  h2: {
    flow: true,
    heading: true,
    permittedContent: ['@phrasing'],
  },

  h3: {
    flow: true,
    heading: true,
    permittedContent: ['@phrasing'],
  },

  h4: {
    flow: true,
    heading: true,
    permittedContent: ['@phrasing'],
  },

  h5: {
    flow: true,
    heading: true,
    permittedContent: ['@phrasing'],
  },

  h6: {
    flow: true,
    heading: true,
    permittedContent: ['@phrasing'],
  },

  head: {
    // permittedContent: ['base?', 'title?', '@meta'],
    permittedContent: ['base', 'title', '@meta'],
    permittedParent: ['html'],
    requiredContent: ['title'],
  },

  header: {
    flow: true,
    permittedContent: ['@flow'],
    forbiddenDescendant: ['header', 'footer', 'main'],
  },

  hgroup: {
    flow: true,
    heading: true,
    // permittedContent: ['p', '@heading?'],
    permittedContent: ['p', '@heading'],
    forbiddenDescendant: ['hgroup'],
    requiredContent: ['@heading'],
  },

  hr: {
    flow: true,
    void: true,
  },

  html: {
    // permittedContent: ['head?', 'body?'],
    permittedContent: ['head', 'body'],
    permittedOrder: ['head', 'body'],
    requiredContent: ['head', 'body'],
    attributes: {
      lang: {
        required: true,
      },
    },
  },

  i: {
    flow: true,
    phrasing: true,
    permittedContent: ['@phrasing'],
  },

  iframe: {
    flow: true,
    phrasing: true,
    embedded: true,
    interactive: true,
    attributes: {
      src: {
        validation: '/.+/',
      },
      title: {
        required: true,
      },
    },
  },

  img: {
    flow: true,
    phrasing: true,
    embedded: true,
    interactive: ['hasAttribute', 'usemap'],
    void: true,
    attributes: {
      crossorigin: {
        omit: true,
        data: { type: 'enum', value: ['anonymous', 'use-credentials'] },
      },
      decoding: {
        data: { type: 'enum', value: ['sync', 'async', 'auto'] },
      },
      ismap: {
        data: { type: 'boolean' },
      },
      src: {
        required: true,
        validation: '/.+/',
      },
      srcset: {
        validation: '/[^]+/',
      },
    },
  },

  input: {
    flow: true,
    phrasing: true,
    interactive: ['matchAttribute', ['type', '!=', 'hidden']],
    void: true,
    formAssociated: {
      listed: true,
    },
    labelable: ['matchAttribute', ['type', '!=', 'hidden']],
    attributes: {
      autofocus: {
        data: { type: 'boolean' },
      },
      capture: {
        omit: true,
        data: { type: 'enum', value: ['environment', 'user'] },
      },
      checked: {
        data: { type: 'boolean' },
      },
      disabled: {
        data: { type: 'boolean' },
      },
      formaction: {
        allowed: {
          type: 'allowedIfAttributeHasValue',
          key: 'type',
          expectedValue: ['submit', 'image'],
        },
      },
      formenctype: {
        allowed: {
          type: 'allowedIfAttributeHasValue',
          key: 'type',
          expectedValue: ['submit', 'image'],
        },
      },
      formmethod: {
        allowed: {
          type: 'allowedIfAttributeHasValue',
          key: 'type',
          expectedValue: ['submit', 'image'],
        },
        data: { type: 'enum', value: ['get', 'post', 'dialog'] },
      },
      formnovalidate: {
        allowed: {
          type: 'allowedIfAttributeHasValue',
          key: 'type',
          expectedValue: ['submit', 'image'],
        },
        data: { type: 'boolean' },
      },
      formtarget: {
        allowed: {
          type: 'allowedIfAttributeHasValue',
          key: 'type',
          expectedValue: ['submit', 'image'],
        },
        data: { type: 'enum', value: ['_blank', '_self', '_parent', '_top'] },
        validation: '/[^_].*/',
      },
      inputmode: {
        data: {
          type: 'enum',
          value: ['none', 'text', 'decimal', 'numeric', 'tel', 'search', 'email', 'url'],
        },
      },
      multiple: {
        data: { type: 'boolean' },
      },
      readonly: {
        data: { type: 'boolean' },
      },
      required: {
        data: { type: 'boolean' },
      },
      spellcheck: {
        data: { type: 'enum', value: ['default', 'false', 'true'] },
      },
      type: {
        data: {
          type: 'enum',
          defaultValue: 'submit',
          value: [
            'button',
            'checkbox',
            'color',
            'date',
            'datetime-local',
            'email',
            'file',
            'hidden',
            'image',
            'month',
            'number',
            'password',
            'radio',
            'range',
            'reset',
            'search',
            'submit',
            'tel',
            'text',
            'time',
            'url',
            'week',
          ],
        },
      },
    },
  },

  ins: {
    flow: true,
    phrasing: true,
    transparent: true,
  },

  kbd: {
    flow: true,
    phrasing: true,
    permittedContent: ['@phrasing'],
  },

  label: {
    flow: true,
    phrasing: true,
    interactive: true,
    permittedContent: ['@phrasing'],
    forbiddenDescendant: ['label'],
  },

  legend: {
    permittedContent: ['@phrasing', '@heading'],
  },

  li: {
    implicitClosed: ['li'],
    permittedContent: ['@flow'],
    permittedParent: ['ul', 'ol', 'menu', 'template'],
  },

  link: {
    meta: true,
    void: true,
    attributes: {
      type: {},
      rel: {
        data: {
          type: 'enum',
          value: [
            'alternate',
            'author',
            'dns',
            'help',
            'icon',
            'license',
            'next',
            'pingback',
            'preconnect',
            'prefetch',
            'preload',
            'prerender',
            'prev',
            'search',
            'stylesheet',
          ],
        },
      },

      as: {
        allowed: {
          type: 'allowedIfAttributeHasValue',
          key: 'rel',
          expectedValue: ['prefetch', 'preload', 'modulepreload'],
        },

        data: {
          type: 'enum',
          value: [
            'audio',
            'audioworklet',
            'document',
            'embed',
            'fetch',
            'font',
            'frame',
            'iframe',
            'image',
            'manifest',
            'object',
            'paintworklet',
            'report',
            'script',
            'serviceworker',
            'sharedworker',
            'style',
            'track',
            'video',
            'webidentity',
            'worker',
            'xslt',
          ],
        },
      },
      blocking: {
        allowed: {
          type: 'allowedIfAttributeHasValue',
          key: 'rel',
          expectedValue: ['stylesheet', 'preload', 'modulepreload'],
        },
        data: { type: 'enum', value: ['render'] },
      },
      crossorigin: {
        omit: true,
        data: { type: 'enum', value: ['anonymous', 'use-credentials'] },
      },
      disabled: {
        allowed: {
          type: 'allowedIfAttributeHasValue',
          key: 'rel',
          expectedValue: ['stylesheet'],
        },

        data: { type: 'boolean' },
      },
      href: {
        required: true,
        validation: '/.+/',
      },
      integrity: {
        allowed: {
          type: 'allowedIfAttributeHasValue',
          key: 'rel',
          expectedValue: ['stylesheet', 'preload', 'modulepreload'],
        },

        validation: '/.+/',
      },
    },
  },

  main: {
    flow: true,
  },

  map: {
    flow: true,
    phrasing: true,
    transparent: true,
    attributes: {
      name: {
        required: true,
        validation: '/\\S+/',
      },
    },
  },

  mark: {
    flow: true,
    phrasing: true,
    permittedContent: ['@phrasing'],
  },

  math: {
    flow: true,
    foreign: true,
    phrasing: true,
    embedded: true,
    attributes: {
      dir: {
        data: { type: 'enum', value: ['ltr', 'rtl'] },
      },
      display: {
        data: { type: 'enum', value: ['block', 'inline'] },
      },
      overflow: {
        data: { type: 'enum', value: ['linebreak', 'scroll', 'elide', 'truncate', 'scale'] },
      },
    },
  },

  menu: {
    flow: true,
    // permittedContent: ['@script', 'li'],
    permittedContent: ['script', 'li'],
  },

  meta: {
    flow: ['hasAttribute', 'itemprop'],
    phrasing: ['hasAttribute', 'itemprop'],
    meta: true,
    void: true,
    attributes: {
      charset: {
        data: { type: 'enum', value: ['utf-8'] },
      },

      content: {
        allowed: {
          type: 'allowedIfAttributeIsPresent',
          attrs: ['name', 'http-equiv', 'itemprop'],
        },
      },
      itemprop: {
        allowed: { type: 'allowedIfAttributeIsAbsent', attrs: ['http-equiv', 'name'] },
      },
      name: {
        allowed: { type: 'allowedIfAttributeIsAbsent', attrs: ['http-equiv', 'itemprop'] },
      },
      'http-equiv': {
        allowed: { type: 'allowedIfAttributeIsAbsent', attrs: ['name', 'itemprop'] },
      },
    },
  },

  meter: {
    flow: true,
    phrasing: true,
    labelable: true,
    permittedContent: ['@phrasing'],
    forbiddenDescendant: ['meter'],
  },

  nav: {
    flow: true,
    sectioning: true,
    permittedContent: ['@flow'],
    forbiddenDescendant: ['main'],
  },

  noscript: {
    meta: true,
    flow: true,
    phrasing: true,
    transparent: true,
    forbiddenDescendant: ['noscript'],
  },

  object: {
    flow: true,
    phrasing: true,
    embedded: true,
    interactive: ['hasAttribute', 'usemap'],
    transparent: true,
    formAssociated: {
      listed: true,
    },
    attributes: {
      blocking: {
        data: { type: 'enum', value: ['render'] },
      },
      data: {
        validation: '/.+/',
        required: true,
      },
      name: {
        validation: '/[^_].*/',
      },
    },
    permittedContent: ['param', '@flow'],
    permittedOrder: ['param', '@flow'],
  },

  ol: {
    flow: true,
    attributes: {
      reversed: {
        data: { type: 'boolean' },
      },
      type: {
        data: { type: 'enum', value: ['a', 'A', 'i', 'I', '1'] },
      },
    },
    // permittedContent: ['@script', 'li'],
    permittedContent: ['li'],
  },

  optgroup: {
    implicitClosed: ['optgroup'],
    attributes: {
      disabled: {
        data: { type: 'boolean' },
      },
    },
    permittedContent: ['option'],
  },

  option: {
    implicitClosed: ['option'],
    attributes: {
      disabled: {
        data: { type: 'boolean' },
      },
      selected: {
        data: { type: 'boolean' },
      },
    },
  },

  output: {
    flow: true,
    phrasing: true,
    formAssociated: {
      listed: true,
    },
    labelable: true,
    permittedContent: ['@phrasing'],
  },

  p: {
    flow: true,
    implicitClosed: [
      'address',
      'article',
      'aside',
      'blockquote',
      'div',
      'dl',
      'fieldset',
      'footer',
      'form',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'header',
      'hgroup',
      'hr',
      'main',
      'nav',
      'ol',
      'p',
      'pre',
      'section',
      'table',
      'ul',
    ],
    permittedContent: ['@phrasing'],
  },

  param: {
    void: true,
  },

  picture: {
    flow: true,
    phrasing: true,
    embedded: true,
    // permittedContent: ['@script', 'source', 'img'],
    permittedContent: ['source', 'img'],
    permittedOrder: ['source', 'img'],
  },

  pre: {
    flow: true,
    permittedContent: ['@phrasing'],
  },

  progress: {
    flow: true,
    phrasing: true,
    labelable: true,
    permittedContent: ['@phrasing'],
    forbiddenDescendant: ['progress'],
  },

  q: {
    flow: true,
    phrasing: true,
    permittedContent: ['@phrasing'],
  },

  rb: {
    implicitClosed: ['rb', 'rt', 'rtc', 'rp'],
    permittedContent: ['@phrasing'],
  },

  rp: {
    implicitClosed: ['rb', 'rt', 'rtc', 'rp'],
    permittedContent: ['@phrasing'],
  },

  rt: {
    implicitClosed: ['rb', 'rt', 'rtc', 'rp'],
    permittedContent: ['@phrasing'],
  },

  rtc: {
    implicitClosed: ['rb', 'rtc', 'rp'],
    permittedContent: ['@phrasing', 'rt'],
  },

  ruby: {
    flow: true,
    phrasing: true,
    permittedContent: ['@phrasing', 'rb', 'rp', 'rt', 'rtc'],
  },

  s: {
    flow: true,
    phrasing: true,
    permittedContent: ['@phrasing'],
  },

  samp: {
    flow: true,
    phrasing: true,
    permittedContent: ['@phrasing'],
  },

  script: {
    meta: true,
    flow: true,
    phrasing: true,
    scriptSupporting: true,
    attributes: {
      async: {
        data: { type: 'boolean' },
      },
      crossorigin: {
        omit: true,
        data: { type: 'enum', value: ['anonymous', 'use-credentials'] },
      },
      defer: {
        data: { type: 'boolean' },
      },
      integrity: {
        allowed: { type: 'allowedIfAttributeIsPresent', attrs: ['src'] },
        validation: '/.+/',
      },
      nomodule: {
        data: { type: 'boolean' },
      },
      src: {
        validation: '/.+/',
      },
    },
  },

  section: {
    flow: true,
    sectioning: true,
    permittedContent: ['@flow'],
  },

  select: {
    flow: true,
    phrasing: true,
    interactive: true,
    formAssociated: {
      listed: true,
    },
    labelable: true,
    attributes: {
      autofocus: {
        data: { type: 'boolean' },
      },
      disabled: {
        data: { type: 'boolean' },
      },
      multiple: {
        data: { type: 'boolean' },
      },
      required: {
        data: { type: 'boolean' },
      },
      size: {
        data: { type: 'number' },
      },
    },
    // permittedContent: ['@script', 'datasrc', 'datafld', 'dataformatas', 'option', 'optgroup'],
    permittedContent: ['option', 'optgroup'],
  },

  slot: {
    flow: true,
    phrasing: true,
    transparent: true,
  },

  small: {
    flow: true,
    phrasing: true,
    permittedContent: ['@phrasing'],
  },

  source: {
    void: true,
  },

  span: {
    flow: true,
    phrasing: true,
    permittedContent: ['@phrasing'],
  },

  strong: {
    flow: true,
    phrasing: true,
    permittedContent: ['@phrasing'],
  },

  style: {
    meta: true,
  },

  sub: {
    flow: true,
    phrasing: true,
    permittedContent: ['@phrasing'],
  },

  summary: {
    permittedContent: ['@phrasing', '@heading'],
  },

  sup: {
    flow: true,
    phrasing: true,
    permittedContent: ['@phrasing'],
  },

  svg: {
    flow: true,
    foreign: true,
    phrasing: true,
    embedded: true,
  },

  /* while not part of HTML 5 specification these two elements are handled as
   * special cases to allow them as accessible text and to avoid issues with
   * "no-unknown-elements" they are added here */
  'svg:desc': {},
  'svg:title': {},

  table: {
    flow: true,
    // permittedContent: ['@script', 'caption?', 'colgroup', 'tbody', 'tfoot?', 'thead?', 'tr'],
    permittedOrder: ['caption', 'colgroup', 'thead', 'tbody', 'tr', 'tfoot'],
  },

  tbody: {
    implicitClosed: ['tbody', 'tfoot'],
    // permittedContent: ['@script', 'tr'],
    permittedContent: ['script', 'tr'],
  },

  td: {
    flow: true,
    implicitClosed: ['td', 'th'],
    attributes: {
      colspan: {
        data: { type: 'number' },
      },
      rowspan: {
        data: { type: 'number' },
      },
    },
    permittedContent: ['@flow'],
  },

  template: {
    meta: true,
    flow: true,
    phrasing: true,
    scriptSupporting: true,
  },

  textarea: {
    flow: true,
    phrasing: true,
    interactive: true,
    formAssociated: {
      listed: true,
    },
    labelable: true,
    attributes: {
      autocomplete: {
        data: { type: 'enum', value: ['on', 'off'] },
      },
      autofocus: {
        data: { type: 'boolean' },
      },
      cols: {
        data: { type: 'number' },
      },
      disabled: {
        data: { type: 'boolean' },
      },
      maxlength: {
        data: { type: 'number' },
      },
      minlength: {
        data: { type: 'number' },
      },
      readonly: {
        data: { type: 'boolean' },
      },
      required: {
        data: { type: 'boolean' },
      },
      rows: {
        data: { type: 'number' },
      },
      spellcheck: {
        data: { type: 'enum', value: ['true', 'default', 'false'] },
      },
      wrap: {
        data: { type: 'enum', value: ['hard', 'soft'] },
      },
    },
  },

  tfoot: {
    implicitClosed: ['tbody'],
    // permittedContent: ['@script', 'tr'],
    permittedContent: ['tr'],
  },

  th: {
    flow: true,
    implicitClosed: ['td', 'th'],
    attributes: {
      colspan: {
        data: { type: 'number' },
      },
      rowspan: {
        data: { type: 'number' },
      },
      scope: {
        data: { type: 'enum', value: ['row', 'col', 'rowgroup', 'colgroup'] },
      },
    },
    permittedContent: ['@flow'],
    forbiddenDescendant: ['header', 'footer', '@sectioning', '@heading'],
  },

  thead: {
    implicitClosed: ['tbody', 'tfoot'],
    // permittedContent: ['@script', 'tr'],
    permittedContent: ['tr'],
  },

  time: {
    flow: true,
    phrasing: true,
    permittedContent: ['@phrasing'],
  },

  title: {
    meta: true,
    permittedParent: ['head'],
  },

  tr: {
    implicitClosed: ['tr'],
    // permittedContent: ['@script', 'td', 'th'],
    permittedContent: ['td', 'th'],
  },

  track: {
    void: true,
  },

  u: {
    flow: true,
    phrasing: true,
    permittedContent: ['@phrasing'],
  },

  ul: {
    flow: true,
    // permittedContent: ['@script', 'li'],
    permittedContent: ['li'],
  },

  var: {
    flow: true,
    phrasing: true,
    permittedContent: ['@phrasing'],
  },

  video: {
    flow: true,
    phrasing: true,
    embedded: true,
    interactive: ['hasAttribute', 'controls'],
    transparent: ['@flow'],
    attributes: {
      src: {
        validation: '/.+/',
      },
      crossorigin: {
        omit: true,
        data: { type: 'enum', value: ['anonymous', 'use-credentials'] },
      },
      itemprop: {
        allowed: { type: 'allowedIfAttributeIsPresent', attrs: ['src'] },
      },
      preload: {
        omit: true,
        data: { type: 'enum', value: ['none', 'metadata', 'auto'] },
      },
    },
    permittedContent: ['@flow', 'track', 'source'],
    forbiddenDescendant: ['audio', 'video'],
    permittedOrder: ['source', 'track', '@flow'],
  },

  wbr: {
    flow: true,
    phrasing: true,
    void: true,
  },
};
