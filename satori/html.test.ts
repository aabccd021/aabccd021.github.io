import { c, h } from './dom';

export const hlink = h('link', { href: c('/favicon.ico'), rel: c('icon') });

export const hlink2 = h('link', {
  href: c('/favicon.svg'),
  rel: c('icon'),
  type: c('image/svg+xml'),
});

export const htmeta = h('meta', { charSet: c('utf-8') });

export const tagtest = h(
  'html',
  { lang: c('en') },
  h('head', {}),
  h(
    'body',
    {},
    h('header', {}, h('nav', {}, h('a', { href: c('/'), className: c('nav-item') }, c('Home')))),
    h(
      'main',
      {},
      h(
        'h1',
        { id: c('about-me') },
        c('About Me'),
        h('a', { href: c('#about-me'), hidden: c(true), className: c('header-anchor') }, c('#'))
      ),
      h('p', {}, c('Aab')),
      h(
        'h1',
        { id: c('contacts') },
        c('Contacts'),
        h('a', { href: c('#contacs'), className: c('header-anchor') }, c('#'))
      ),
      h(
        'ul',
        {},
        h('li', {}, h('a', { href: c('aabccd021@gmail.com') }, c('Email'))),
        h('li', {}, h('a', { href: c('https://github.com/aabccd021') }, c('GitHub')))
      )
    )
  )
);

type Loose<T extends number | string | symbol> = Omit<number | string | symbol, T> | T;

type Loose2<T extends object> = Omit<Record<string, unknown>, keyof T> & T;

type Z = {
  readonly attr: Loose<'bar' | 'foo'>;
};

export const z: Z = {
  attr: 'bar',
};

type A = Loose2<{
  readonly foo: string;
  readonly bar: string;
}>;

export const a1: A = {
  foo: 'foo',
  // @ts-expect-error haha
  bar: 10,
  baz: '',
};

export const a2: A = {
  foo: 'foo',
  bar: 'bar',
  baz: '',
};
