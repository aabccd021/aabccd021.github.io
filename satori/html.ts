export type GeneralAttributes = {
  readonly accesskey: string;
  readonly autocapitalize: string;
  readonly autofocus: string;
  readonly class: string;
  readonly contenteditable: string;
  readonly dir: string;
  readonly draggable: string;
  readonly enterkeyhint: string;
  readonly hidden: string;
  readonly id: string;
  readonly inputmode: string;
  readonly is: string;
  readonly itemid: string;
  readonly itemprop: string;
  readonly itemref: string;
  readonly itemscope: string;
  readonly itemtype: string;
  readonly lang: string;
  readonly nonce: string;
  readonly slot: string;
  readonly spellcheck: string;
  readonly style: string;
  readonly tabindex: string;
  readonly title: string;
  readonly translate: string;
};

export type a = GeneralAttributes & {
  readonly accesskey: string;
  readonly charset: string;
  readonly coords: string;
  readonly download: string;
  readonly href: string;
  readonly hreflang: string;
  readonly name: string;
  readonly ping: string;
  readonly referrerpolicy: string;
  readonly rel: string;
  readonly rev: string;
  readonly shape: string;
  readonly tabindex: string;
  readonly target: string;
  readonly type: string;
};

export type abbr = GeneralAttributes & { readonly title: string };

export type applet = GeneralAttributes & {
  readonly align: string;
  readonly alt: string;
  readonly archive: string;
  readonly code: string;
  readonly codebase: string;
  readonly height: string;
  readonly hspace: string;
  readonly name: string;
  readonly object: string;
  readonly vspace: string;
  readonly width: string;
};

export type area = GeneralAttributes & {
  readonly accesskey: string;
  readonly alt: string;
  readonly coords: string;
  readonly download: string;
  readonly href: string;
  readonly hreflang: string;
  readonly nohref: string;
  readonly ping: string;
  readonly referrerpolicy: string;
  readonly rel: string;
  readonly shape: string;
  readonly tabindex: string;
  readonly target: string;
  readonly type: string;
};

export type audio = GeneralAttributes & {
  readonly autoplay: string;
  readonly controls: string;
  readonly crossorigin: string;
  readonly loop: string;
  readonly muted: string;
  readonly preload: string;
  readonly src: string;
};

export type base = GeneralAttributes & { readonly href: string; readonly target: string };

export type basefont = GeneralAttributes & {
  readonly color: string;
  readonly face: string;
  readonly size: string;
};

export type bdo = GeneralAttributes & { readonly dir: string };

export type blockquote = GeneralAttributes & { readonly cite: string };

export type body = GeneralAttributes & {
  readonly alink: string;
  readonly background: string;
  readonly bgcolor: string;
  readonly link: string;
  readonly text: string;
  readonly vlink: string;
};

export type br = GeneralAttributes & { readonly clear: string };

export type button = GeneralAttributes & {
  readonly accesskey: string;
  readonly autofocus: string;
  readonly disabled: string;
  readonly form: string;
  readonly formaction: string;
  readonly formenctype: string;
  readonly formmethod: string;
  readonly formnovalidate: string;
  readonly formtarget: string;
  readonly name: string;
  readonly tabindex: string;
  readonly type: string;
  readonly value: string;
};

export type canvas = GeneralAttributes & { readonly height: string; readonly width: string };

export type caption = GeneralAttributes & { readonly align: string };

export type col = GeneralAttributes & {
  readonly align: string;
  readonly char: string;
  readonly charoff: string;
  readonly span: string;
  readonly valign: string;
  readonly width: string;
};

export type colgroup = GeneralAttributes & {
  readonly align: string;
  readonly char: string;
  readonly charoff: string;
  readonly span: string;
  readonly valign: string;
  readonly width: string;
};

export type data = GeneralAttributes & { readonly value: string };

export type del = GeneralAttributes & { readonly cite: string; readonly datetime: string };

export type details = GeneralAttributes & { readonly open: string };

export type dfn = GeneralAttributes & { readonly title: string };

export type dialog = GeneralAttributes & { readonly open: string };

export type dir = GeneralAttributes & { readonly compact: string };

export type div = GeneralAttributes & { readonly align: string };

export type dl = GeneralAttributes & { readonly compact: string };

export type embed = GeneralAttributes & {
  readonly height: string;
  readonly src: string;
  readonly type: string;
  readonly width: string;
};

export type fieldset = GeneralAttributes & {
  readonly disabled: string;
  readonly form: string;
  readonly name: string;
};

export type font = GeneralAttributes & {
  readonly color: string;
  readonly face: string;
  readonly size: string;
};

export type form = GeneralAttributes & {
  readonly accept: string;
  readonly string: string;
  readonly action: string;
  readonly autocomplete: string;
  readonly enctype: string;
  readonly method: string;
  readonly name: string;
  readonly novalidate: string;
  readonly target: string;
};

export type frame = GeneralAttributes & {
  readonly frameborder: string;
  readonly longdesc: string;
  readonly marginheight: string;
  readonly marginwidth: string;
  readonly name: string;
  readonly noresize: string;
  readonly scrolling: string;
  readonly src: string;
};

export type frameset = GeneralAttributes & { readonly cols: string; readonly rows: string };

export type h1 = GeneralAttributes & { readonly align: string };

export type h2 = GeneralAttributes & { readonly align: string };

export type h3 = GeneralAttributes & { readonly align: string };

export type h4 = GeneralAttributes & { readonly align: string };

export type h5 = GeneralAttributes & { readonly align: string };

export type h6 = GeneralAttributes & { readonly align: string };

export type head = GeneralAttributes & { readonly profile: string };

export type hr = GeneralAttributes & {
  readonly align: string;
  readonly noshade: string;
  readonly size: string;
  readonly width: string;
};

export type html = GeneralAttributes & { readonly manifest: string; readonly version: string };

export type iframe = GeneralAttributes & {
  readonly align: string;
  readonly allow: string;
  readonly allowfullscreen: string;
  readonly allowpaymentrequest: string;
  readonly allowusermedia: string;
  readonly frameborder: string;
  readonly height: string;
  readonly loading: string;
  readonly longdesc: string;
  readonly marginheight: string;
  readonly marginwidth: string;
  readonly name: string;
  readonly referrerpolicy: string;
  readonly sandbox: string;
  readonly scrolling: string;
  readonly src: string;
  readonly srcdoc: string;
  readonly width: string;
};

export type img = GeneralAttributes & {
  readonly align: string;
  readonly alt: string;
  readonly border: string;
  readonly crossorigin: string;
  readonly decoding: string;
  readonly height: string;
  readonly hspace: string;
  readonly ismap: string;
  readonly loading: string;
  readonly longdesc: string;
  readonly name: string;
  readonly referrerpolicy: string;
  readonly sizes: string;
  readonly src: string;
  readonly srcset: string;
  readonly usemap: string;
  readonly vspace: string;
  readonly width: string;
};

export type input = GeneralAttributes & {
  readonly accept: string;
  readonly accesskey: string;
  readonly align: string;
  readonly alt: string;
  readonly autocomplete: string;
  readonly autofocus: string;
  readonly checked: string;
  readonly dirname: string;
  readonly disabled: string;
  readonly form: string;
  readonly formaction: string;
  readonly formenctype: string;
  readonly formmethod: string;
  readonly formnovalidate: string;
  readonly formtarget: string;
  readonly height: string;
  readonly ismap: string;
  readonly list: string;
  readonly max: string;
  readonly maxlength: string;
  readonly min: string;
  readonly minlength: string;
  readonly multiple: string;
  readonly name: string;
  readonly pattern: string;
  readonly placeholder: string;
  readonly readonly: string;
  readonly required: string;
  readonly size: string;
  readonly src: string;
  readonly step: string;
  readonly tabindex: string;
  readonly title: string;
  readonly type: string;
  readonly usemap: string;
  readonly value: string;
  readonly width: string;
};

export type ins = GeneralAttributes & { readonly cite: string; readonly datetime: string };

export type isindex = GeneralAttributes & { readonly prompt: string };

export type label = GeneralAttributes & {
  readonly accesskey: string;
  readonly for: string;
  readonly form: string;
};

export type legend = GeneralAttributes & { readonly accesskey: string; readonly align: string };

export type li = GeneralAttributes & { readonly type: string; readonly value: string };

export type link = GeneralAttributes & {
  readonly as: string;
  readonly charset: string;
  readonly color: string;
  readonly crossorigin: string;
  readonly disabled: string;
  readonly href: string;
  readonly hreflang: string;
  readonly imagesizes: string;
  readonly imagesrcset: string;
  readonly integrity: string;
  readonly media: string;
  readonly nonce: string;
  readonly referrerpolicy: string;
  readonly rel: string;
  readonly rev: string;
  readonly sizes: string;
  readonly target: string;
  readonly title: string;
  readonly type: string;
};

export type map = GeneralAttributes & { readonly name: string };

export type menu = GeneralAttributes & { readonly compact: string };

export type meta = GeneralAttributes & {
  readonly charset: string;
  readonly content: string;
  readonly string: string;
  readonly name: string;
  readonly scheme: string;
};

export type meter = GeneralAttributes & {
  readonly high: string;
  readonly low: string;
  readonly max: string;
  readonly min: string;
  readonly optimum: string;
  readonly value: string;
};

export type object_ = GeneralAttributes & {
  readonly align: string;
  readonly archive: string;
  readonly border: string;
  readonly classid: string;
  readonly codebase: string;
  readonly codetype: string;
  readonly data: string;
  readonly declare: string;
  readonly form: string;
  readonly height: string;
  readonly hspace: string;
  readonly name: string;
  readonly standby: string;
  readonly tabindex: string;
  readonly type: string;
  readonly typemustmatch: string;
  readonly usemap: string;
  readonly vspace: string;
  readonly width: string;
};

export type ol = GeneralAttributes & {
  readonly compact: string;
  readonly reversed: string;
  readonly start: string;
  readonly type: string;
};

export type optgroup = GeneralAttributes & { readonly disabled: string; readonly label: string };

export type option = GeneralAttributes & {
  readonly disabled: string;
  readonly label: string;
  readonly selected: string;
  readonly value: string;
};

export type output = GeneralAttributes & {
  readonly for: string;
  readonly form: string;
  readonly name: string;
};

export type p = GeneralAttributes & { readonly align: string };

export type param = GeneralAttributes & {
  readonly name: string;
  readonly type: string;
  readonly value: string;
  readonly valuetype: string;
};

export type pre = GeneralAttributes & { readonly width: string };

export type progress = GeneralAttributes & { readonly max: string; readonly value: string };

export type q = GeneralAttributes & { readonly cite: string };

export type script = GeneralAttributes & {
  readonly async: string;
  readonly charset: string;
  readonly crossorigin: string;
  readonly defer: string;
  readonly integrity: string;
  readonly language: string;
  readonly nomodule: string;
  readonly nonce: string;
  readonly referrerpolicy: string;
  readonly src: string;
  readonly type: string;
};

export type select = GeneralAttributes & {
  readonly autocomplete: string;
  readonly autofocus: string;
  readonly disabled: string;
  readonly form: string;
  readonly multiple: string;
  readonly name: string;
  readonly required: string;
  readonly size: string;
  readonly tabindex: string;
};

export type slot = GeneralAttributes & { readonly name: string };

export type source = GeneralAttributes & {
  readonly media: string;
  readonly sizes: string;
  readonly src: string;
  readonly srcset: string;
  readonly type: string;
};

export type style = GeneralAttributes & {
  readonly media: string;
  readonly nonce: string;
  readonly title: string;
  readonly type: string;
};

export type table = GeneralAttributes & {
  readonly align: string;
  readonly bgcolor: string;
  readonly border: string;
  readonly cellpadding: string;
  readonly cellspacing: string;
  readonly frame: string;
  readonly rules: string;
  readonly summary: string;
  readonly width: string;
};

export type tbody = GeneralAttributes & {
  readonly align: string;
  readonly char: string;
  readonly charoff: string;
  readonly valign: string;
};

export type td = GeneralAttributes & {
  readonly abbr: string;
  readonly align: string;
  readonly axis: string;
  readonly bgcolor: string;
  readonly char: string;
  readonly charoff: string;
  readonly colspan: string;
  readonly headers: string;
  readonly height: string;
  readonly nowrap: string;
  readonly rowspan: string;
  readonly scope: string;
  readonly valign: string;
  readonly width: string;
};

export type textarea = GeneralAttributes & {
  readonly accesskey: string;
  readonly autocomplete: string;
  readonly autofocus: string;
  readonly cols: string;
  readonly dirname: string;
  readonly disabled: string;
  readonly form: string;
  readonly maxlength: string;
  readonly minlength: string;
  readonly name: string;
  readonly placeholder: string;
  readonly readonly: string;
  readonly required: string;
  readonly rows: string;
  readonly tabindex: string;
  readonly wrap: string;
};

export type tfoot = GeneralAttributes & {
  readonly align: string;
  readonly char: string;
  readonly charoff: string;
  readonly valign: string;
};

export type th = GeneralAttributes & {
  readonly abbr: string;
  readonly align: string;
  readonly axis: string;
  readonly bgcolor: string;
  readonly char: string;
  readonly charoff: string;
  readonly colspan: string;
  readonly headers: string;
  readonly height: string;
  readonly nowrap: string;
  readonly rowspan: string;
  readonly scope: string;
  readonly valign: string;
  readonly width: string;
};

export type thead = GeneralAttributes & {
  readonly align: string;
  readonly char: string;
  readonly charoff: string;
  readonly valign: string;
};

export type time = GeneralAttributes & { readonly datetime: string };

export type tr = GeneralAttributes & {
  readonly align: string;
  readonly bgcolor: string;
  readonly char: string;
  readonly charoff: string;
  readonly valign: string;
};

export type track = GeneralAttributes & {
  readonly default: string;
  readonly kind: string;
  readonly label: string;
  readonly src: string;
  readonly srclang: string;
};

export type ul = GeneralAttributes & { readonly compact: string; readonly type: string };

export type video = GeneralAttributes & {
  readonly autoplay: string;
  readonly controls: string;
  readonly crossorigin: string;
  readonly height: string;
  readonly loop: string;
  readonly muted: string;
  readonly playsinline: string;
  readonly poster: string;
  readonly preload: string;
  readonly src: string;
  readonly width: string;
};
