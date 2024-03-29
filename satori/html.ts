/* eslint-disable */


type NonVoidElement = {
  readonly tag: string, 
  readonly attributes: any, 
  readonly children: any[]
};

type VoidElement = {
  readonly tag: string, 
  readonly attributes: any
};

export const builder = <T extends NonVoidElement>(tag: T['tag']) => 
(attributes: T['attributes'], ...children: T['children']) => 
({ tag, attributes, children })


export const voidBuilder = <T extends VoidElement>(tag: T['tag']) => 
(attributes: T['attributes']) => 
({ tag, attributes, })


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
  readonly tag: 'a';
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
  readonly children: (
    abbr | address | area | article | aside | audio |
    b | bdi | bdo | blockquote | br |
    canvas | caption | cite | code | col | colgroup |
    data | datalist | dd | del | dfn | dialog | div | dl | dt |
    em |
    fieldset | figcaption | figure | footer | form |
    h1 | h2 | h3 | h4 | h5 | h6 | header | hgroup | hr | html |
    i | img | input | ins |
    kbd |
    legend | link |
    main | map | mark | math | menu | meta | meter |
    nav | noscript |
    object_ | ol | optgroup | option | output |
    p | param | picture | pre | progress |
    q |
    rb | rp | rt | rtc | ruby |
    s | samp | script | section | slot | small | source | span | string | strong | style | sub | summary | sup | svg |
    table | tbody | td | template | tfoot | th | thead | time | tr | track |
    u | ul |
    var_ | video |
    wbr
  )[];
};

export const a = builder<a>('a')

export type abbr = {
  readonly tag: 'abbr';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn |
    em | embed |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | meter |
    noscript |
    object_ | output |
    picture | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    template | textarea | time |
    u |
    var_ | video |
    wbr
  )[];
};

export const abbr = builder<abbr>('abbr')

export type address = {
  readonly tag: 'address';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn | dialog | div | dl |
    em | embed |
    fieldset | figure | form |
    hr |
    i | iframe | img | input | ins |
    kbd |
    label |
    main | map | mark | math | menu | meter |
    noscript |
    object_ | ol | output |
    p | picture | pre | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    table | td | template | textarea | th | time |
    u | ul |
    var_ | video |
    wbr
  )[];
};

export const address = builder<address>('address')

export type area = {
  readonly tag: 'area';
  readonly attributes: globalAttributes & {
    readonly 'coords' ?: string;
    readonly 'download' ?: string;
    readonly 'href' ?: string;
    readonly 'itemprop' ?: string;
    readonly 'ping' ?: string;
    readonly 'referrerpolicy' ?: string;
    readonly 'rel' ?: string;
    readonly 'shape' ?: 'rect'|'circle'|'poly'|'default';
    readonly 'target' ?: '_blank'|'_self'|'_parent'|'_top';
  };
};

export const area = voidBuilder<area>('area')

export type article = {
  readonly tag: 'article';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | address | article | aside | audio |
    b | bdi | bdo | blockquote | br | button |
    canvas | cite | code |
    data | datalist | del | details | dfn | dialog | div | dl |
    em | embed |
    fieldset | figure | footer | form |
    h1 | h2 | h3 | h4 | h5 | h6 | header | hgroup | hr |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | menu | meter |
    nav | noscript |
    object_ | ol | output |
    p | picture | pre | progress |
    q |
    ruby |
    s | samp | script | section | select | slot | small | span | string | strong | sub | sup | svg |
    table | td | template | textarea | th | time |
    u | ul |
    var_ | video |
    wbr
  )[];
};

export const article = builder<article>('article')

export type aside = {
  readonly tag: 'aside';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | address | article | aside | audio |
    b | bdi | bdo | blockquote | br | button |
    canvas | cite | code |
    data | datalist | del | details | dfn | dialog | div | dl |
    em | embed |
    fieldset | figure | footer | form |
    h1 | h2 | h3 | h4 | h5 | h6 | header | hgroup | hr |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | menu | meter |
    nav | noscript |
    object_ | ol | output |
    p | picture | pre | progress |
    q |
    ruby |
    s | samp | script | section | select | slot | small | span | string | strong | sub | sup | svg |
    table | td | template | textarea | th | time |
    u | ul |
    var_ | video |
    wbr
  )[];
};

export const aside = builder<aside>('aside')

export type audio = {
  readonly tag: 'audio';
  readonly attributes: globalAttributes & {
    readonly 'crossorigin' ?: 'anonymous'|'use-credentials';
    readonly 'itemprop' ?: string;
    readonly 'preload' ?: 'none'|'metadata'|'auto';
    readonly 'src' ?: string;
  };
  readonly children: (
    a | abbr | address | article | aside |
    b | bdi | bdo | blockquote | br | button |
    canvas | cite | code |
    data | datalist | del | details | dfn | dialog | div | dl |
    em | embed |
    fieldset | figure | footer | form |
    h1 | h2 | h3 | h4 | h5 | h6 | header | hgroup | hr |
    i | iframe | img | input | ins |
    kbd |
    label |
    main | map | mark | math | menu | meter |
    nav | noscript |
    object_ | ol | output |
    p | picture | pre | progress |
    q |
    ruby |
    s | samp | script | section | select | slot | small | span | string | strong | sub | sup | svg |
    table | td | template | textarea | th | time |
    u | ul |
    var_ |
    wbr |
    track |
    source
  )[];
};

export const audio = builder<audio>('audio')

export type b = {
  readonly tag: 'b';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn |
    em | embed |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | meter |
    noscript |
    object_ | output |
    picture | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    template | textarea | time |
    u |
    var_ | video |
    wbr
  )[];
};

export const b = builder<b>('b')

export type base = {
  readonly tag: 'base';
  readonly attributes: globalAttributes & {
  };
};

export const base = voidBuilder<base>('base')

export type bdi = {
  readonly tag: 'bdi';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn |
    em | embed |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | meter |
    noscript |
    object_ | output |
    picture | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    template | textarea | time |
    u |
    var_ | video |
    wbr
  )[];
};

export const bdi = builder<bdi>('bdi')

export type bdo = {
  readonly tag: 'bdo';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn |
    em | embed |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | meter |
    noscript |
    object_ | output |
    picture | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    template | textarea | time |
    u |
    var_ | video |
    wbr
  )[];
};

export const bdo = builder<bdo>('bdo')

export type blockquote = {
  readonly tag: 'blockquote';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | address | article | aside | audio |
    b | bdi | bdo | blockquote | br | button |
    canvas | cite | code |
    data | datalist | del | details | dfn | dialog | div | dl |
    em | embed |
    fieldset | figure | footer | form |
    h1 | h2 | h3 | h4 | h5 | h6 | header | hgroup | hr |
    i | iframe | img | input | ins |
    kbd |
    label |
    main | map | mark | math | menu | meter |
    nav | noscript |
    object_ | ol | output |
    p | picture | pre | progress |
    q |
    ruby |
    s | samp | script | section | select | slot | small | span | string | strong | sub | sup | svg |
    table | td | template | textarea | th | time |
    u | ul |
    var_ | video |
    wbr
  )[];
};

export const blockquote = builder<blockquote>('blockquote')

export type body = {
  readonly tag: 'body';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | address | article | aside | audio |
    b | bdi | bdo | blockquote | br | button |
    canvas | cite | code |
    data | datalist | del | details | dfn | dialog | div | dl |
    em | embed |
    fieldset | figure | footer | form |
    h1 | h2 | h3 | h4 | h5 | h6 | header | hgroup | hr |
    i | iframe | img | input | ins |
    kbd |
    label |
    main | map | mark | math | menu | meter |
    nav | noscript |
    object_ | ol | output |
    p | picture | pre | progress |
    q |
    ruby |
    s | samp | script | section | select | slot | small | span | string | strong | sub | sup | svg |
    table | td | template | textarea | th | time |
    u | ul |
    var_ | video |
    wbr
  )[];
};

export const body = builder<body>('body')

export type br = {
  readonly tag: 'br';
  readonly attributes: globalAttributes & {
  };
};

export const br = voidBuilder<br>('br')

export type button = {
  readonly tag: 'button';
  readonly attributes: globalAttributes & {
    readonly 'autofocus' ?: true;
    readonly 'disabled' ?: true;
    readonly 'formaction' ?: string;
    readonly 'formenctype' ?: string;
    readonly 'formmethod' ?: 'get'|'post'|'dialog';
    readonly 'formnovalidate' ?: true;
    readonly 'formtarget' ?: '_blank'|'_self'|'_parent'|'_top';
    readonly 'type' ?: 'submit'|'reset'|'button';
  };
  readonly children: (
    abbr | audio |
    b | bdi | bdo | br |
    canvas | cite | code |
    data | datalist | del | dfn |
    em |
    i | img | input | ins |
    kbd |
    map | mark | math | meter |
    noscript |
    object_ | output |
    picture | progress |
    q |
    ruby |
    s | samp | script | slot | small | span | string | strong | sub | sup | svg |
    template | time |
    u |
    var_ | video |
    wbr
  )[];
};

export const button = builder<button>('button')

export type canvas = {
  readonly tag: 'canvas';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | address | area | article | aside | audio |
    b | bdi | bdo | blockquote | br | button |
    canvas | caption | cite | code | col | colgroup |
    data | datalist | dd | del | details | dfn | dialog | div | dl | dt |
    em | embed |
    fieldset | figcaption | figure | footer | form |
    h1 | h2 | h3 | h4 | h5 | h6 | header | hgroup | hr | html |
    i | iframe | img | input | ins |
    kbd |
    label | legend | link |
    main | map | mark | math | menu | meta | meter |
    nav | noscript |
    object_ | ol | optgroup | option | output |
    p | param | picture | pre | progress |
    q |
    rb | rp | rt | rtc | ruby |
    s | samp | script | section | select | slot | small | source | span | string | strong | style | sub | summary | sup | svg |
    table | tbody | td | template | textarea | tfoot | th | thead | time | tr | track |
    u | ul |
    var_ | video |
    wbr
  )[];
};

export const canvas = builder<canvas>('canvas')

export type caption = {
  readonly tag: 'caption';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | address | article | aside | audio |
    b | bdi | bdo | blockquote | br | button |
    canvas | cite | code |
    data | datalist | del | details | dfn | dialog | div | dl |
    em | embed |
    fieldset | figure | footer | form |
    h1 | h2 | h3 | h4 | h5 | h6 | header | hgroup | hr |
    i | iframe | img | input | ins |
    kbd |
    label |
    main | map | mark | math | menu | meter |
    nav | noscript |
    object_ | ol | output |
    p | picture | pre | progress |
    q |
    ruby |
    s | samp | script | section | select | slot | small | span | string | strong | sub | sup | svg |
    td | template | textarea | th | time |
    u | ul |
    var_ | video |
    wbr
  )[];
};

export const caption = builder<caption>('caption')

export type cite = {
  readonly tag: 'cite';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn |
    em | embed |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | meter |
    noscript |
    object_ | output |
    picture | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    template | textarea | time |
    u |
    var_ | video |
    wbr
  )[];
};

export const cite = builder<cite>('cite')

export type code = {
  readonly tag: 'code';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn |
    em | embed |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | meter |
    noscript |
    object_ | output |
    picture | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    template | textarea | time |
    u |
    var_ | video |
    wbr
  )[];
};

export const code = builder<code>('code')

export type col = {
  readonly tag: 'col';
  readonly attributes: globalAttributes & {
    readonly 'span' ?: number;
  };
};

export const col = voidBuilder<col>('col')

export type colgroup = {
  readonly tag: 'colgroup';
  readonly attributes: globalAttributes & {
    readonly 'span' ?: number;
  };
  readonly children: (
    col |
    template
  )[];
};

export const colgroup = builder<colgroup>('colgroup')

export type data = {
  readonly tag: 'data';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn |
    em | embed |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | meter |
    noscript |
    object_ | output |
    picture | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    template | textarea | time |
    u |
    var_ | video |
    wbr
  )[];
};

export const data = builder<data>('data')

export type datalist = {
  readonly tag: 'datalist';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn |
    em | embed |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | meter |
    noscript |
    object_ | output |
    picture | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    template | textarea | time |
    u |
    var_ | video |
    wbr |
    option
  )[];
};

export const datalist = builder<datalist>('datalist')

export type dd = {
  readonly tag: 'dd';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | address | article | aside | audio |
    b | bdi | bdo | blockquote | br | button |
    canvas | cite | code |
    data | datalist | del | details | dfn | dialog | div | dl |
    em | embed |
    fieldset | figure | footer | form |
    h1 | h2 | h3 | h4 | h5 | h6 | header | hgroup | hr |
    i | iframe | img | input | ins |
    kbd |
    label |
    main | map | mark | math | menu | meter |
    nav | noscript |
    object_ | ol | output |
    p | picture | pre | progress |
    q |
    ruby |
    s | samp | script | section | select | slot | small | span | string | strong | sub | sup | svg |
    table | td | template | textarea | th | time |
    u | ul |
    var_ | video |
    wbr
  )[];
};

export const dd = builder<dd>('dd')

export type del = {
  readonly tag: 'del';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | address | area | article | aside | audio |
    b | bdi | bdo | blockquote | br | button |
    canvas | caption | cite | code | col | colgroup |
    data | datalist | dd | del | details | dfn | dialog | div | dl | dt |
    em | embed |
    fieldset | figcaption | figure | footer | form |
    h1 | h2 | h3 | h4 | h5 | h6 | header | hgroup | hr | html |
    i | iframe | img | input | ins |
    kbd |
    label | legend | link |
    main | map | mark | math | menu | meta | meter |
    nav | noscript |
    object_ | ol | optgroup | option | output |
    p | param | picture | pre | progress |
    q |
    rb | rp | rt | rtc | ruby |
    s | samp | script | section | select | slot | small | source | span | string | strong | style | sub | summary | sup | svg |
    table | tbody | td | template | textarea | tfoot | th | thead | time | tr | track |
    u | ul |
    var_ | video |
    wbr
  )[];
};

export const del = builder<del>('del')

export type details = {
  readonly tag: 'details';
  readonly attributes: globalAttributes & {
    readonly 'open' ?: true;
  };
  readonly children: (
    summary |
    a | abbr | address | article | aside | audio |
    b | bdi | bdo | blockquote | br | button |
    canvas | cite | code |
    data | datalist | del | details | dfn | dialog | div | dl |
    em | embed |
    fieldset | figure | footer | form |
    h1 | h2 | h3 | h4 | h5 | h6 | header | hgroup | hr |
    i | iframe | img | input | ins |
    kbd |
    label |
    main | map | mark | math | menu | meter |
    nav | noscript |
    object_ | ol | output |
    p | picture | pre | progress |
    q |
    ruby |
    s | samp | script | section | select | slot | small | span | string | strong | sub | sup | svg |
    table | td | template | textarea | th | time |
    u | ul |
    var_ | video |
    wbr
  )[];
};

export const details = builder<details>('details')

export type dfn = {
  readonly tag: 'dfn';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del |
    em | embed |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | meter |
    noscript |
    object_ | output |
    picture | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    template | textarea | time |
    u |
    var_ | video |
    wbr
  )[];
};

export const dfn = builder<dfn>('dfn')

export type dialog = {
  readonly tag: 'dialog';
  readonly attributes: globalAttributes & {
    readonly 'open' ?: true;
  };
  readonly children: (
    a | abbr | address | article | aside | audio |
    b | bdi | bdo | blockquote | br | button |
    canvas | cite | code |
    data | datalist | del | details | dfn | dialog | div | dl |
    em | embed |
    fieldset | figure | footer | form |
    h1 | h2 | h3 | h4 | h5 | h6 | header | hgroup | hr |
    i | iframe | img | input | ins |
    kbd |
    label |
    main | map | mark | math | menu | meter |
    nav | noscript |
    object_ | ol | output |
    p | picture | pre | progress |
    q |
    ruby |
    s | samp | script | section | select | slot | small | span | string | strong | sub | sup | svg |
    table | td | template | textarea | th | time |
    u | ul |
    var_ | video |
    wbr
  )[];
};

export const dialog = builder<dialog>('dialog')

export type div = {
  readonly tag: 'div';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | address | article | aside | audio |
    b | bdi | bdo | blockquote | br | button |
    canvas | cite | code |
    data | datalist | del | details | dfn | dialog | div | dl |
    em | embed |
    fieldset | figure | footer | form |
    h1 | h2 | h3 | h4 | h5 | h6 | header | hgroup | hr |
    i | iframe | img | input | ins |
    kbd |
    label |
    main | map | mark | math | menu | meter |
    nav | noscript |
    object_ | ol | output |
    p | picture | pre | progress |
    q |
    ruby |
    s | samp | script | section | select | slot | small | span | string | strong | sub | sup | svg |
    table | td | template | textarea | th | time |
    u | ul |
    var_ | video |
    wbr |
    dt | dd
  )[];
};

export const div = builder<div>('div')

export type dl = {
  readonly tag: 'dl';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    dt | dd | div
  )[];
};

export const dl = builder<dl>('dl')

export type dt = {
  readonly tag: 'dt';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | address | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn | dialog | div | dl |
    em | embed |
    fieldset | figure | form |
    hr |
    i | iframe | img | input | ins |
    kbd |
    label |
    main | map | mark | math | menu | meter |
    noscript |
    object_ | ol | output |
    p | picture | pre | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    table | td | template | textarea | th | time |
    u | ul |
    var_ | video |
    wbr
  )[];
};

export const dt = builder<dt>('dt')

export type em = {
  readonly tag: 'em';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn |
    em | embed |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | meter |
    noscript |
    object_ | output |
    picture | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    template | textarea | time |
    u |
    var_ | video |
    wbr
  )[];
};

export const em = builder<em>('em')

export type embed = {
  readonly tag: 'embed';
  readonly attributes: globalAttributes & {
    readonly 'src' : string;
    readonly 'title' : string;
  };
};

export const embed = voidBuilder<embed>('embed')

export type fieldset = {
  readonly tag: 'fieldset';
  readonly attributes: globalAttributes & {
    readonly 'disabled' ?: true;
  };
  readonly children: (
    a | abbr | address | article | aside | audio |
    b | bdi | bdo | blockquote | br | button |
    canvas | cite | code |
    data | datalist | del | details | dfn | dialog | div | dl |
    em | embed |
    fieldset | figure | footer | form |
    h1 | h2 | h3 | h4 | h5 | h6 | header | hgroup | hr |
    i | iframe | img | input | ins |
    kbd |
    label |
    main | map | mark | math | menu | meter |
    nav | noscript |
    object_ | ol | output |
    p | picture | pre | progress |
    q |
    ruby |
    s | samp | script | section | select | slot | small | span | string | strong | sub | sup | svg |
    table | td | template | textarea | th | time |
    u | ul |
    var_ | video |
    wbr |
    legend
  )[];
};

export const fieldset = builder<fieldset>('fieldset')

export type figcaption = {
  readonly tag: 'figcaption';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | address | article | aside | audio |
    b | bdi | bdo | blockquote | br | button |
    canvas | cite | code |
    data | datalist | del | details | dfn | dialog | div | dl |
    em | embed |
    fieldset | figure | footer | form |
    h1 | h2 | h3 | h4 | h5 | h6 | header | hgroup | hr |
    i | iframe | img | input | ins |
    kbd |
    label |
    main | map | mark | math | menu | meter |
    nav | noscript |
    object_ | ol | output |
    p | picture | pre | progress |
    q |
    ruby |
    s | samp | script | section | select | slot | small | span | string | strong | sub | sup | svg |
    table | td | template | textarea | th | time |
    u | ul |
    var_ | video |
    wbr
  )[];
};

export const figcaption = builder<figcaption>('figcaption')

export type figure = {
  readonly tag: 'figure';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | address | article | aside | audio |
    b | bdi | bdo | blockquote | br | button |
    canvas | cite | code |
    data | datalist | del | details | dfn | dialog | div | dl |
    em | embed |
    fieldset | figure | footer | form |
    h1 | h2 | h3 | h4 | h5 | h6 | header | hgroup | hr |
    i | iframe | img | input | ins |
    kbd |
    label |
    main | map | mark | math | menu | meter |
    nav | noscript |
    object_ | ol | output |
    p | picture | pre | progress |
    q |
    ruby |
    s | samp | script | section | select | slot | small | span | string | strong | sub | sup | svg |
    table | td | template | textarea | th | time |
    u | ul |
    var_ | video |
    wbr |
    figcaption
  )[];
};

export const figure = builder<figure>('figure')

export type footer = {
  readonly tag: 'footer';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | address | article | aside | audio |
    b | bdi | bdo | blockquote | br | button |
    canvas | cite | code |
    data | datalist | del | details | dfn | dialog | div | dl |
    em | embed |
    fieldset | figure | form |
    h1 | h2 | h3 | h4 | h5 | h6 | hgroup | hr |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | menu | meter |
    nav | noscript |
    object_ | ol | output |
    p | picture | pre | progress |
    q |
    ruby |
    s | samp | script | section | select | slot | small | span | string | strong | sub | sup | svg |
    table | td | template | textarea | th | time |
    u | ul |
    var_ | video |
    wbr
  )[];
};

export const footer = builder<footer>('footer')

export type form = {
  readonly tag: 'form';
  readonly attributes: globalAttributes & {
    readonly 'action' ?: string;
    readonly 'autocomplete' ?: 'on'|'off';
    readonly 'method' ?: 'get'|'post'|'dialog';
    readonly 'novalidate' ?: true;
    readonly 'target' ?: '_blank'|'_self'|'_parent'|'_top';
  };
  readonly children: (
    a | abbr | address | article | aside | audio |
    b | bdi | bdo | blockquote | br | button |
    canvas | cite | code |
    data | datalist | del | details | dfn | dialog | div | dl |
    em | embed |
    fieldset | figure | footer | form |
    h1 | h2 | h3 | h4 | h5 | h6 | header | hgroup | hr |
    i | iframe | img | input | ins |
    kbd |
    label |
    main | map | mark | math | menu | meter |
    nav | noscript |
    object_ | ol | output |
    p | picture | pre | progress |
    q |
    ruby |
    s | samp | script | section | select | slot | small | span | string | strong | sub | sup | svg |
    table | td | template | textarea | th | time |
    u | ul |
    var_ | video |
    wbr
  )[];
};

export const form = builder<form>('form')

export type h1 = {
  readonly tag: 'h1';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn |
    em | embed |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | meter |
    noscript |
    object_ | output |
    picture | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    template | textarea | time |
    u |
    var_ | video |
    wbr
  )[];
};

export const h1 = builder<h1>('h1')

export type h2 = {
  readonly tag: 'h2';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn |
    em | embed |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | meter |
    noscript |
    object_ | output |
    picture | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    template | textarea | time |
    u |
    var_ | video |
    wbr
  )[];
};

export const h2 = builder<h2>('h2')

export type h3 = {
  readonly tag: 'h3';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn |
    em | embed |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | meter |
    noscript |
    object_ | output |
    picture | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    template | textarea | time |
    u |
    var_ | video |
    wbr
  )[];
};

export const h3 = builder<h3>('h3')

export type h4 = {
  readonly tag: 'h4';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn |
    em | embed |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | meter |
    noscript |
    object_ | output |
    picture | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    template | textarea | time |
    u |
    var_ | video |
    wbr
  )[];
};

export const h4 = builder<h4>('h4')

export type h5 = {
  readonly tag: 'h5';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn |
    em | embed |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | meter |
    noscript |
    object_ | output |
    picture | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    template | textarea | time |
    u |
    var_ | video |
    wbr
  )[];
};

export const h5 = builder<h5>('h5')

export type h6 = {
  readonly tag: 'h6';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn |
    em | embed |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | meter |
    noscript |
    object_ | output |
    picture | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    template | textarea | time |
    u |
    var_ | video |
    wbr
  )[];
};

export const h6 = builder<h6>('h6')

export type head = {
  readonly tag: 'head';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    base |
    title |
    link |
    meta |
    noscript |
    script | style |
    template
  )[];
};

export const head = builder<head>('head')

export type header = {
  readonly tag: 'header';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | address | article | aside | audio |
    b | bdi | bdo | blockquote | br | button |
    canvas | cite | code |
    data | datalist | del | details | dfn | dialog | div | dl |
    em | embed |
    fieldset | figure | form |
    h1 | h2 | h3 | h4 | h5 | h6 | hgroup | hr |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | menu | meter |
    nav | noscript |
    object_ | ol | output |
    p | picture | pre | progress |
    q |
    ruby |
    s | samp | script | section | select | slot | small | span | string | strong | sub | sup | svg |
    table | td | template | textarea | th | time |
    u | ul |
    var_ | video |
    wbr
  )[];
};

export const header = builder<header>('header')

export type hgroup = {
  readonly tag: 'hgroup';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    p |
    h1 | h2 | h3 | h4 | h5 | h6
  )[];
};

export const hgroup = builder<hgroup>('hgroup')

export type hr = {
  readonly tag: 'hr';
  readonly attributes: globalAttributes & {
  };
};

export const hr = voidBuilder<hr>('hr')

export type html = {
  readonly tag: 'html';
  readonly attributes: globalAttributes & {
    readonly 'lang' : string;
  };
  readonly children: (
    head |
    body
  )[];
};

export const html = builder<html>('html')

export type i = {
  readonly tag: 'i';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn |
    em | embed |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | meter |
    noscript |
    object_ | output |
    picture | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    template | textarea | time |
    u |
    var_ | video |
    wbr
  )[];
};

export const i = builder<i>('i')

export type iframe = {
  readonly tag: 'iframe';
  readonly attributes: globalAttributes & {
    readonly 'src' ?: string;
    readonly 'title' : string;
  };
  readonly children: (
    a | abbr | address | area | article | aside | audio |
    b | bdi | bdo | blockquote | br | button |
    canvas | caption | cite | code | col | colgroup |
    data | datalist | dd | del | details | dfn | dialog | div | dl | dt |
    em | embed |
    fieldset | figcaption | figure | footer | form |
    h1 | h2 | h3 | h4 | h5 | h6 | header | hgroup | hr | html |
    i | iframe | img | input | ins |
    kbd |
    label | legend | link |
    main | map | mark | math | menu | meta | meter |
    nav | noscript |
    object_ | ol | optgroup | option | output |
    p | param | picture | pre | progress |
    q |
    rb | rp | rt | rtc | ruby |
    s | samp | script | section | select | slot | small | source | span | string | strong | style | sub | summary | sup | svg |
    table | tbody | td | template | textarea | tfoot | th | thead | time | tr | track |
    u | ul |
    var_ | video |
    wbr
  )[];
};

export const iframe = builder<iframe>('iframe')

export type img = {
  readonly tag: 'img';
  readonly attributes: globalAttributes & {
    readonly 'crossorigin' ?: 'anonymous'|'use-credentials';
    readonly 'decoding' ?: 'sync'|'async'|'auto';
    readonly 'height' ?: number;
    readonly 'ismap' ?: true;
    readonly 'src' : string;
    readonly 'srcset' ?: string;
    readonly 'width' ?: number;
  };
};

export const img = voidBuilder<img>('img')

export type input = {
  readonly tag: 'input';
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
    readonly 'type' ?: 'button'|'checkbox'|'color'|'date'|'datetime-local'|'email'|'file'|'hidden'|'image'|'month'|'number'|'password'|'radio'|'range'|'reset'|'search'|'submit'|'tel'|'text'|'time'|'url'|'week';
  };
};

export const input = voidBuilder<input>('input')

export type ins = {
  readonly tag: 'ins';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | address | area | article | aside | audio |
    b | bdi | bdo | blockquote | br | button |
    canvas | caption | cite | code | col | colgroup |
    data | datalist | dd | del | details | dfn | dialog | div | dl | dt |
    em | embed |
    fieldset | figcaption | figure | footer | form |
    h1 | h2 | h3 | h4 | h5 | h6 | header | hgroup | hr | html |
    i | iframe | img | input | ins |
    kbd |
    label | legend | link |
    main | map | mark | math | menu | meta | meter |
    nav | noscript |
    object_ | ol | optgroup | option | output |
    p | param | picture | pre | progress |
    q |
    rb | rp | rt | rtc | ruby |
    s | samp | script | section | select | slot | small | source | span | string | strong | style | sub | summary | sup | svg |
    table | tbody | td | template | textarea | tfoot | th | thead | time | tr | track |
    u | ul |
    var_ | video |
    wbr
  )[];
};

export const ins = builder<ins>('ins')

export type kbd = {
  readonly tag: 'kbd';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn |
    em | embed |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | meter |
    noscript |
    object_ | output |
    picture | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    template | textarea | time |
    u |
    var_ | video |
    wbr
  )[];
};

export const kbd = builder<kbd>('kbd')

export type label = {
  readonly tag: 'label';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn |
    em | embed |
    i | iframe | img | input | ins |
    kbd |
    map | mark | math | meter |
    noscript |
    object_ | output |
    picture | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    template | textarea | time |
    u |
    var_ | video |
    wbr
  )[];
};

export const label = builder<label>('label')

export type legend = {
  readonly tag: 'legend';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn |
    em | embed |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | meter |
    noscript |
    object_ | output |
    picture | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    template | textarea | time |
    u |
    var_ | video |
    wbr |
    h1 | h2 | h3 | h4 | h5 | h6 | hgroup
  )[];
};

export const legend = builder<legend>('legend')

export type li = {
  readonly tag: 'li';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | address | article | aside | audio |
    b | bdi | bdo | blockquote | br | button |
    canvas | cite | code |
    data | datalist | del | details | dfn | dialog | div | dl |
    em | embed |
    fieldset | figure | footer | form |
    h1 | h2 | h3 | h4 | h5 | h6 | header | hgroup | hr |
    i | iframe | img | input | ins |
    kbd |
    label |
    main | map | mark | math | menu | meter |
    nav | noscript |
    object_ | ol | output |
    p | picture | pre | progress |
    q |
    ruby |
    s | samp | script | section | select | slot | small | span | string | strong | sub | sup | svg |
    table | td | template | textarea | th | time |
    u | ul |
    var_ | video |
    wbr
  )[];
};

export const li = builder<li>('li')

export type link = {
  readonly tag: 'link';
  readonly attributes: globalAttributes & {
    readonly 'as' ?: 'audio'|'audioworklet'|'document'|'embed'|'fetch'|'font'|'frame'|'iframe'|'image'|'manifest'|'object'|'paintworklet'|'report'|'script'|'serviceworker'|'sharedworker'|'style'|'track'|'video'|'webidentity'|'worker'|'xslt';
    readonly 'blocking' ?: 'render';
    readonly 'crossorigin' ?: 'anonymous'|'use-credentials';
    readonly 'disabled' ?: true;
    readonly 'href' : string;
    readonly 'integrity' ?: string;
    readonly 'rel' ?: 'alternate'|'author'|'dns'|'help'|'icon'|'license'|'next'|'pingback'|'preconnect'|'prefetch'|'preload'|'prerender'|'prev'|'search'|'stylesheet';
    readonly 'type' ?: string;
  };
};

export const link = voidBuilder<link>('link')

export type main = {
  readonly tag: 'main';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | address | area | article | aside | audio |
    b | bdi | bdo | blockquote | br | button |
    canvas | caption | cite | code | col | colgroup |
    data | datalist | dd | del | details | dfn | dialog | div | dl | dt |
    em | embed |
    fieldset | figcaption | figure | footer | form |
    h1 | h2 | h3 | h4 | h5 | h6 | header | hgroup | hr | html |
    i | iframe | img | input | ins |
    kbd |
    label | legend | link |
    main | map | mark | math | menu | meta | meter |
    nav | noscript |
    object_ | ol | optgroup | option | output |
    p | param | picture | pre | progress |
    q |
    rb | rp | rt | rtc | ruby |
    s | samp | script | section | select | slot | small | source | span | string | strong | style | sub | summary | sup | svg |
    table | tbody | td | template | textarea | tfoot | th | thead | time | tr | track |
    u | ul |
    var_ | video |
    wbr
  )[];
};

export const main = builder<main>('main')

export type map = {
  readonly tag: 'map';
  readonly attributes: globalAttributes & {
    readonly 'name' : string;
  };
  readonly children: (
    a | abbr | address | area | article | aside | audio |
    b | bdi | bdo | blockquote | br | button |
    canvas | caption | cite | code | col | colgroup |
    data | datalist | dd | del | details | dfn | dialog | div | dl | dt |
    em | embed |
    fieldset | figcaption | figure | footer | form |
    h1 | h2 | h3 | h4 | h5 | h6 | header | hgroup | hr | html |
    i | iframe | img | input | ins |
    kbd |
    label | legend | link |
    main | map | mark | math | menu | meta | meter |
    nav | noscript |
    object_ | ol | optgroup | option | output |
    p | param | picture | pre | progress |
    q |
    rb | rp | rt | rtc | ruby |
    s | samp | script | section | select | slot | small | source | span | string | strong | style | sub | summary | sup | svg |
    table | tbody | td | template | textarea | tfoot | th | thead | time | tr | track |
    u | ul |
    var_ | video |
    wbr
  )[];
};

export const map = builder<map>('map')

export type mark = {
  readonly tag: 'mark';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn |
    em | embed |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | meter |
    noscript |
    object_ | output |
    picture | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    template | textarea | time |
    u |
    var_ | video |
    wbr
  )[];
};

export const mark = builder<mark>('mark')

export type math = {
  readonly tag: 'math';
  readonly attributes: globalAttributes & {
    readonly 'dir' ?: 'ltr'|'rtl';
    readonly 'display' ?: 'block'|'inline';
    readonly 'overflow' ?: 'linebreak'|'scroll'|'elide'|'truncate'|'scale';
  };
  readonly children: (
    a | abbr | address | area | article | aside | audio |
    b | bdi | bdo | blockquote | br | button |
    canvas | caption | cite | code | col | colgroup |
    data | datalist | dd | del | details | dfn | dialog | div | dl | dt |
    em | embed |
    fieldset | figcaption | figure | footer | form |
    h1 | h2 | h3 | h4 | h5 | h6 | header | hgroup | hr | html |
    i | iframe | img | input | ins |
    kbd |
    label | legend | link |
    main | map | mark | math | menu | meta | meter |
    nav | noscript |
    object_ | ol | optgroup | option | output |
    p | param | picture | pre | progress |
    q |
    rb | rp | rt | rtc | ruby |
    s | samp | script | section | select | slot | small | source | span | string | strong | style | sub | summary | sup | svg |
    table | tbody | td | template | textarea | tfoot | th | thead | time | tr | track |
    u | ul |
    var_ | video |
    wbr
  )[];
};

export const math = builder<math>('math')

export type menu = {
  readonly tag: 'menu';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    script |
    li
  )[];
};

export const menu = builder<menu>('menu')

export type meta = {
  readonly tag: 'meta';
  readonly attributes: globalAttributes & {
    readonly 'charset' ?: 'utf-8';
    readonly 'content' ?: string;
    readonly 'http-equiv' ?: string;
    readonly 'itemprop' ?: string;
    readonly 'name' ?: string;
  };
};

export const meta = voidBuilder<meta>('meta')

export type meter = {
  readonly tag: 'meter';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn |
    em | embed |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math |
    noscript |
    object_ | output |
    picture | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    template | textarea | time |
    u |
    var_ | video |
    wbr
  )[];
};

export const meter = builder<meter>('meter')

export type nav = {
  readonly tag: 'nav';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | address | article | aside | audio |
    b | bdi | bdo | blockquote | br | button |
    canvas | cite | code |
    data | datalist | del | details | dfn | dialog | div | dl |
    em | embed |
    fieldset | figure | footer | form |
    h1 | h2 | h3 | h4 | h5 | h6 | header | hgroup | hr |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | menu | meter |
    nav | noscript |
    object_ | ol | output |
    p | picture | pre | progress |
    q |
    ruby |
    s | samp | script | section | select | slot | small | span | string | strong | sub | sup | svg |
    table | td | template | textarea | th | time |
    u | ul |
    var_ | video |
    wbr
  )[];
};

export const nav = builder<nav>('nav')

export type noscript = {
  readonly tag: 'noscript';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | address | area | article | aside | audio |
    b | bdi | bdo | blockquote | br | button |
    canvas | caption | cite | code | col | colgroup |
    data | datalist | dd | del | details | dfn | dialog | div | dl | dt |
    em | embed |
    fieldset | figcaption | figure | footer | form |
    h1 | h2 | h3 | h4 | h5 | h6 | header | hgroup | hr | html |
    i | iframe | img | input | ins |
    kbd |
    label | legend | link |
    main | map | mark | math | menu | meta | meter |
    nav |
    object_ | ol | optgroup | option | output |
    p | param | picture | pre | progress |
    q |
    rb | rp | rt | rtc | ruby |
    s | samp | script | section | select | slot | small | source | span | string | strong | style | sub | summary | sup | svg |
    table | tbody | td | template | textarea | tfoot | th | thead | time | tr | track |
    u | ul |
    var_ | video |
    wbr
  )[];
};

export const noscript = builder<noscript>('noscript')

export type object_ = {
  readonly tag: 'object_';
  readonly attributes: globalAttributes & {
    readonly 'blocking' ?: 'render';
    readonly 'data' : string;
    readonly 'name' ?: string;
  };
  readonly children: (
    param |
    a | abbr | address | article | aside | audio |
    b | bdi | bdo | blockquote | br | button |
    canvas | cite | code |
    data | datalist | del | details | dfn | dialog | div | dl |
    em | embed |
    fieldset | figure | footer | form |
    h1 | h2 | h3 | h4 | h5 | h6 | header | hgroup | hr |
    i | iframe | img | input | ins |
    kbd |
    label |
    main | map | mark | math | menu | meter |
    nav | noscript |
    object_ | ol | output |
    p | picture | pre | progress |
    q |
    ruby |
    s | samp | script | section | select | slot | small | span | string | strong | sub | sup | svg |
    table | td | template | textarea | th | time |
    u | ul |
    var_ | video |
    wbr
  )[];
};

export const object_ = builder<object_>('object_')

export type ol = {
  readonly tag: 'ol';
  readonly attributes: globalAttributes & {
    readonly 'reversed' ?: true;
    readonly 'type' ?: 'a'|'A'|'i'|'I'|'1';
  };
  readonly children: (
    li
  )[];
};

export const ol = builder<ol>('ol')

export type optgroup = {
  readonly tag: 'optgroup';
  readonly attributes: globalAttributes & {
    readonly 'disabled' ?: true;
  };
  readonly children: (
    option
  )[];
};

export const optgroup = builder<optgroup>('optgroup')

export type option = {
  readonly tag: 'option';
  readonly attributes: globalAttributes & {
    readonly 'disabled' ?: true;
    readonly 'selected' ?: true;
  };
  readonly children: (
    a | abbr | address | area | article | aside | audio |
    b | bdi | bdo | blockquote | br | button |
    canvas | caption | cite | code | col | colgroup |
    data | datalist | dd | del | details | dfn | dialog | div | dl | dt |
    em | embed |
    fieldset | figcaption | figure | footer | form |
    h1 | h2 | h3 | h4 | h5 | h6 | header | hgroup | hr | html |
    i | iframe | img | input | ins |
    kbd |
    label | legend | link |
    main | map | mark | math | menu | meta | meter |
    nav | noscript |
    object_ | ol | optgroup | option | output |
    p | param | picture | pre | progress |
    q |
    rb | rp | rt | rtc | ruby |
    s | samp | script | section | select | slot | small | source | span | string | strong | style | sub | summary | sup | svg |
    table | tbody | td | template | textarea | tfoot | th | thead | time | tr | track |
    u | ul |
    var_ | video |
    wbr
  )[];
};

export const option = builder<option>('option')

export type output = {
  readonly tag: 'output';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn |
    em | embed |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | meter |
    noscript |
    object_ | output |
    picture | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    template | textarea | time |
    u |
    var_ | video |
    wbr
  )[];
};

export const output = builder<output>('output')

export type p = {
  readonly tag: 'p';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn |
    em | embed |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | meter |
    noscript |
    object_ | output |
    picture | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    template | textarea | time |
    u |
    var_ | video |
    wbr
  )[];
};

export const p = builder<p>('p')

export type param = {
  readonly tag: 'param';
  readonly attributes: globalAttributes & {
  };
};

export const param = voidBuilder<param>('param')

export type picture = {
  readonly tag: 'picture';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    source |
    img
  )[];
};

export const picture = builder<picture>('picture')

export type pre = {
  readonly tag: 'pre';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn |
    em | embed |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | meter |
    noscript |
    object_ | output |
    picture | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    template | textarea | time |
    u |
    var_ | video |
    wbr
  )[];
};

export const pre = builder<pre>('pre')

export type progress = {
  readonly tag: 'progress';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn |
    em | embed |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | meter |
    noscript |
    object_ | output |
    picture |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    template | textarea | time |
    u |
    var_ | video |
    wbr
  )[];
};

export const progress = builder<progress>('progress')

export type q = {
  readonly tag: 'q';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn |
    em | embed |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | meter |
    noscript |
    object_ | output |
    picture | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    template | textarea | time |
    u |
    var_ | video |
    wbr
  )[];
};

export const q = builder<q>('q')

export type rb = {
  readonly tag: 'rb';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn |
    em | embed |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | meter |
    noscript |
    object_ | output |
    picture | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    template | textarea | time |
    u |
    var_ | video |
    wbr
  )[];
};

export const rb = builder<rb>('rb')

export type rp = {
  readonly tag: 'rp';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn |
    em | embed |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | meter |
    noscript |
    object_ | output |
    picture | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    template | textarea | time |
    u |
    var_ | video |
    wbr
  )[];
};

export const rp = builder<rp>('rp')

export type rt = {
  readonly tag: 'rt';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn |
    em | embed |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | meter |
    noscript |
    object_ | output |
    picture | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    template | textarea | time |
    u |
    var_ | video |
    wbr
  )[];
};

export const rt = builder<rt>('rt')

export type rtc = {
  readonly tag: 'rtc';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn |
    em | embed |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | meter |
    noscript |
    object_ | output |
    picture | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    template | textarea | time |
    u |
    var_ | video |
    wbr |
    rt
  )[];
};

export const rtc = builder<rtc>('rtc')

export type ruby = {
  readonly tag: 'ruby';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn |
    em | embed |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | meter |
    noscript |
    object_ | output |
    picture | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    template | textarea | time |
    u |
    var_ | video |
    wbr |
    rb | rp | rt | rtc
  )[];
};

export const ruby = builder<ruby>('ruby')

export type s = {
  readonly tag: 's';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn |
    em | embed |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | meter |
    noscript |
    object_ | output |
    picture | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    template | textarea | time |
    u |
    var_ | video |
    wbr
  )[];
};

export const s = builder<s>('s')

export type samp = {
  readonly tag: 'samp';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn |
    em | embed |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | meter |
    noscript |
    object_ | output |
    picture | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    template | textarea | time |
    u |
    var_ | video |
    wbr
  )[];
};

export const samp = builder<samp>('samp')

export type script = {
  readonly tag: 'script';
  readonly attributes: globalAttributes & {
    readonly 'async' ?: true;
    readonly 'crossorigin' ?: 'anonymous'|'use-credentials';
    readonly 'defer' ?: true;
    readonly 'integrity' ?: string;
    readonly 'nomodule' ?: true;
    readonly 'src' ?: string;
  };
  readonly children: (
    a | abbr | address | area | article | aside | audio |
    b | bdi | bdo | blockquote | br | button |
    canvas | caption | cite | code | col | colgroup |
    data | datalist | dd | del | details | dfn | dialog | div | dl | dt |
    em | embed |
    fieldset | figcaption | figure | footer | form |
    h1 | h2 | h3 | h4 | h5 | h6 | header | hgroup | hr | html |
    i | iframe | img | input | ins |
    kbd |
    label | legend | link |
    main | map | mark | math | menu | meta | meter |
    nav | noscript |
    object_ | ol | optgroup | option | output |
    p | param | picture | pre | progress |
    q |
    rb | rp | rt | rtc | ruby |
    s | samp | script | section | select | slot | small | source | span | string | strong | style | sub | summary | sup | svg |
    table | tbody | td | template | textarea | tfoot | th | thead | time | tr | track |
    u | ul |
    var_ | video |
    wbr
  )[];
};

export const script = builder<script>('script')

export type section = {
  readonly tag: 'section';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | address | article | aside | audio |
    b | bdi | bdo | blockquote | br | button |
    canvas | cite | code |
    data | datalist | del | details | dfn | dialog | div | dl |
    em | embed |
    fieldset | figure | footer | form |
    h1 | h2 | h3 | h4 | h5 | h6 | header | hgroup | hr |
    i | iframe | img | input | ins |
    kbd |
    label |
    main | map | mark | math | menu | meter |
    nav | noscript |
    object_ | ol | output |
    p | picture | pre | progress |
    q |
    ruby |
    s | samp | script | section | select | slot | small | span | string | strong | sub | sup | svg |
    table | td | template | textarea | th | time |
    u | ul |
    var_ | video |
    wbr
  )[];
};

export const section = builder<section>('section')

export type select = {
  readonly tag: 'select';
  readonly attributes: globalAttributes & {
    readonly 'autofocus' ?: true;
    readonly 'disabled' ?: true;
    readonly 'multiple' ?: true;
    readonly 'required' ?: true;
    readonly 'size' ?: number;
  };
  readonly children: (
    option | optgroup
  )[];
};

export const select = builder<select>('select')

export type slot = {
  readonly tag: 'slot';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | address | area | article | aside | audio |
    b | bdi | bdo | blockquote | br | button |
    canvas | caption | cite | code | col | colgroup |
    data | datalist | dd | del | details | dfn | dialog | div | dl | dt |
    em | embed |
    fieldset | figcaption | figure | footer | form |
    h1 | h2 | h3 | h4 | h5 | h6 | header | hgroup | hr | html |
    i | iframe | img | input | ins |
    kbd |
    label | legend | link |
    main | map | mark | math | menu | meta | meter |
    nav | noscript |
    object_ | ol | optgroup | option | output |
    p | param | picture | pre | progress |
    q |
    rb | rp | rt | rtc | ruby |
    s | samp | script | section | select | slot | small | source | span | string | strong | style | sub | summary | sup | svg |
    table | tbody | td | template | textarea | tfoot | th | thead | time | tr | track |
    u | ul |
    var_ | video |
    wbr
  )[];
};

export const slot = builder<slot>('slot')

export type small = {
  readonly tag: 'small';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn |
    em | embed |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | meter |
    noscript |
    object_ | output |
    picture | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    template | textarea | time |
    u |
    var_ | video |
    wbr
  )[];
};

export const small = builder<small>('small')

export type source = {
  readonly tag: 'source';
  readonly attributes: globalAttributes & {
  };
};

export const source = voidBuilder<source>('source')

export type span = {
  readonly tag: 'span';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn |
    em | embed |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | meter |
    noscript |
    object_ | output |
    picture | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    template | textarea | time |
    u |
    var_ | video |
    wbr
  )[];
};

export const span = builder<span>('span')

export type strong = {
  readonly tag: 'strong';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn |
    em | embed |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | meter |
    noscript |
    object_ | output |
    picture | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    template | textarea | time |
    u |
    var_ | video |
    wbr
  )[];
};

export const strong = builder<strong>('strong')

export type style = {
  readonly tag: 'style';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | address | area | article | aside | audio |
    b | bdi | bdo | blockquote | br | button |
    canvas | caption | cite | code | col | colgroup |
    data | datalist | dd | del | details | dfn | dialog | div | dl | dt |
    em | embed |
    fieldset | figcaption | figure | footer | form |
    h1 | h2 | h3 | h4 | h5 | h6 | header | hgroup | hr | html |
    i | iframe | img | input | ins |
    kbd |
    label | legend | link |
    main | map | mark | math | menu | meta | meter |
    nav | noscript |
    object_ | ol | optgroup | option | output |
    p | param | picture | pre | progress |
    q |
    rb | rp | rt | rtc | ruby |
    s | samp | script | section | select | slot | small | source | span | string | strong | style | sub | summary | sup | svg |
    table | tbody | td | template | textarea | tfoot | th | thead | time | tr | track |
    u | ul |
    var_ | video |
    wbr
  )[];
};

export const style = builder<style>('style')

export type sub = {
  readonly tag: 'sub';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn |
    em | embed |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | meter |
    noscript |
    object_ | output |
    picture | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    template | textarea | time |
    u |
    var_ | video |
    wbr
  )[];
};

export const sub = builder<sub>('sub')

export type summary = {
  readonly tag: 'summary';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn |
    em | embed |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | meter |
    noscript |
    object_ | output |
    picture | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    template | textarea | time |
    u |
    var_ | video |
    wbr |
    h1 | h2 | h3 | h4 | h5 | h6 | hgroup
  )[];
};

export const summary = builder<summary>('summary')

export type sup = {
  readonly tag: 'sup';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn |
    em | embed |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | meter |
    noscript |
    object_ | output |
    picture | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    template | textarea | time |
    u |
    var_ | video |
    wbr
  )[];
};

export const sup = builder<sup>('sup')

export type svg = {
  readonly tag: 'svg';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | address | area | article | aside | audio |
    b | bdi | bdo | blockquote | br | button |
    canvas | caption | cite | code | col | colgroup |
    data | datalist | dd | del | details | dfn | dialog | div | dl | dt |
    em | embed |
    fieldset | figcaption | figure | footer | form |
    h1 | h2 | h3 | h4 | h5 | h6 | header | hgroup | hr | html |
    i | iframe | img | input | ins |
    kbd |
    label | legend | link |
    main | map | mark | math | menu | meta | meter |
    nav | noscript |
    object_ | ol | optgroup | option | output |
    p | param | picture | pre | progress |
    q |
    rb | rp | rt | rtc | ruby |
    s | samp | script | section | select | slot | small | source | span | string | strong | style | sub | summary | sup | svg |
    table | tbody | td | template | textarea | tfoot | th | thead | time | tr | track |
    u | ul |
    var_ | video |
    wbr
  )[];
};

export const svg = builder<svg>('svg')

export type table = {
  readonly tag: 'table';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | address | area | article | aside | audio |
    b | bdi | bdo | blockquote | br | button |
    canvas | caption | cite | code | col | colgroup |
    data | datalist | dd | del | details | dfn | dialog | div | dl | dt |
    em | embed |
    fieldset | figcaption | figure | footer | form |
    h1 | h2 | h3 | h4 | h5 | h6 | header | hgroup | hr | html |
    i | iframe | img | input | ins |
    kbd |
    label | legend | link |
    main | map | mark | math | menu | meta | meter |
    nav | noscript |
    object_ | ol | optgroup | option | output |
    p | param | picture | pre | progress |
    q |
    rb | rp | rt | rtc | ruby |
    s | samp | script | section | select | slot | small | source | span | string | strong | style | sub | summary | sup | svg |
    table | tbody | td | template | textarea | tfoot | th | thead | time | tr | track |
    u | ul |
    var_ | video |
    wbr
  )[];
};

export const table = builder<table>('table')

export type tbody = {
  readonly tag: 'tbody';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    script |
    tr
  )[];
};

export const tbody = builder<tbody>('tbody')

export type td = {
  readonly tag: 'td';
  readonly attributes: globalAttributes & {
    readonly 'colspan' ?: number;
    readonly 'rowspan' ?: number;
  };
  readonly children: (
    a | abbr | address | article | aside | audio |
    b | bdi | bdo | blockquote | br | button |
    canvas | cite | code |
    data | datalist | del | details | dfn | dialog | div | dl |
    em | embed |
    fieldset | figure | footer | form |
    h1 | h2 | h3 | h4 | h5 | h6 | header | hgroup | hr |
    i | iframe | img | input | ins |
    kbd |
    label |
    main | map | mark | math | menu | meter |
    nav | noscript |
    object_ | ol | output |
    p | picture | pre | progress |
    q |
    ruby |
    s | samp | script | section | select | slot | small | span | string | strong | sub | sup | svg |
    table | td | template | textarea | th | time |
    u | ul |
    var_ | video |
    wbr
  )[];
};

export const td = builder<td>('td')

export type template = {
  readonly tag: 'template';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | address | area | article | aside | audio |
    b | bdi | bdo | blockquote | br | button |
    canvas | caption | cite | code | col | colgroup |
    data | datalist | dd | del | details | dfn | dialog | div | dl | dt |
    em | embed |
    fieldset | figcaption | figure | footer | form |
    h1 | h2 | h3 | h4 | h5 | h6 | header | hgroup | hr | html |
    i | iframe | img | input | ins |
    kbd |
    label | legend | li | link |
    main | map | mark | math | menu | meta | meter |
    nav | noscript |
    object_ | ol | optgroup | option | output |
    p | param | picture | pre | progress |
    q |
    rb | rp | rt | rtc | ruby |
    s | samp | script | section | select | slot | small | source | span | string | strong | style | sub | summary | sup | svg |
    table | tbody | td | template | textarea | tfoot | th | thead | time | tr | track |
    u | ul |
    var_ | video |
    wbr
  )[];
};

export const template = builder<template>('template')

export type textarea = {
  readonly tag: 'textarea';
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
  readonly children: (
    a | abbr | address | area | article | aside | audio |
    b | bdi | bdo | blockquote | br | button |
    canvas | caption | cite | code | col | colgroup |
    data | datalist | dd | del | details | dfn | dialog | div | dl | dt |
    em | embed |
    fieldset | figcaption | figure | footer | form |
    h1 | h2 | h3 | h4 | h5 | h6 | header | hgroup | hr | html |
    i | iframe | img | input | ins |
    kbd |
    label | legend | link |
    main | map | mark | math | menu | meta | meter |
    nav | noscript |
    object_ | ol | optgroup | option | output |
    p | param | picture | pre | progress |
    q |
    rb | rp | rt | rtc | ruby |
    s | samp | script | section | select | slot | small | source | span | string | strong | style | sub | summary | sup | svg |
    table | tbody | td | template | textarea | tfoot | th | thead | time | tr | track |
    u | ul |
    var_ | video |
    wbr
  )[];
};

export const textarea = builder<textarea>('textarea')

export type tfoot = {
  readonly tag: 'tfoot';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    tr
  )[];
};

export const tfoot = builder<tfoot>('tfoot')

export type th = {
  readonly tag: 'th';
  readonly attributes: globalAttributes & {
    readonly 'colspan' ?: number;
    readonly 'rowspan' ?: number;
    readonly 'scope' ?: 'row'|'col'|'rowgroup'|'colgroup';
  };
  readonly children: (
    a | abbr | address | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn | dialog | div | dl |
    em | embed |
    fieldset | figure | form |
    hr |
    i | iframe | img | input | ins |
    kbd |
    label |
    main | map | mark | math | menu | meter |
    noscript |
    object_ | ol | output |
    p | picture | pre | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    table | td | template | textarea | th | time |
    u | ul |
    var_ | video |
    wbr
  )[];
};

export const th = builder<th>('th')

export type thead = {
  readonly tag: 'thead';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    tr
  )[];
};

export const thead = builder<thead>('thead')

export type time = {
  readonly tag: 'time';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn |
    em | embed |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | meter |
    noscript |
    object_ | output |
    picture | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    template | textarea | time |
    u |
    var_ | video |
    wbr
  )[];
};

export const time = builder<time>('time')

export type title = {
  readonly tag: 'title';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | address | area | article | aside | audio |
    b | bdi | bdo | blockquote | br | button |
    canvas | caption | cite | code | col | colgroup |
    data | datalist | dd | del | details | dfn | dialog | div | dl | dt |
    em | embed |
    fieldset | figcaption | figure | footer | form |
    h1 | h2 | h3 | h4 | h5 | h6 | header | hgroup | hr | html |
    i | iframe | img | input | ins |
    kbd |
    label | legend | link |
    main | map | mark | math | menu | meta | meter |
    nav | noscript |
    object_ | ol | optgroup | option | output |
    p | param | picture | pre | progress |
    q |
    rb | rp | rt | rtc | ruby |
    s | samp | script | section | select | slot | small | source | span | string | strong | style | sub | summary | sup | svg |
    table | tbody | td | template | textarea | tfoot | th | thead | time | tr | track |
    u | ul |
    var_ | video |
    wbr
  )[];
};

export const title = builder<title>('title')

export type tr = {
  readonly tag: 'tr';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    td | th
  )[];
};

export const tr = builder<tr>('tr')

export type track = {
  readonly tag: 'track';
  readonly attributes: globalAttributes & {
  };
};

export const track = voidBuilder<track>('track')

export type u = {
  readonly tag: 'u';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn |
    em | embed |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | meter |
    noscript |
    object_ | output |
    picture | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    template | textarea | time |
    u |
    var_ | video |
    wbr
  )[];
};

export const u = builder<u>('u')

export type ul = {
  readonly tag: 'ul';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    li
  )[];
};

export const ul = builder<ul>('ul')

export type var_ = {
  readonly tag: 'var_';
  readonly attributes: globalAttributes & {
  };
  readonly children: (
    a | abbr | audio |
    b | bdi | bdo | br | button |
    canvas | cite | code |
    data | datalist | del | dfn |
    em | embed |
    i | iframe | img | input | ins |
    kbd |
    label |
    map | mark | math | meter |
    noscript |
    object_ | output |
    picture | progress |
    q |
    ruby |
    s | samp | script | select | slot | small | span | string | strong | sub | sup | svg |
    template | textarea | time |
    u |
    var_ | video |
    wbr
  )[];
};

export const var_ = builder<var_>('var_')

export type video = {
  readonly tag: 'video';
  readonly attributes: globalAttributes & {
    readonly 'crossorigin' ?: 'anonymous'|'use-credentials';
    readonly 'itemprop' ?: string;
    readonly 'preload' ?: 'none'|'metadata'|'auto';
    readonly 'src' ?: string;
  };
  readonly children: (
    a | abbr | address | article | aside |
    b | bdi | bdo | blockquote | br | button |
    canvas | cite | code |
    data | datalist | del | details | dfn | dialog | div | dl |
    em | embed |
    fieldset | figure | footer | form |
    h1 | h2 | h3 | h4 | h5 | h6 | header | hgroup | hr |
    i | iframe | img | input | ins |
    kbd |
    label |
    main | map | mark | math | menu | meter |
    nav | noscript |
    object_ | ol | output |
    p | picture | pre | progress |
    q |
    ruby |
    s | samp | script | section | select | slot | small | span | string | strong | sub | sup | svg |
    table | td | template | textarea | th | time |
    u | ul |
    var_ |
    wbr |
    track |
    source
  )[];
};

export const video = builder<video>('video')

export type wbr = {
  readonly tag: 'wbr';
  readonly attributes: globalAttributes & {
  };
};

export const wbr = voidBuilder<wbr>('wbr')


export type All = a|abbr|address|area|article|aside|audio|b|base|bdi|bdo|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|data|datalist|dd|del|details|dfn|dialog|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|label|legend|li|link|main|map|mark|math|menu|meta|meter|nav|noscript|object_|ol|optgroup|option|output|p|param|picture|pre|progress|q|rb|rp|rt|rtc|ruby|s|samp|script|section|select|slot|small|source|span|string|strong|style|sub|summary|sup|svg|table|tbody|td|template|textarea|tfoot|th|thead|time|title|tr|track|u|ul|var_|video|wbr;