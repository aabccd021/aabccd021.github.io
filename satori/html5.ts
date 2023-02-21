import type { ReadonlyNonEmptyArray } from 'fp-ts/ReadonlyNonEmptyArray';
/* eslint-disable max-len */
// Copied from https://gitlab.com/html-validate/html-validate/-/blob/d19def8fc92bdd5e586f231eb16cef7dcfd0a02b/src/elements/html5.ts

export type PermittedGroup = {
  readonly exclude?: ReadonlyNonEmptyArray<string>;
};

export type CategoryOrTag = string;
export type PropertyExpression = string | readonly [string, unknown];
export type PermittedEntry =
  | CategoryOrTag
  | PermittedGroup
  | readonly (CategoryOrTag | PermittedGroup)[];
export type Permitted = readonly PermittedEntry[];

export type PermittedOrder = readonly string[];
export type RequiredAncestors = readonly string[];
export type RequiredContent = readonly string[];

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

const allowedIfAttributeIsPresent = (...attrs: readonly string[]) => ({
  type: 'allowedIfAttributeIsPresent',
  attrs,
});

const allowedIfAttributeHasValue = (
  key: string,
  expectedValue: readonly string[],
  { defaultValue }: { readonly defaultValue?: string | null } = {}
) => ({
  type: 'allowedIfAttributeHasValue ',
  key,
  expectedValue,
  defaultValue,
});

const allowedIfAttributeIsAbsent = (...attrs: readonly string[]) => ({
  type: 'allowedIfAttributeIsAbsent ',
  attrs,
});

/**
 * @public
 */
export type MetaAttribute = {
  /* If set it should be a function evaluating to an error message or null if
   * the attribute is allowed */
  readonly allowed?:
    | ReturnType<typeof allowedIfAttributeHasValue>
    | ReturnType<typeof allowedIfAttributeIsAbsent>
    | ReturnType<typeof allowedIfAttributeIsPresent>;

  /* if true this attribute can only take boolean values: my-attr, my-attr="" or my-attr="my-attr" */
  readonly type?:
    | {
        readonly type: 'boolean';
      }
    | {
        readonly type: 'enum';
        readonly value: readonly string[];
      }
    | {
        readonly type: 'number';
      };

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

/**
 * @public
 */
export type MetaData = {
  /* special keyword to extend metadata from another entry */
  readonly inherit?: string;

  /* content categories */
  readonly metadata?: PropertyExpression | boolean;
  readonly flow?: PropertyExpression | boolean;
  readonly sectioning?: PropertyExpression | boolean;
  readonly heading?: PropertyExpression | boolean;
  readonly phrasing?: PropertyExpression | boolean;
  readonly embedded?: PropertyExpression | boolean;
  readonly interactive?: PropertyExpression | boolean;

  /* element properties */
  readonly foreign?: boolean;
  readonly void?: boolean;
  readonly transparent?: boolean | readonly string[];
  readonly implicitClosed?: readonly string[];
  readonly scriptSupporting?: boolean;
  readonly form?: boolean;
  /** Mark element as a form-associated element */
  readonly formAssociated?: Partial<FormAssociated>;
  readonly labelable?: PropertyExpression | boolean;

  /* attribute */
  readonly attributes?: PermittedAttribute;

  /* permitted data */
  readonly permittedContent?: Permitted;
  readonly permittedDescendants?: PermittedGroup;
  readonly permittedOrder?: PermittedOrder;
  readonly permittedParent?: Permitted;
  readonly requiredAncestors?: RequiredAncestors;
  readonly requiredContent?: RequiredContent;
  readonly textContent?: TextContent | `${TextContent}`;
};

export type MetaDataTable = Record<string, MetaData>;

export const globalAttributes: PermittedAttribute = {
  contenteditable: {
    omit: true,
    type: { type: 'enum', value: ['true', 'false'] },
  },
  dir: {
    type: { type: 'enum', value: ['ltr', 'rtl', 'auto'] },
  },
  draggable: {
    type: { type: 'enum', value: ['true', 'false'] },
  },
  hidden: {
    type: { type: 'boolean' },
  },
  id: {
    type: { type: 'enum', value: ['/\\S+/'] },
  },
  tabindex: {
    type: { type: 'number' },
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
        allowed: allowedIfAttributeIsPresent('href'),
        omit: true,
        type: { type: 'enum', value: ['/.+/'] },
      },
      href: {
        type: { type: 'enum', value: ['/.*/'] },
      },
      hreflang: {
        allowed: allowedIfAttributeIsPresent('href'),
      },
      itemprop: {
        allowed: allowedIfAttributeIsPresent('href'),
      },
      ping: {
        allowed: allowedIfAttributeIsPresent('href'),
      },
      referrerpolicy: {
        allowed: allowedIfAttributeIsPresent('href'),
      },
      rel: {
        allowed: allowedIfAttributeIsPresent('href'),
      },
      target: {
        allowed: allowedIfAttributeIsPresent('href'),
        type: { type: 'enum', value: ['/[^_].*/', '_blank', '_self', '_parent', '_top'] },
      },
      type: {
        allowed: allowedIfAttributeIsPresent('href'),
      },
    },
    permittedDescendants: { exclude: ['@interactive'] },
  },

  abbr: {
    flow: true,
    phrasing: true,
    permittedContent: ['@phrasing'],
  },

  address: {
    flow: true,
    permittedContent: ['@flow'],
    permittedDescendants: { exclude: ['address', 'header', 'footer', '@heading', '@sectioning'] },
  },

  area: {
    flow: ['isDescendant', 'map'],
    phrasing: ['isDescendant', 'map'],
    void: true,
    attributes: {
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
        allowed: allowedIfAttributeIsPresent('href'),
      },
      itemprop: {
        allowed: allowedIfAttributeIsPresent('href'),
      },
      ping: {
        allowed: allowedIfAttributeIsPresent('href'),
      },
      referrerpolicy: {
        allowed: allowedIfAttributeIsPresent('href'),
      },
      rel: {
        allowed: allowedIfAttributeIsPresent('href'),
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
        type: { type: 'enum', value: ['rect', 'circle', 'poly', 'default'] },
      },
      target: {
        allowed: allowedIfAttributeIsPresent('href'),
        type: { type: 'enum', value: ['/[^_].*/', '_blank', '_self', '_parent', '_top'] },
      },
    },
    requiredAncestors: ['map'],
  },

  article: {
    flow: true,
    sectioning: true,
    permittedContent: ['@flow'],
    permittedDescendants: { exclude: ['main'] },
  },

  aside: {
    flow: true,
    sectioning: true,
    permittedContent: ['@flow'],
    permittedDescendants: { exclude: ['main'] },
  },

  audio: {
    flow: true,
    phrasing: true,
    embedded: true,
    interactive: ['hasAttribute', 'controls'],
    transparent: ['@flow'],
    attributes: {
      crossorigin: {
        omit: true,
        type: { type: 'enum', value: ['anonymous', 'use-credentials'] },
      },
      itemprop: {
        allowed: allowedIfAttributeIsPresent('src'),
      },
      preload: {
        omit: true,
        type: { type: 'enum', value: ['none', 'metadata', 'auto'] },
      },
    },
    permittedContent: ['@flow', 'track', 'source'],
    permittedDescendants: { exclude: ['audio', 'video'] },
    permittedOrder: ['source', 'track', '@flow'],
  },

  b: {
    flow: true,
    phrasing: true,
    permittedContent: ['@phrasing'],
  },

  base: {
    metadata: true,
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
        type: { type: 'boolean' },
      },
      disabled: {
        type: { type: 'boolean' },
      },
      formaction: {
        allowed: allowedIfAttributeHasValue('type', ['submit'], { defaultValue: 'submit' }),
      },
      formenctype: {
        allowed: allowedIfAttributeHasValue('type', ['submit'], { defaultValue: 'submit' }),
      },
      formmethod: {
        allowed: allowedIfAttributeHasValue('type', ['submit'], { defaultValue: 'submit' }),
        type: { type: 'enum', value: ['get', 'post', 'dialog'] },
      },
      formnovalidate: {
        allowed: allowedIfAttributeHasValue('type', ['submit'], { defaultValue: 'submit' }),
        type: { type: 'boolean' },
      },
      formtarget: {
        allowed: allowedIfAttributeHasValue('type', ['submit'], { defaultValue: 'submit' }),
        type: { type: 'enum', value: ['/[^_].*/', '_blank', '_self', '_parent', '_top'] },
      },
      type: {
        required: true,
        type: { type: 'enum', value: ['submit', 'reset', 'button'] },
      },
    },
    permittedContent: ['@phrasing'],
    permittedDescendants: { exclude: ['@interactive'] },
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
    permittedDescendants: { exclude: ['table'] },
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
        type: { type: 'number' },
      },
    },
    void: true,
  },

  colgroup: {
    implicitClosed: ['colgroup'],
    attributes: {
      span: {
        type: { type: 'number' },
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
        type: { type: 'boolean' },
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
    permittedDescendants: { exclude: ['dfn'] },
  },

  dialog: {
    flow: true,
    permittedContent: ['@flow'],
    attributes: {
      open: {
        type: { type: 'boolean' },
      },
    },
  },

  div: {
    flow: true,
    permittedContent: ['@flow', 'dt', 'dd'],
  },

  dl: {
    flow: true,
    permittedContent: ['@script', 'dt', 'dd', 'div'],
  },

  dt: {
    implicitClosed: ['dd', 'dt'],
    permittedContent: ['@flow'],
    permittedDescendants: { exclude: ['header', 'footer', '@sectioning', '@heading'] },
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
        type: { type: 'enum', value: ['/.+/'] },
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
        type: { type: 'boolean' },
      },
    },
    permittedContent: ['@flow', 'legend?'],
    permittedOrder: ['legend', '@flow'],
  },

  figcaption: {
    permittedContent: ['@flow'],
  },

  figure: {
    flow: true,
    permittedContent: ['@flow', 'figcaption?'],
    permittedOrder: ['figcaption', '@flow', 'figcaption'],
  },

  footer: {
    flow: true,
    permittedContent: ['@flow'],
    permittedDescendants: { exclude: ['header', 'footer', 'main'] },
  },

  form: {
    flow: true,
    form: true,
    attributes: {
      action: {
        // type: {type: 'enum', value: [/^\s*\S+\s*$/]},
      },
      autocomplete: {
        type: { type: 'enum', value: ['on', 'off'] },
      },
      method: {
        type: { type: 'enum', value: ['get', 'post', 'dialog'] },
      },
      novalidate: {
        type: { type: 'boolean' },
      },
      target: {
        type: { type: 'enum', value: ['/[^_].*/', '_blank', '_self', '_parent', '_top'] },
      },
    },
    permittedContent: ['@flow'],
    permittedDescendants: { exclude: ['@form'] },
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
    permittedContent: ['base?', 'title?', '@meta'],
    permittedParent: ['html'],
    requiredContent: ['title'],
  },

  header: {
    flow: true,
    permittedContent: ['@flow'],
    permittedDescendants: { exclude: ['header', 'footer', 'main'] },
  },

  hgroup: {
    flow: true,
    heading: true,
    permittedContent: ['p', '@heading?'],
    permittedDescendants: { exclude: ['hgroup'] },
    requiredContent: ['@heading'],
  },

  hr: {
    flow: true,
    void: true,
  },

  html: {
    permittedContent: ['head?', 'body?'],
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
        type: { type: 'enum', value: ['/.+/'] },
      },
      title: {
        required: true,
      },
    },
    permittedContent: [],
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
        type: { type: 'enum', value: ['anonymous', 'use-credentials'] },
      },
      decoding: {
        type: { type: 'enum', value: ['sync', 'async', 'auto'] },
      },
      ismap: {
        type: { type: 'boolean' },
      },
      src: {
        required: true,
        type: { type: 'enum', value: ['/.+/'] },
      },
      srcset: {
        type: { type: 'enum', value: ['/[^]+/'] },
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
        type: { type: 'boolean' },
      },
      capture: {
        omit: true,
        type: { type: 'enum', value: ['environment', 'user'] },
      },
      checked: {
        type: { type: 'boolean' },
      },
      disabled: {
        type: { type: 'boolean' },
      },
      formaction: {
        allowed: allowedIfAttributeHasValue('type', ['submit', 'image'], {
          defaultValue: 'submit',
        }),
      },
      formenctype: {
        allowed: allowedIfAttributeHasValue('type', ['submit', 'image'], {
          defaultValue: 'submit',
        }),
      },
      formmethod: {
        allowed: allowedIfAttributeHasValue('type', ['submit', 'image'], {
          defaultValue: 'submit',
        }),
        type: { type: 'enum', value: ['get', 'post', 'dialog'] },
      },
      formnovalidate: {
        allowed: allowedIfAttributeHasValue('type', ['submit', 'image'], {
          defaultValue: 'submit',
        }),
        type: { type: 'boolean' },
      },
      formtarget: {
        allowed: allowedIfAttributeHasValue('type', ['submit', 'image'], {
          defaultValue: 'submit',
        }),
        type: { type: 'enum', value: ['/[^_].*/', '_blank', '_self', '_parent', '_top'] },
      },
      inputmode: {
        type: {
          type: 'enum',
          value: ['none', 'text', 'decimal', 'numeric', 'tel', 'search', 'email', 'url'],
        },
      },
      multiple: {
        type: { type: 'boolean' },
      },
      readonly: {
        type: { type: 'boolean' },
      },
      required: {
        type: { type: 'boolean' },
      },
      spellcheck: {
        type: { type: 'enum', value: ['default', 'false', 'true'] },
      },
      type: {
        required: true,
        type: {
          type: 'enum',
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
    permittedDescendants: { exclude: ['label'] },
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
    metadata: true,
    void: true,
    attributes: {
      as: {
        allowed: allowedIfAttributeHasValue('rel', ['prefetch', 'preload', 'modulepreload']),
        type: {
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
        allowed: allowedIfAttributeHasValue('rel', ['stylesheet', 'preload', 'modulepreload']),
        type: { type: 'enum', value: ['render'] },
      },
      crossorigin: {
        omit: true,
        type: { type: 'enum', value: ['anonymous', 'use-credentials'] },
      },
      disabled: {
        allowed: allowedIfAttributeHasValue('rel', ['stylesheet']),
        type: { type: 'boolean' },
      },
      href: {
        required: true,
        type: { type: 'enum', value: ['/.+/'] },
      },
      integrity: {
        allowed: allowedIfAttributeHasValue('rel', ['stylesheet', 'preload', 'modulepreload']),
        type: { type: 'enum', value: ['/.+/'] },
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
        type: { type: 'enum', value: ['/\\S+/'] },
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
        type: { type: 'enum', value: ['ltr', 'rtl'] },
      },
      display: {
        type: { type: 'enum', value: ['block', 'inline'] },
      },
      overflow: {
        type: { type: 'enum', value: ['linebreak', 'scroll', 'elide', 'truncate', 'scale'] },
      },
    },
  },

  menu: {
    flow: true,
    permittedContent: ['@script', 'li'],
  },

  meta: {
    flow: ['hasAttribute', 'itemprop'],
    phrasing: ['hasAttribute', 'itemprop'],
    metadata: true,
    void: true,
    attributes: {
      charset: {
        type: { type: 'enum', value: ['utf-8'] },
      },
      content: {
        allowed: allowedIfAttributeIsPresent('name', 'http-equiv', 'itemprop', 'property'),
      },
      itemprop: {
        allowed: allowedIfAttributeIsAbsent('http-equiv', 'name'),
      },
      name: {
        allowed: allowedIfAttributeIsAbsent('http-equiv', 'itemprop'),
      },
      'http-equiv': {
        allowed: allowedIfAttributeIsAbsent('name', 'itemprop'),
      },
    },
  },

  meter: {
    flow: true,
    phrasing: true,
    labelable: true,
    permittedContent: ['@phrasing'],
    permittedDescendants: { exclude: ['meter'] },
  },

  nav: {
    flow: true,
    sectioning: true,
    permittedContent: ['@flow'],
    permittedDescendants: { exclude: ['main'] },
  },

  noscript: {
    metadata: true,
    flow: true,
    phrasing: true,
    transparent: true,
    permittedDescendants: { exclude: ['noscript'] },
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
        type: { type: 'enum', value: ['render'] },
      },
      data: {
        type: { type: 'enum', value: ['/.+/'] },
        required: true,
      },
      name: {
        type: { type: 'enum', value: ['/[^_].*/'] },
      },
    },
    permittedContent: ['param', '@flow'],
    permittedOrder: ['param', '@flow'],
  },

  ol: {
    flow: true,
    attributes: {
      reversed: {
        type: { type: 'boolean' },
      },
      type: {
        type: { type: 'enum', value: ['a', 'A', 'i', 'I', '1'] },
      },
    },
    permittedContent: ['@script', 'li'],
  },

  optgroup: {
    implicitClosed: ['optgroup'],
    attributes: {
      disabled: {
        type: { type: 'boolean' },
      },
    },
    permittedContent: ['@script', 'option'],
  },

  option: {
    implicitClosed: ['option'],
    attributes: {
      disabled: {
        type: { type: 'boolean' },
      },
      selected: {
        type: { type: 'boolean' },
      },
    },
    permittedContent: [],
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
    permittedContent: ['@script', 'source', 'img'],
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
    permittedDescendants: { exclude: ['progress'] },
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
    metadata: true,
    flow: true,
    phrasing: true,
    scriptSupporting: true,
    attributes: {
      async: {
        type: { type: 'boolean' },
      },
      crossorigin: {
        omit: true,
        type: { type: 'enum', value: ['anonymous', 'use-credentials'] },
      },
      defer: {
        type: { type: 'boolean' },
      },
      integrity: {
        allowed: allowedIfAttributeIsPresent('src'),
        type: { type: 'enum', value: ['/.+/'] },
      },
      nomodule: {
        type: { type: 'boolean' },
      },
      src: {
        type: { type: 'enum', value: ['/.+/'] },
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
        type: { type: 'boolean' },
      },
      disabled: {
        type: { type: 'boolean' },
      },
      multiple: {
        type: { type: 'boolean' },
      },
      required: {
        type: { type: 'boolean' },
      },
      size: {
        type: { type: 'number' },
      },
    },
    permittedContent: ['@script', 'datasrc', 'datafld', 'dataformatas', 'option', 'optgroup'],
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
    metadata: true,
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
    permittedContent: ['@script', 'caption?', 'colgroup', 'tbody', 'tfoot?', 'thead?', 'tr'],
    permittedOrder: ['caption', 'colgroup', 'thead', 'tbody', 'tr', 'tfoot'],
  },

  tbody: {
    implicitClosed: ['tbody', 'tfoot'],
    permittedContent: ['@script', 'tr'],
  },

  td: {
    flow: true,
    implicitClosed: ['td', 'th'],
    attributes: {
      colspan: {
        type: { type: 'number' },
      },
      rowspan: {
        type: { type: 'number' },
      },
    },
    permittedContent: ['@flow'],
  },

  template: {
    metadata: true,
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
        type: { type: 'enum', value: ['on', 'off'] },
      },
      autofocus: {
        type: { type: 'boolean' },
      },
      cols: {
        type: { type: 'number' },
      },
      disabled: {
        type: { type: 'boolean' },
      },
      maxlength: {
        type: { type: 'number' },
      },
      minlength: {
        type: { type: 'number' },
      },
      readonly: {
        type: { type: 'boolean' },
      },
      required: {
        type: { type: 'boolean' },
      },
      rows: {
        type: { type: 'number' },
      },
      spellcheck: {
        type: { type: 'enum', value: ['true', 'default', 'false'] },
      },
      wrap: {
        type: { type: 'enum', value: ['hard', 'soft'] },
      },
    },
    permittedContent: [],
  },

  tfoot: {
    implicitClosed: ['tbody'],
    permittedContent: ['@script', 'tr'],
  },

  th: {
    flow: true,
    implicitClosed: ['td', 'th'],
    attributes: {
      colspan: {
        type: { type: 'number' },
      },
      rowspan: {
        type: { type: 'number' },
      },
      scope: {
        type: { type: 'enum', value: ['row', 'col', 'rowgroup', 'colgroup'] },
      },
    },
    permittedContent: ['@flow'],
    permittedDescendants: { exclude: ['header', 'footer', '@sectioning', '@heading'] },
  },

  thead: {
    implicitClosed: ['tbody', 'tfoot'],
    permittedContent: ['@script', 'tr'],
  },

  time: {
    flow: true,
    phrasing: true,
    permittedContent: ['@phrasing'],
  },

  title: {
    metadata: true,
    permittedContent: [],
    permittedParent: ['head'],
  },

  tr: {
    implicitClosed: ['tr'],
    permittedContent: ['@script', 'td', 'th'],
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
    permittedContent: ['@script', 'li'],
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
      crossorigin: {
        omit: true,
        type: { type: 'enum', value: ['anonymous', 'use-credentials'] },
      },
      itemprop: {
        allowed: allowedIfAttributeIsPresent('src'),
      },
      preload: {
        omit: true,
        type: { type: 'enum', value: ['none', 'metadata', 'auto'] },
      },
    },
    permittedContent: ['@flow', 'track', 'source'],
    permittedDescendants: { exclude: ['audio', 'video'] },
    permittedOrder: ['source', 'track', '@flow'],
  },

  wbr: {
    flow: true,
    phrasing: true,
    void: true,
  },
};
