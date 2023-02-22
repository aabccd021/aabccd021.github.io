/* eslint-disable */
export type globalAttributes = {
    readonly 'accesskey' ?: string;
    readonly 'class' ?: string;
    readonly 'contenteditable' ?: 'true'|'false';
    readonly 'dir' ?: 'ltr'|'rtl'|'auto';
    readonly 'draggable' ?: 'true'|'false';
    readonly 'hidden' ?: true;
    readonly 'id' ?: string;
    readonly 'lang' ?: string;
    readonly 'spellcheck' ?: string;
    readonly 'style' ?: string;
    readonly 'tabindex' ?: number;
    readonly 'title' ?: string;
    readonly 'translate' ?: string;
};

export type a = {
  readonly type: 'a';
  readonly attributes: globalAttributes & {
    readonly 'download' ?: string;
    readonly 'href' ?: string;
    readonly 'hreflang' ?: string;
    readonly 'itemprop' ?: string;
    readonly 'ping' ?: string;
    readonly 'referrerpolicy' ?: string;
    readonly 'rel' ?: string;
    readonly 'target' ?: '_blank'|'_self'|'_parent'|'_top';
    readonly 'type' ?: string;
  };
};

export const a = (attributes: {
    readonly 'hreflang' ?: string;
    readonly 'itemprop' ?: string;
    readonly 'ping' ?: string;
    readonly 'referrerpolicy' ?: string;
    readonly 'rel' ?: string;
    readonly 'target' ?: '_blank'|'_self'|'_parent'|'_top';
    readonly 'type' ?: string;
  } & ({
   readonly    href: string;
   readonly    download?: string
  } | {}
  )) : a => ({
    type: 'a',
    attributes
  })

export const aab: a = a({
  href: 'a',
  download: 'a',
})

// @ts-expect-error
export const aab2: a = a({
  // href: 'a',
  download: 'a',
})

export const aab3: a = a({
  href: 'a',
  // download: 'a',
})

export const aab4: a = a({
  // href: 'a',
  // download: 'a',
})




export type abbr = {
  readonly type: 'abbr';
  readonly attributes: globalAttributes & {
  };
};

export type address = {
  readonly type: 'address';
  readonly attributes: globalAttributes & {
  };
};

export type area = {
  readonly type: 'area';
  readonly attributes: globalAttributes & {
    readonly 'coords' ?: string;
    readonly 'download' ?: string;
    readonly 'itemprop' ?: string;
    readonly 'ping' ?: string;
    readonly 'referrerpolicy' ?: string;
    readonly 'rel' ?: string;
    readonly 'shape' ?: 'rect'|'circle'|'poly'|'default';
    readonly 'target' ?: '_blank'|'_self'|'_parent'|'_top';
  };
};

export type article = {
  readonly type: 'article';
  readonly attributes: globalAttributes & {
  };
};

export type aside = {
  readonly type: 'aside';
  readonly attributes: globalAttributes & {
  };
};

export type audio = {
  readonly type: 'audio';
  readonly attributes: globalAttributes & {
    readonly 'crossorigin' ?: 'anonymous'|'use-credentials';
    readonly 'itemprop' ?: string;
    readonly 'preload' ?: 'none'|'metadata'|'auto';
  };
};

export type b = {
  readonly type: 'b';
  readonly attributes: globalAttributes & {
  };
};

export type base = {
  readonly type: 'base';
  readonly attributes: globalAttributes & {
  };
};

export type bdi = {
  readonly type: 'bdi';
  readonly attributes: globalAttributes & {
  };
};

export type bdo = {
  readonly type: 'bdo';
  readonly attributes: globalAttributes & {
  };
};

export type blockquote = {
  readonly type: 'blockquote';
  readonly attributes: globalAttributes & {
  };
};

export type body = {
  readonly type: 'body';
  readonly attributes: globalAttributes & {
  };
};

export type br = {
  readonly type: 'br';
  readonly attributes: globalAttributes & {
  };
};

export type button = {
  readonly type: 'button';
  readonly attributes: globalAttributes & {
    readonly 'autofocus' ?: true;
    readonly 'disabled' ?: true;
    readonly 'formaction' ?: string;
    readonly 'formenctype' ?: string;
    readonly 'formmethod' ?: 'get'|'post'|'dialog';
    readonly 'formnovalidate' ?: true;
    readonly 'formtarget' ?: '_blank'|'_self'|'_parent'|'_top';
    readonly 'type' : 'submit'|'reset'|'button';
  };
};

export type canvas = {
  readonly type: 'canvas';
  readonly attributes: globalAttributes & {
  };
};

export type caption = {
  readonly type: 'caption';
  readonly attributes: globalAttributes & {
  };
};

export type cite = {
  readonly type: 'cite';
  readonly attributes: globalAttributes & {
  };
};

export type code = {
  readonly type: 'code';
  readonly attributes: globalAttributes & {
  };
};

export type col = {
  readonly type: 'col';
  readonly attributes: globalAttributes & {
    readonly 'span' ?: number;
  };
};

export type colgroup = {
  readonly type: 'colgroup';
  readonly attributes: globalAttributes & {
    readonly 'span' ?: number;
  };
};

export type data = {
  readonly type: 'data';
  readonly attributes: globalAttributes & {
  };
};

export type datalist = {
  readonly type: 'datalist';
  readonly attributes: globalAttributes & {
  };
};

export type dd = {
  readonly type: 'dd';
  readonly attributes: globalAttributes & {
  };
};

export type del = {
  readonly type: 'del';
  readonly attributes: globalAttributes & {
  };
};

export type details = {
  readonly type: 'details';
  readonly attributes: globalAttributes & {
    readonly 'open' ?: true;
  };
};

export type dfn = {
  readonly type: 'dfn';
  readonly attributes: globalAttributes & {
  };
};

export type dialog = {
  readonly type: 'dialog';
  readonly attributes: globalAttributes & {
    readonly 'open' ?: true;
  };
};

export type div = {
  readonly type: 'div';
  readonly attributes: globalAttributes & {
  };
};

export type dl = {
  readonly type: 'dl';
  readonly attributes: globalAttributes & {
  };
};

export type dt = {
  readonly type: 'dt';
  readonly attributes: globalAttributes & {
  };
};

export type em = {
  readonly type: 'em';
  readonly attributes: globalAttributes & {
  };
};

export type embed = {
  readonly type: 'embed';
  readonly attributes: globalAttributes & {
    readonly 'src' : string;
    readonly 'title' : string;
  };
};

export type fieldset = {
  readonly type: 'fieldset';
  readonly attributes: globalAttributes & {
    readonly 'disabled' ?: true;
  };
};

export type figcaption = {
  readonly type: 'figcaption';
  readonly attributes: globalAttributes & {
  };
};

export type figure = {
  readonly type: 'figure';
  readonly attributes: globalAttributes & {
  };
};

export type footer = {
  readonly type: 'footer';
  readonly attributes: globalAttributes & {
  };
};

export type form = {
  readonly type: 'form';
  readonly attributes: globalAttributes & {
    readonly 'action' ?: string;
    readonly 'autocomplete' ?: 'on'|'off';
    readonly 'method' ?: 'get'|'post'|'dialog';
    readonly 'novalidate' ?: true;
    readonly 'target' ?: '_blank'|'_self'|'_parent'|'_top';
  };
};

export type h1 = {
  readonly type: 'h1';
  readonly attributes: globalAttributes & {
  };
};

export type h2 = {
  readonly type: 'h2';
  readonly attributes: globalAttributes & {
  };
};

export type h3 = {
  readonly type: 'h3';
  readonly attributes: globalAttributes & {
  };
};

export type h4 = {
  readonly type: 'h4';
  readonly attributes: globalAttributes & {
  };
};

export type h5 = {
  readonly type: 'h5';
  readonly attributes: globalAttributes & {
  };
};

export type h6 = {
  readonly type: 'h6';
  readonly attributes: globalAttributes & {
  };
};

export type head = {
  readonly type: 'head';
  readonly attributes: globalAttributes & {
  };
};

export type header = {
  readonly type: 'header';
  readonly attributes: globalAttributes & {
  };
};

export type hgroup = {
  readonly type: 'hgroup';
  readonly attributes: globalAttributes & {
  };
};

export type hr = {
  readonly type: 'hr';
  readonly attributes: globalAttributes & {
  };
};

export type html = {
  readonly type: 'html';
  readonly attributes: globalAttributes & {
    readonly 'lang' : string;
  };
};

export type i = {
  readonly type: 'i';
  readonly attributes: globalAttributes & {
  };
};

export type iframe = {
  readonly type: 'iframe';
  readonly attributes: globalAttributes & {
    readonly 'src' ?: string;
    readonly 'title' : string;
  };
};

export type img = {
  readonly type: 'img';
  readonly attributes: globalAttributes & {
    readonly 'crossorigin' ?: 'anonymous'|'use-credentials';
    readonly 'decoding' ?: 'sync'|'async'|'auto';
    readonly 'ismap' ?: true;
    readonly 'src' : string;
    readonly 'srcset' ?: string;
  };
};

export type input = {
  readonly type: 'input';
  readonly attributes: globalAttributes & {
    readonly 'autofocus' ?: true;
    readonly 'capture' ?: 'environment'|'user';
    readonly 'checked' ?: true;
    readonly 'disabled' ?: true;
    readonly 'formaction' ?: string;
    readonly 'formenctype' ?: string;
    readonly 'formmethod' ?: 'get'|'post'|'dialog';
    readonly 'formnovalidate' ?: true;
    readonly 'formtarget' ?: '_blank'|'_self'|'_parent'|'_top';
    readonly 'inputmode' ?: 'none'|'text'|'decimal'|'numeric'|'tel'|'search'|'email'|'url';
    readonly 'multiple' ?: true;
    readonly 'readonly' ?: true;
    readonly 'required' ?: true;
    readonly 'spellcheck' ?: 'default'|'false'|'true';
    readonly 'type' : 'button'|'checkbox'|'color'|'date'|'datetime-local'|'email'|'file'|'hidden'|'image'|'month'|'number'|'password'|'radio'|'range'|'reset'|'search'|'submit'|'tel'|'text'|'time'|'url'|'week';
  };
};

export type ins = {
  readonly type: 'ins';
  readonly attributes: globalAttributes & {
  };
};

export type kbd = {
  readonly type: 'kbd';
  readonly attributes: globalAttributes & {
  };
};

export type label = {
  readonly type: 'label';
  readonly attributes: globalAttributes & {
  };
};

export type legend = {
  readonly type: 'legend';
  readonly attributes: globalAttributes & {
  };
};

export type li = {
  readonly type: 'li';
  readonly attributes: globalAttributes & {
  };
};

export type link = {
  readonly type: 'link';
  readonly attributes: globalAttributes & {
    readonly 'as' ?: 'audio'|'audioworklet'|'document'|'embed'|'fetch'|'font'|'frame'|'iframe'|'image'|'manifest'|'object'|'paintworklet'|'report'|'script'|'serviceworker'|'sharedworker'|'style'|'track'|'video'|'webidentity'|'worker'|'xslt';
    readonly 'blocking' ?: 'render';
    readonly 'crossorigin' ?: 'anonymous'|'use-credentials';
    readonly 'disabled' ?: true;
    readonly 'href' : string;
    readonly 'integrity' ?: string;
  };
};

export type main = {
  readonly type: 'main';
  readonly attributes: globalAttributes & {
  };
};

export type map = {
  readonly type: 'map';
  readonly attributes: globalAttributes & {
    readonly 'name' : string;
  };
};

export type mark = {
  readonly type: 'mark';
  readonly attributes: globalAttributes & {
  };
};

export type math = {
  readonly type: 'math';
  readonly attributes: globalAttributes & {
    readonly 'dir' ?: 'ltr'|'rtl';
    readonly 'display' ?: 'block'|'inline';
    readonly 'overflow' ?: 'linebreak'|'scroll'|'elide'|'truncate'|'scale';
  };
};

export type menu = {
  readonly type: 'menu';
  readonly attributes: globalAttributes & {
  };
};

export type meta = {
  readonly type: 'meta';
  readonly attributes: globalAttributes & {
    readonly 'charset' ?: 'utf-8';
    readonly 'content' ?: string;
    readonly 'http-equiv' ?: string;
    readonly 'itemprop' ?: string;
    readonly 'name' ?: string;
  };
};

export type meter = {
  readonly type: 'meter';
  readonly attributes: globalAttributes & {
  };
};

export type nav = {
  readonly type: 'nav';
  readonly attributes: globalAttributes & {
  };
};

export type noscript = {
  readonly type: 'noscript';
  readonly attributes: globalAttributes & {
  };
};

export type object_ = {
  readonly type: 'object_';
  readonly attributes: globalAttributes & {
    readonly 'blocking' ?: 'render';
    readonly 'data' : string;
    readonly 'name' ?: string;
  };
};

export type ol = {
  readonly type: 'ol';
  readonly attributes: globalAttributes & {
    readonly 'reversed' ?: true;
    readonly 'type' ?: 'a'|'A'|'i'|'I'|'1';
  };
};

export type optgroup = {
  readonly type: 'optgroup';
  readonly attributes: globalAttributes & {
    readonly 'disabled' ?: true;
  };
};

export type option = {
  readonly type: 'option';
  readonly attributes: globalAttributes & {
    readonly 'disabled' ?: true;
    readonly 'selected' ?: true;
  };
};

export type output = {
  readonly type: 'output';
  readonly attributes: globalAttributes & {
  };
};

export type p = {
  readonly type: 'p';
  readonly attributes: globalAttributes & {
  };
};

export type param = {
  readonly type: 'param';
  readonly attributes: globalAttributes & {
  };
};

export type picture = {
  readonly type: 'picture';
  readonly attributes: globalAttributes & {
  };
};

export type pre = {
  readonly type: 'pre';
  readonly attributes: globalAttributes & {
  };
};

export type progress = {
  readonly type: 'progress';
  readonly attributes: globalAttributes & {
  };
};

export type q = {
  readonly type: 'q';
  readonly attributes: globalAttributes & {
  };
};

export type rb = {
  readonly type: 'rb';
  readonly attributes: globalAttributes & {
  };
};

export type rp = {
  readonly type: 'rp';
  readonly attributes: globalAttributes & {
  };
};

export type rt = {
  readonly type: 'rt';
  readonly attributes: globalAttributes & {
  };
};

export type rtc = {
  readonly type: 'rtc';
  readonly attributes: globalAttributes & {
  };
};

export type ruby = {
  readonly type: 'ruby';
  readonly attributes: globalAttributes & {
  };
};

export type s = {
  readonly type: 's';
  readonly attributes: globalAttributes & {
  };
};

export type samp = {
  readonly type: 'samp';
  readonly attributes: globalAttributes & {
  };
};

export type script = {
  readonly type: 'script';
  readonly attributes: globalAttributes & {
    readonly 'async' ?: true;
    readonly 'crossorigin' ?: 'anonymous'|'use-credentials';
    readonly 'defer' ?: true;
    readonly 'integrity' ?: string;
    readonly 'nomodule' ?: true;
    readonly 'src' ?: string;
  };
};

export type section = {
  readonly type: 'section';
  readonly attributes: globalAttributes & {
  };
};

export type select = {
  readonly type: 'select';
  readonly attributes: globalAttributes & {
    readonly 'autofocus' ?: true;
    readonly 'disabled' ?: true;
    readonly 'multiple' ?: true;
    readonly 'required' ?: true;
    readonly 'size' ?: number;
  };
};

export type slot = {
  readonly type: 'slot';
  readonly attributes: globalAttributes & {
  };
};

export type small = {
  readonly type: 'small';
  readonly attributes: globalAttributes & {
  };
};

export type source = {
  readonly type: 'source';
  readonly attributes: globalAttributes & {
  };
};

export type span = {
  readonly type: 'span';
  readonly attributes: globalAttributes & {
  };
};

export type strong = {
  readonly type: 'strong';
  readonly attributes: globalAttributes & {
  };
};

export type style = {
  readonly type: 'style';
  readonly attributes: globalAttributes & {
  };
};

export type sub = {
  readonly type: 'sub';
  readonly attributes: globalAttributes & {
  };
};

export type summary = {
  readonly type: 'summary';
  readonly attributes: globalAttributes & {
  };
};

export type sup = {
  readonly type: 'sup';
  readonly attributes: globalAttributes & {
  };
};

export type svg = {
  readonly type: 'svg';
  readonly attributes: globalAttributes & {
  };
};

export type table = {
  readonly type: 'table';
  readonly attributes: globalAttributes & {
  };
};

export type tbody = {
  readonly type: 'tbody';
  readonly attributes: globalAttributes & {
  };
};

export type td = {
  readonly type: 'td';
  readonly attributes: globalAttributes & {
    readonly 'colspan' ?: number;
    readonly 'rowspan' ?: number;
  };
};

export type template = {
  readonly type: 'template';
  readonly attributes: globalAttributes & {
  };
};

export type textarea = {
  readonly type: 'textarea';
  readonly attributes: globalAttributes & {
    readonly 'autocomplete' ?: 'on'|'off';
    readonly 'autofocus' ?: true;
    readonly 'cols' ?: number;
    readonly 'disabled' ?: true;
    readonly 'maxlength' ?: number;
    readonly 'minlength' ?: number;
    readonly 'readonly' ?: true;
    readonly 'required' ?: true;
    readonly 'rows' ?: number;
    readonly 'spellcheck' ?: 'true'|'default'|'false';
    readonly 'wrap' ?: 'hard'|'soft';
  };
};

export type tfoot = {
  readonly type: 'tfoot';
  readonly attributes: globalAttributes & {
  };
};

export type th = {
  readonly type: 'th';
  readonly attributes: globalAttributes & {
    readonly 'colspan' ?: number;
    readonly 'rowspan' ?: number;
    readonly 'scope' ?: 'row'|'col'|'rowgroup'|'colgroup';
  };
};

export type thead = {
  readonly type: 'thead';
  readonly attributes: globalAttributes & {
  };
};

export type time = {
  readonly type: 'time';
  readonly attributes: globalAttributes & {
  };
};

export type title = {
  readonly type: 'title';
  readonly attributes: globalAttributes & {
  };
};

export type tr = {
  readonly type: 'tr';
  readonly attributes: globalAttributes & {
  };
};

export type track = {
  readonly type: 'track';
  readonly attributes: globalAttributes & {
  };
};

export type u = {
  readonly type: 'u';
  readonly attributes: globalAttributes & {
  };
};

export type ul = {
  readonly type: 'ul';
  readonly attributes: globalAttributes & {
  };
};

export type var_ = {
  readonly type: 'var_';
  readonly attributes: globalAttributes & {
  };
};

export type video = {
  readonly type: 'video';
  readonly attributes: globalAttributes & {
    readonly 'crossorigin' ?: 'anonymous'|'use-credentials';
    readonly 'itemprop' ?: string;
    readonly 'preload' ?: 'none'|'metadata'|'auto';
  };
};

export type wbr = {
  readonly type: 'wbr';
  readonly attributes: globalAttributes & {
  };
};
